const Store = {
  state: null,

  defaultState() {
    return {
      seen: {}, grammar_seen: {},
      points: 0, total_points_earned: 0,
      streak: 0, best_streak: 0, last_activity: null,
      // category_tiers: how many tiers unlocked per category (0 = fully locked)
      category_tiers: {
        greetings: 1,   // 8 free words
        verbs: 1,       // 6 free words
        adjectives: 1,  // 4 free words
        food: 1,        // 2 free words (phở, cà phê)
        numbers: 1,     // 2 free words
        nouns: 0,
        family: 0,
        time: 0,
        colors: 0,
        places: 0,
        prepositions: 0,
      },
      unlocked_modes: ['flashcard', 'multiple_choice'],
      unlocked_boosts: [],
      unlocked_grammar: ['identity'], // identity patterns free from day 1
      achievements: [],
      consec_correct: 0, typed_correct: 0,
      total_correct: 0, total_attempts: 0,
      last_category: 'greetings', last_mode: 'multiple_choice',
    };
  },

  load() {
    try {
      const raw = localStorage.getItem('viet_learn_v1');
      if (raw) {
        const saved = JSON.parse(raw);
        // merge so new keys from defaultState appear if missing
        this.state = Object.assign(this.defaultState(), saved);
        // also merge nested category_tiers
        this.state.category_tiers = Object.assign(this.defaultState().category_tiers, saved.category_tiers || {});
        if (!this.state.unlocked_grammar) this.state.unlocked_grammar = ['identity'];
        // migrate old flat unlocked_categories → category_tiers
        if (saved.unlocked_categories && !saved.category_tiers) {
          saved.unlocked_categories.forEach(cat => {
            if (this.state.category_tiers[cat] === 0) this.state.category_tiers[cat] = 1;
          });
          this.save();
        }
      } else {
        this.state = this.defaultState();
      }
    } catch(e) { this.state = this.defaultState(); }
  },

  save() { localStorage.setItem('viet_learn_v1', JSON.stringify(this.state)); },

  reset() {
    if (!confirm('Reset ALL progress? This cannot be undone.')) return;
    localStorage.removeItem('viet_learn_v1');
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
    const today = new Date().toISOString().slice(0,10);
    const last = this.state.last_activity;
    if (last === today) { /* same day */ }
    else if (last) {
      const diff = Math.round((new Date(today) - new Date(last)) / 86400000);
      this.state.streak = diff === 1 ? this.state.streak + 1 : 1;
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

  // Returns words accessible to the player right now in a given category
  getUnlockedWords(category) {
    const tier = this.state.category_tiers[category] || 0;
    return WORDS.filter(w => w.category === category && w.tier <= tier && tier > 0);
  },

  // Returns all unlocked words across all categories
  getAllUnlockedWords() {
    return Object.keys(this.state.category_tiers).flatMap(cat => this.getUnlockedWords(cat));
  },

  getCategoryTier(cat) { return this.state.category_tiers[cat] || 0; },

  isCategoryAccessible(cat) { return (this.state.category_tiers[cat] || 0) > 0; },

  isModeUnlocked(mode) { return this.state.unlocked_modes.includes(mode); },
  isGrammarUnlocked(gramCat) { return (this.state.unlocked_grammar || ['identity']).includes(gramCat); },

  // Get the next purchasable tier item for a category
  getNextTierItem(cat) {
    const current = this.getCategoryTier(cat);
    const nextTier = current + 1;
    return SHOP_ITEMS.find(i => i.type === 'tier' && i.unlockKey === cat && i.tier === nextTier) || null;
  },

  // Get max tier available for a category
  getMaxTier(cat) {
    const items = SHOP_ITEMS.filter(i => i.type === 'tier' && i.unlockKey === cat);
    return items.length > 0 ? Math.max(...items.map(i => i.tier)) : 1;
  },

  // Check whether all currently-unlocked words in a category meet the 60% accuracy gate
  // Returns {met: bool, total: n, ready: n, notReady: [{vn, accuracy}]}
  checkAccuracyGate(cat) {
    const words = this.getUnlockedWords(cat);
    const notReady = [];
    let ready = 0;
    for (const w of words) {
      const s = this.state.seen[w.id];
      if (!s || s.seen === 0) {
        notReady.push({vn: w.vn, accuracy: 0, unseen: true});
      } else {
        const acc = s.correct / s.seen;
        if (acc >= 0.6) ready++;
        else notReady.push({vn: w.vn, accuracy: Math.round(acc * 100), unseen: false});
      }
    }
    return { met: notReady.length === 0, total: words.length, ready, notReady };
  },

  unlockItem(item) {
    if (item.type === 'mode') {
      if (this.state.unlocked_modes.includes(item.unlockKey)) return false;
      if (!this.spendPoints(item.cost)) return false;
      this.state.unlocked_modes.push(item.unlockKey);
      this.save(); return true;
    }
    if (item.type === 'tier') {
      const cat = item.unlockKey;
      const current = this.getCategoryTier(cat);
      if (item.tier !== current + 1) return false; // must unlock in order
      if (current > 0) {
        const gate = this.checkAccuracyGate(cat);
        if (!gate.met) return 'gate';
      }
      if (!this.spendPoints(item.cost)) return false;
      this.state.category_tiers[cat] = item.tier;
      this.save(); return true;
    }
    if (item.type === 'grammar') {
      if (!this.state.unlocked_grammar) this.state.unlocked_grammar = ['identity'];
      if (this.state.unlocked_grammar.includes(item.unlockKey)) return false;
      // Accuracy gate: all patterns in already-unlocked grammar categories must be ≥60%
      const gate = this.checkGrammarAccuracyGate();
      if (!gate.met) return 'gate';
      if (!this.spendPoints(item.cost)) return false;
      this.state.unlocked_grammar.push(item.unlockKey);
      this.save(); return true;
    }
    return false;
  },

  // Grammar accuracy gate: all patterns in already-unlocked grammar categories must be ≥60%
  checkGrammarAccuracyGate() {
    const unlocked = this.state.unlocked_grammar || ['identity'];
    const notReady = [];
    let ready = 0;
    for (const g of GRAMMAR) {
      if (!unlocked.includes(g.category)) continue;
      const s = this.state.grammar_seen[g.id];
      if (!s || s.seen === 0) {
        notReady.push({pattern: g.pattern, accuracy: 0, unseen: true});
      } else {
        const acc = s.correct / s.seen;
        if (acc >= 0.6) ready++;
        else notReady.push({pattern: g.pattern, accuracy: Math.round(acc * 100), unseen: false});
      }
    }
    return { met: notReady.length === 0, ready, total: ready + notReady.length, notReady };
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
    if (item.type === 'tier') return (this.state.category_tiers[item.unlockKey] || 0) >= item.tier;
    if (item.type === 'grammar') return this.isGrammarUnlocked(item.unlockKey);
    return false;
  },

  getCategoryProgress(cat) {
    const unlocked = this.getUnlockedWords(cat);
    const all = WORDS.filter(w => w.category === cat);
    let seen = 0, mastered = 0;
    unlocked.forEach(w => {
      const s = this.getWordStats(w.id);
      if (s.seen_count > 0) seen++;
      if (s.mastered) mastered++;
    });
    return { seen, mastered, total: unlocked.length, total_all: all.length };
  },
};
