const Store = {
  state: null,

  defaultState() {
    return {
      seen: {}, grammar_seen: {},
      points: 0, total_points_earned: 0,
      streak: 0, best_streak: 0, last_activity: null,
      unlocked_lesson: 1, // how many lessons are unlocked (1-indexed); lesson 1 is free
      unlocked_modes: ['flashcard', 'multiple_choice'],
      unlocked_boosts: [],
      consec_correct: 0, typed_correct: 0,
      total_correct: 0, total_attempts: 0,
      last_category: 'all', last_mode: 'multiple_choice',
      tts_voice_uri: null, // null = browser default Vietnamese voice
      daily: {},           // { 'YYYY-MM-DD': {attempts, correct, ms} }
      streak_history: [],  // lengths of streaks that have ended (broken by a gap)
    };
  },

  load() {
    try {
      const raw = localStorage.getItem('viet_learn_v2');
      if (raw) {
        const saved = JSON.parse(raw);
        // merge so new keys from defaultState appear if missing
        this.state = Object.assign(this.defaultState(), saved);
      } else {
        this.state = this.defaultState();
      }
    } catch(e) { this.state = this.defaultState(); }
  },

  todayKey() { return new Date().toISOString().slice(0,10); },

  _touchDaily() {
    const key = this.todayKey();
    if (!this.state.daily[key]) this.state.daily[key] = {attempts:0, correct:0, ms:0};
    return this.state.daily[key];
  },

  // Adds elapsed time since the last scored answer to today's bucket, capped so an
  // idle/backgrounded tab can't inflate the total. Not persisted itself — recordAttempt/
  // recordGrammarAttempt call save() right after.
  _tickTime() {
    const now = Date.now();
    if (this._lastTickTs) {
      const delta = Math.min(now - this._lastTickTs, 120000);
      this._touchDaily().ms += delta;
    }
    this._lastTickTs = now;
  },

  save() { localStorage.setItem('viet_learn_v2', JSON.stringify(this.state)); },

  reset() {
    if (!confirm('Reset ALL progress? This cannot be undone.')) return;
    localStorage.removeItem('viet_learn_v2');
    location.reload();
  },

  recordAttempt(word_id, correct, mode) {
    const pts_map = {flashcard:5, multiple_choice:10, type_answer:20, match_pairs:15, fill_sentence:25, grammar_quiz:30};
    if (!this.state.seen[word_id]) this.state.seen[word_id] = {seen:0, correct:0, mastery_awarded:false};
    const e = this.state.seen[word_id];
    const first = e.seen === 0;
    e.seen++; if (correct) e.correct++;
    this.state.total_attempts++;
    if (correct) { this.state.total_correct++; this.state.consec_correct++; }
    else { this.state.consec_correct = 0; }
    if (correct && mode === 'type_answer') this.state.typed_correct++;
    const d = this._touchDaily(); d.attempts++; if (correct) d.correct++;
    this._tickTime();
    let pts = 0;
    if (correct) {
      pts = pts_map[mode] || 5;
      if (first) pts += 5;
      if (!e.mastery_awarded && e.seen >= 5 && e.correct/e.seen >= 0.8) { pts += 50; e.mastery_awarded = true; }
    }
    this.state.points += pts; this.state.total_points_earned += pts;
    this.save();
    return pts;
  },

  recordGrammarAttempt(gid, correct) {
    if (!this.state.grammar_seen[gid]) this.state.grammar_seen[gid] = {seen:0, correct:0};
    const e = this.state.grammar_seen[gid];
    e.seen++; if (correct) e.correct++;
    this.state.total_attempts++;
    if (correct) { this.state.total_correct++; this.state.consec_correct++; }
    else { this.state.consec_correct = 0; }
    const d = this._touchDaily(); d.attempts++; if (correct) d.correct++;
    this._tickTime();
    let pts = 0;
    if (correct) { pts = 30; if (e.seen === 1) pts += 5; }
    this.state.points += pts; this.state.total_points_earned += pts;
    this.save();
    return pts;
  },

  spendPoints(amt) {
    if (this.state.points < amt) return false;
    this.state.points -= amt; this.save(); return true;
  },

  checkStreak() {
    const today = this.todayKey();
    const last = this.state.last_activity;
    if (last === today) { /* same day */ }
    else if (last) {
      const diff = Math.round((new Date(today) - new Date(last)) / 86400000);
      if (diff === 1) { this.state.streak++; }
      else {
        if (this.state.streak > 0) this.state.streak_history.push(this.state.streak);
        this.state.streak = 1;
      }
    } else { this.state.streak = 1; }
    if (this.state.streak > this.state.best_streak) this.state.best_streak = this.state.streak;
    this.state.last_activity = today;
    this.save();
  },

  getWordStats(id) {
    const s = this.state.seen[id] || {seen:0, correct:0};
    return {
      seen_count: s.seen,
      accuracy: s.seen > 0 ? Math.round(s.correct/s.seen*100) : 0,
      mastered: s.seen >= 5 && s.correct/s.seen >= 0.8,
    };
  },

  getMasteredCount() {
    return Object.keys(this.state.seen).filter(id => this.getWordStats(id).mastered).length;
  },

  getSeenCount() {
    return Object.keys(this.state.seen).filter(id => this.state.seen[id].seen > 0).length;
  },

  getOverallAccuracy() {
    return this.state.total_attempts === 0 ? 0
      : Math.round(this.state.total_correct / this.state.total_attempts * 100);
  },

  getStreakStats() {
    const current = this.state.streak;
    const longest = this.state.best_streak;
    const candidates = [...this.state.streak_history, ...(current > 0 ? [current] : [])];
    const shortest = candidates.length ? Math.min(...candidates) : null;
    return { current, longest, shortest };
  },

  // Last n calendar days (including today), oldest→newest, zero-filled for days with no activity.
  getDailyRange(n = 14) {
    const out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0,10);
      const bucket = this.state.daily[date] || {attempts:0, correct:0, ms:0};
      out.push({
        date,
        attempts: bucket.attempts,
        correct: bucket.correct,
        accuracy: bucket.attempts > 0 ? Math.round(bucket.correct / bucket.attempts * 100) : null,
        ms: bucket.ms,
      });
    }
    return out;
  },

  getAvgTimePerActiveDay() {
    const days = Object.values(this.state.daily).filter(d => d.attempts > 0);
    if (days.length === 0) return 0;
    return days.reduce((sum, d) => sum + d.ms, 0) / days.length;
  },

  // ── LESSONS ───────────────────────────────────────────────────────────────
  getUnlockedLessons() {
    return LESSONS.slice(0, this.state.unlocked_lesson);
  },

  getUnlockedWordIdSet() {
    return new Set(this.getUnlockedLessons().flatMap(l => l.word_ids));
  },

  getUnlockedGrammarIdSet() {
    return new Set(this.getUnlockedLessons().flatMap(l => l.grammar_ids));
  },

  getCurrentLesson() { return LESSONS[this.state.unlocked_lesson - 1] || null; },

  getNextLesson() { return LESSONS[this.state.unlocked_lesson] || null; },

  // Words taught in one specific lesson (for Learn-tab per-lesson practice)
  getWordsForLesson(lessonId) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return [];
    const idSet = new Set(lesson.word_ids);
    return WORDS.filter(w => idSet.has(w.id));
  },

  isLessonUnlocked(lessonId) {
    const idx = LESSONS.findIndex(l => l.id === lessonId);
    return idx > -1 && idx < this.state.unlocked_lesson;
  },

  // Returns words accessible to the player right now in a given category
  getUnlockedWords(category) {
    const idSet = this.getUnlockedWordIdSet();
    return WORDS.filter(w => w.category === category && idSet.has(w.id));
  },

  // Returns all unlocked words across all categories
  getAllUnlockedWords() {
    const idSet = this.getUnlockedWordIdSet();
    return WORDS.filter(w => idSet.has(w.id));
  },

  isCategoryAccessible(cat) { return this.getUnlockedWords(cat).length > 0; },

  isModeUnlocked(mode) { return this.state.unlocked_modes.includes(mode); },
  isGrammarUnlocked(grammarId) { return this.getUnlockedGrammarIdSet().has(grammarId); },

  // Unified 60%-accuracy gate across every word + grammar pattern in currently-unlocked lessons.
  // Exempt when only lesson 1 (free, unpracticed by definition) is unlocked.
  checkLessonAccuracyGate() {
    if (this.state.unlocked_lesson <= 1) return { met: true, ready: 0, total: 0, notReady: [] };
    const notReady = [];
    let ready = 0;
    for (const w of this.getAllUnlockedWords()) {
      const s = this.state.seen[w.id];
      if (!s || s.seen === 0) notReady.push({ label: w.vn, accuracy: 0, unseen: true });
      else {
        const acc = s.correct / s.seen;
        if (acc >= 0.6) ready++;
        else notReady.push({ label: w.vn, accuracy: Math.round(acc * 100), unseen: false });
      }
    }
    for (const g of GRAMMAR) {
      if (!this.isGrammarUnlocked(g.id)) continue;
      const s = this.state.grammar_seen[g.id];
      if (!s || s.seen === 0) notReady.push({ label: g.pattern, accuracy: 0, unseen: true });
      else {
        const acc = s.correct / s.seen;
        if (acc >= 0.6) ready++;
        else notReady.push({ label: g.pattern, accuracy: Math.round(acc * 100), unseen: false });
      }
    }
    return { met: notReady.length === 0, ready, total: ready + notReady.length, notReady };
  },

  unlockNextLesson() {
    const next = this.getNextLesson();
    if (!next) return false;
    const gate = this.checkLessonAccuracyGate();
    if (!gate.met) return 'gate';
    if (!this.spendPoints(next.cost)) return false;
    this.state.unlocked_lesson++;
    this.save();
    return true;
  },

  unlockItem(item) {
    if (item.type === 'mode') {
      if (this.state.unlocked_modes.includes(item.unlockKey)) return false;
      if (!this.spendPoints(item.cost)) return false;
      this.state.unlocked_modes.push(item.unlockKey);
      this.save(); return true;
    }
    return false;
  },

  getGrammarPatternStats(grammarId) {
    const s = this.state.grammar_seen[grammarId] || {seen:0, correct:0};
    return {
      seen_count: s.seen,
      accuracy: s.seen > 0 ? Math.round(s.correct / s.seen * 100) : 0,
      mastered: s.seen >= 5 && s.correct / s.seen >= 0.8,
    };
  },

  isItemOwned(item) {
    if (item.type === 'mode') return this.state.unlocked_modes.includes(item.unlockKey);
    return false;
  },

  getCategoryProgress(cat) {
    const unlocked = this.getUnlockedWords(cat);
    const all = WORDS.filter(w => w.category === cat);
    let seen = 0, mastered = 0, correctSum = 0, seenSum = 0;
    unlocked.forEach(w => {
      const s = this.getWordStats(w.id);
      if (s.seen_count > 0) seen++;
      if (s.mastered) mastered++;
      const raw = this.state.seen[w.id];
      if (raw) { correctSum += raw.correct; seenSum += raw.seen; }
    });
    const accuracy = seenSum > 0 ? Math.round(correctSum / seenSum * 100) : null;
    return { seen, mastered, total: unlocked.length, total_all: all.length, accuracy };
  },

  // Word + grammar progress for one specific lesson (Progress tab's "By Lesson" view)
  getLessonProgress(lessonId) {
    const words = this.getWordsForLesson(lessonId);
    let seen = 0, mastered = 0, correctSum = 0, seenSum = 0;
    words.forEach(w => {
      const s = this.getWordStats(w.id);
      if (s.seen_count > 0) seen++;
      if (s.mastered) mastered++;
      const raw = this.state.seen[w.id];
      if (raw) { correctSum += raw.correct; seenSum += raw.seen; }
    });
    const lesson = LESSONS.find(l => l.id === lessonId);
    const gramPatterns = lesson ? GRAMMAR.filter(g => lesson.grammar_ids.includes(g.id)) : [];
    let gSeen = 0, gMastered = 0;
    gramPatterns.forEach(g => {
      const s = this.getGrammarPatternStats(g.id);
      if (s.seen_count > 0) gSeen++;
      if (s.mastered) gMastered++;
      const raw = this.state.grammar_seen[g.id];
      if (raw) { correctSum += raw.correct; seenSum += raw.seen; }
    });
    const accuracy = seenSum > 0 ? Math.round(correctSum / seenSum * 100) : null;
    return {
      seen, mastered, total: words.length, total_all: words.length,
      gSeen, gMastered, gTotal: gramPatterns.length, gramPatterns, accuracy,
    };
  },
};
