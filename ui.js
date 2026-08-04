const UI = {
  currentView: 'home',
  session: null,      // {questions, index, score, pts_earned, mode, category}
  matchState: null,   // {selectedLeft, selectedRight, matched, pairs}
  learnLesson: 'all',
  learnMode: 'multiple_choice',

  // Shared by renderLearn() (mode picker) and startSession() ('mixed' mode's eligible pool)
  MODES: [
    {key:'flashcard',       label:'Flashcard',       icon:'🃏', worksWith:'words',   desc:'Reveal & rate'},
    {key:'multiple_choice', label:'Multiple Choice', icon:'🔤', worksWith:'words',   desc:'Pick the right answer'},
    {key:'type_answer',     label:'Write It',        icon:'✍️', worksWith:'words',   desc:'Type Vietnamese'},
    {key:'match_pairs',     label:'Match Pairs',     icon:'🔀', worksWith:'words',   desc:'Needs ≥6 words'},
    {key:'fill_sentence',   label:'Fill the Blank',  icon:'📝', worksWith:'words',   desc:'Complete a sentence'},
    {key:'grammar_quiz',    label:'Grammar Drill',   icon:'🧠', worksWith:'grammar', desc:'Grammar patterns only'},
    {key:'word_order',      label:'Word Order',      icon:'🔧', worksWith:'grammar', desc:'Grammar patterns only'},
    {key:'particles',       label:'Particles',       icon:'🧩', worksWith:'grammar', desc:'Fill in the missing grammar word'},
  ],

  init() {
    Store.load();
    Store.checkStreak();
    this.bindNav();
    this.updateHeader();
    this.showView('home');
    if ('speechSynthesis' in window) {
      // Chrome loads voices asynchronously; re-render Home once they arrive so the picker populates
      window.speechSynthesis.onvoiceschanged = () => { if (this.currentView === 'home') this.renderHome(); };
    }
  },

  bindNav() {
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.addEventListener('click', () => this.showView(btn.dataset.view));
    });
    document.addEventListener('keydown', e => {
      if (this.currentView !== 'quiz' || !this.session) return;
      const q = this.session.questions[this.session.index];
      if (!q) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (q.type === 'flashcard') {
          const btn = document.getElementById('flashcard-reveal');
          if (btn) btn.click();
        }
      }
      if (['1','2','3','4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        const btns = document.querySelectorAll('.choice-btn');
        if (btns[idx] && !btns[idx].disabled) btns[idx].click();
      }
    });
  },

  showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
    this.currentView = name;
    if (name === 'home') this.renderHome();
    else if (name === 'learn') this.renderLearn();
    else if (name === 'lessons') this.renderLessons();
    else if (name === 'vocabulary') this.renderVocabulary();
    else if (name === 'grammar') this.renderGrammar();
    else if (name === 'stats') this.renderStats();
  },

  updateHeader() {
    document.getElementById('streak-count').textContent = Store.state.streak;
    document.getElementById('points-count').textContent = Store.state.points;
    const lvl = Gamify.getLevelInfo(Store.state.total_points_earned);
    document.getElementById('level-title').textContent = lvl.title;
  },

  refreshCurrentView() {
    const name = this.currentView;
    if (name === 'home') this.renderHome();
    else if (name === 'learn') this.renderLearn();
    else if (name === 'lessons') this.renderLessons();
    else if (name === 'vocabulary') this.renderVocabulary();
    else if (name === 'grammar') this.renderGrammar();
    else if (name === 'stats') this.renderStats();
  },

  // ── DEBUG (tap the ⭐ or level label in the top bar) ────────────────────────
  debugAddStars() {
    Store.state.points += 300;
    Store.state.total_points_earned += 300;
    Store.save();
    Gamify.showToast('🐛 +300 stars', 'gold');
    this.updateHeader();
    this.refreshCurrentView();
  },

  // ── HOME ──────────────────────────────────────────────────────────────────
  renderHome() {
    const seen = Store.getSeenCount();
    const mastered = Store.getMasteredCount();
    const acc = Store.getOverallAccuracy();
    const total = WORDS.length;
    const pct = Math.round(seen / total * 100);
    const lvl = Gamify.getLevelInfo(Store.state.total_points_earned);
    const circum = 2 * Math.PI * 52;
    const dash = (pct / 100 * circum).toFixed(1);

    const currentLesson = Store.getCurrentLesson();
    const totalLessons = LESSONS.length;

    const unlockedCats = Object.keys(CATEGORY_META).filter(c => Store.isCategoryAccessible(c));
    const catBars = unlockedCats.map(cat => {
      const meta = CATEGORY_META[cat] || {label: cat, icon: '📁', color: '#8BA3B8'};
      const p = Store.getCategoryProgress(cat);
      const pPct = p.total > 0 ? Math.round(p.seen / p.total * 100) : 0;
      return `<div style="background:var(--surface-2);border-radius:12px;padding:12px 14px;border:1px solid rgba(255,255,255,0.06)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:13px;font-weight:600">${meta.icon} ${meta.label}</span>
          <span style="font-size:12px;color:var(--muted)">${p.seen}/${p.total}</span>
        </div>
        <div class="progress-bar"><div class="progress-bar__fill" style="width:${pPct}%;background:${meta.color}"></div></div>
      </div>`;
    }).join('');

    document.getElementById('view-home').innerHTML = `
      <div style="padding:16px;max-width:100%">
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px;background:var(--surface);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06)">
          <div style="position:relative;flex-shrink:0">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface-2)" stroke-width="8"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--jade)" stroke-width="8" stroke-linecap="round"
                stroke-dasharray="${dash} ${circum}" transform="rotate(-90 60 60)" style="transition:stroke-dasharray 0.7s ease"/>
            </svg>
            <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
              <span style="font-family:var(--font-display);font-size:24px;font-weight:700;color:var(--gold);line-height:1">${seen}</span>
              <span style="font-size:11px;color:var(--muted)">/ ${total}</span>
            </div>
          </div>
          <div style="flex:1">
            <div style="font-family:var(--font-display);font-size:18px;font-weight:700;margin-bottom:4px">Your Progress</div>
            <div style="font-size:13px;color:var(--muted);margin-bottom:12px">${seen} words seen · ${mastered} mastered</div>
            <div style="margin-bottom:6px;display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">${lvl.title}</span><span style="color:var(--gold)">${lvl.next === Infinity ? 'Max level!' : lvl.next - Store.state.total_points_earned + ' pts to next'}</span></div>
            <div class="progress-bar"><div class="progress-bar__fill" style="width:${lvl.pct}%;background:var(--gold)"></div></div>
          </div>
        </div>

        <div class="stats-grid" style="margin-bottom:20px">
          <div class="stat-card"><div class="stat-card__number">${seen}</div><div class="stat-card__label">Words Seen</div></div>
          <div class="stat-card"><div class="stat-card__number">${mastered}</div><div class="stat-card__label">Mastered</div></div>
          <div class="stat-card"><div class="stat-card__number">${acc}%</div><div class="stat-card__label">Accuracy</div></div>
          <div class="stat-card"><div class="stat-card__number">${Store.state.best_streak}</div><div class="stat-card__label">Best Streak</div></div>
        </div>

        ${currentLesson ? `
        <div class="section-eyebrow" style="margin-bottom:12px">📖 Current Lesson</div>
        <div style="background:var(--surface);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);margin-bottom:20px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <span style="font-size:28px;flex-shrink:0">${currentLesson.icon}</span>
            <div>
              <div style="font-weight:700;font-size:16px">Lesson ${currentLesson.order}: ${currentLesson.title}</div>
              <div style="font-size:12px;color:var(--muted)">${currentLesson.topic}</div>
            </div>
            <div style="margin-left:auto;font-size:12px;color:var(--muted);white-space:nowrap">${currentLesson.order}/${totalLessons}</div>
          </div>
          <button class="btn-primary" style="width:100%;font-size:16px;padding:14px" onclick="UI.startSession('all','mixed')">
            ▶ Continue — Mixed Practice
          </button>
        </div>` : ''}

        <div class="section-eyebrow" style="margin-bottom:12px">Category Progress</div>
        <div style="display:grid;gap:8px;margin-bottom:20px">${catBars}</div>

        <div class="section-eyebrow" style="margin-bottom:12px">🔊 Pronunciation Voice</div>
        <div style="background:var(--surface);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);margin-bottom:24px">
          ${this.renderVoiceSettingsHtml()}
        </div>

        <div style="text-align:center">
          <button class="btn-danger" style="font-size:13px;padding:8px 20px" onclick="Store.reset()">🔄 Reset Progress</button>
        </div>
      </div>`;
  },

  // ── LEARN ─────────────────────────────────────────────────────────────────
  renderLearn() {
    const modes = this.MODES.map(m => {
      const shopItem = SHOP_ITEMS.find(s => s.unlockKey === m.key);
      return {...m, cost: shopItem ? shopItem.cost : 0, id: shopItem ? shopItem.id : null};
    });

    // "all" = special selection using all unlocked words across every lesson
    const allWords = Store.getAllUnlockedWords();
    const unlockedLessons = Store.getUnlockedLessons();

    // Determine compatibility warnings for current selection
    const isGrammarMode = ['grammar_quiz','word_order','particles'].includes(this.learnMode);
    const isAllLesson = this.learnLesson === 'all';
    const currentPool = isAllLesson ? allWords : Store.getWordsForLesson(this.learnLesson);
    let warning = null;
    if (isGrammarMode && !isAllLesson) {
      warning = 'Grammar modes use patterns from all your unlocked lessons, not just one. Switch to "All Words" or it will still work fine.';
    } else if (!isGrammarMode && this.learnMode === 'match_pairs' && currentPool.length < 6) {
      warning = `Match Pairs needs at least 6 words. This lesson only has ${currentPool.length}. Pick a bigger lesson or use All Words.`;
    } else if (!isGrammarMode && currentPool.length === 0) {
      warning = 'No words in this lesson yet.';
    }

    const modePills = modes.map(m => {
      const owned = Store.isModeUnlocked(m.key);
      const active = this.learnMode === m.key;
      const isGrammar = m.worksWith === 'grammar';
      if (owned) {
        return `<button class="mode-pill${active?' active':''}" onclick="UI.selectMode('${m.key}')"
          title="${m.desc}${isGrammar?' · Grammar patterns only':''}">
          ${m.icon} ${m.label}
          ${isGrammar ? `<span style="font-size:10px;opacity:0.7;margin-left:2px">📖</span>` : ''}
        </button>`;
      } else {
        const canAfford = Store.state.points >= m.cost;
        return `<button class="mode-pill locked" onclick="UI.buyItem('${m.id}')"
          title="${canAfford ? 'Tap to unlock' : 'Need '+(m.cost-Store.state.points)+' more'} · ${m.desc}">
          🔒 ${m.icon} ${m.label} <span style="font-size:11px">${m.cost}⭐</span>
        </button>`;
      }
    }).join('');

    // All Words option first, then unlocked lessons (most recent first)
    const allWordsPill = !isGrammarMode ? `
      <button class="category-pill${isAllLesson?' active':''}" onclick="UI.selectLesson('all')">
        🌐 All Words <span style="color:var(--muted);font-weight:400">${allWords.length}</span>
      </button>` : '';

    const lessonPills = !isGrammarMode ? [...unlockedLessons].reverse().map(l => {
      const active = this.learnLesson === l.id;
      return `<button class="category-pill${active?' active':''}" onclick="UI.selectLesson('${l.id}')">
        ${l.order}. ${l.icon} ${l.title} <span style="color:var(--muted);font-weight:400">${l.word_ids.length}</span>
      </button>`;
    }).join('') : '';

    // Session preview
    const modeMeta = modes.find(m => m.key === this.learnMode);
    const activeLessonMeta = LESSONS.find(l => l.id === this.learnLesson);
    const catLabel = isAllLesson ? `All Words (${allWords.length})` :
      `${activeLessonMeta ? 'Lesson '+activeLessonMeta.order+': '+activeLessonMeta.icon+' '+activeLessonMeta.title : this.learnLesson} (${currentPool.length} words)`;

    // Word weight preview — show how many unseen/struggling/known
    const unseen   = currentPool.filter(w => !Store.state.seen[w.id] || Store.state.seen[w.id].seen===0).length;
    const struggle = currentPool.filter(w => { const s=Store.state.seen[w.id]; return s&&s.seen>0&&s.correct/s.seen<0.6; }).length;
    const known    = currentPool.length - unseen - struggle;

    document.getElementById('view-learn').innerHTML = `
      <div style="padding:16px">
        <div class="section-title">Choose What to Learn</div>

        <div class="section-eyebrow" style="margin-bottom:8px">Mode
          <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted);font-size:11px"> · 📖 = grammar patterns only</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">${modePills}</div>

        ${isGrammarMode ? `
          <div style="background:rgba(232,184,75,0.08);border:1px solid rgba(232,184,75,0.2);border-radius:12px;padding:12px 14px;margin-bottom:20px;font-size:13px;color:var(--gold)">
            📖 Grammar modes practice sentence patterns — they use all your unlocked vocabulary automatically.
          </div>` : `
          <div class="section-eyebrow" style="margin-bottom:8px">Lesson</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">
            ${allWordsPill}${lessonPills}
          </div>`}

        ${warning ? `<div style="background:rgba(217,107,72,0.1);border:1px solid rgba(217,107,72,0.25);border-radius:12px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:var(--coral)">⚠️ ${warning}</div>` : ''}

        <div style="background:var(--surface);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);margin-bottom:20px">
          <div style="font-size:13px;color:var(--muted);margin-bottom:6px">Session preview</div>
          <div style="font-size:16px;font-weight:600;margin-bottom:10px">${modeMeta?modeMeta.icon:''} ${this.learnMode.replace(/_/g,' ')} · ${catLabel}</div>
          ${!isGrammarMode ? `
          <div style="display:flex;gap:12px;font-size:12px">
            <span style="color:var(--coral)">● ${unseen} unseen</span>
            <span style="color:var(--gold)">● ${struggle} struggling</span>
            <span style="color:var(--jade)">● ${known} known</span>
          </div>
          ${unseen >= 2 || struggle >= 2 ? `
          <div style="font-size:11px;color:var(--jade);margin-top:6px">✓ Guaranteed: up to 2 unseen + 2 struggling in every session</div>` : ''}` : `
          <div style="font-size:12px;color:var(--muted)">Patterns filtered to your unlocked vocabulary</div>`}
        </div>

        <button class="btn-primary" style="width:100%;font-size:16px;padding:16px" ${warning&&warning.includes('No words')?'disabled':''} onclick="UI.startSession('${this.learnLesson}','${this.learnMode}')">
          Start Session (10 questions) →
        </button>
      </div>`;
  },

  selectMode(mode) {
    this.learnMode = mode;
    // if switching to grammar mode, set selection to 'all'
    if (['grammar_quiz','word_order','particles'].includes(mode)) this.learnLesson = 'all';
    this.renderLearn();
  },
  selectLesson(lessonOrAll) { this.learnLesson = lessonOrAll; this.renderLearn(); },

  // ── SESSION ───────────────────────────────────────────────────────────────
  // `lessonOrAll` is 'all' (every unlocked word) or a specific LESSONS id
  startSession(lessonOrAll, mode) {
    const isMixed = mode === 'mixed';
    if (lessonOrAll !== 'all' && !Store.isLessonUnlocked(lessonOrAll)) { Gamify.showToast('This lesson isn\'t unlocked yet!','error'); return; }
    if (!isMixed && !Store.isModeUnlocked(mode)) { Gamify.showToast('Buy this mode in the Learn tab first!','error'); return; }

    Store.state.last_category = lessonOrAll;
    Store.state.last_mode = mode;
    Store.save();

    const SESSION_SIZE = 10;
    const GUARANTEED_STRUGGLE = 2; // at least 2 slots reserved for <60% accuracy words
    const GUARANTEED_UNSEEN = 2;   // at least 2 slots reserved for never-seen words
    const isGrammarMode = ['grammar_quiz','word_order','particles'].includes(mode);
    const questions = [];

    if (isMixed) {
      // Randomly vary the mode per question across every mode the player has unlocked.
      // Skips the guaranteed-unseen/struggling mechanic below — it doesn't generalize
      // across heterogeneous question types (e.g. match_pairs isn't a single-word question) —
      // but each word-mode's own selectWord() weighting still favors unseen/struggling words.
      const eligible = this.MODES.map(m => m.key).filter(k => Store.isModeUnlocked(k));
      for (let i = 0; i < SESSION_SIZE && eligible.length; i++) {
        const pick = eligible[Math.floor(Math.random() * eligible.length)];
        const q = Quiz.generateQuestion(pick, 'all', Store.state.seen);
        if (q) questions.push(q);
      }
    } else if (isGrammarMode) {
      // Grammar modes don't use word pools — just generate normally
      for (let i = 0; i < SESSION_SIZE; i++) {
        const q = Quiz.generateQuestion(mode, lessonOrAll, Store.state.seen);
        if (q) questions.push(q);
      }
    } else {
      const pool = lessonOrAll === 'all' ? Store.getAllUnlockedWords() : Store.getWordsForLesson(lessonOrAll);
      const seen = Store.state.seen;

      const unseenWords    = pool.filter(w => !seen[w.id] || seen[w.id].seen === 0);
      const struggleWords  = pool.filter(w => { const s=seen[w.id]; return s&&s.seen>0&&s.correct/s.seen<0.6; });
      const otherWords     = pool.filter(w => { const s=seen[w.id]; return s&&s.seen>0&&s.correct/s.seen>=0.6; });

      // Build a forced set: up to GUARANTEED_UNSEEN unseen + up to GUARANTEED_STRUGGLE struggling
      const forced = [];
      const shuffledUnseen   = Quiz.shuffle([...unseenWords]);
      const shuffledStruggle = Quiz.shuffle([...struggleWords]);

      // Take up to 2 unseen
      for (let i = 0; i < GUARANTEED_UNSEEN && i < shuffledUnseen.length; i++) {
        forced.push(shuffledUnseen[i]);
      }
      // Take up to 2 struggling (don't re-add if already in forced)
      const forcedIds = new Set(forced.map(w => w.id));
      for (let i = 0; i < GUARANTEED_STRUGGLE && shuffledStruggle.length > 0; i++) {
        const w = shuffledStruggle.find(w => !forcedIds.has(w.id));
        if (w) { forced.push(w); forcedIds.add(w.id); }
      }

      // Fill remaining slots with weighted random from full pool
      const remaining = SESSION_SIZE - forced.length;
      const fillerPool = pool.filter(w => !forcedIds.has(w.id));

      // Generate forced questions first
      for (const word of forced) {
        const q = Quiz.generateQuestionForWord(mode, word, pool);
        if (q) questions.push(q);
      }
      // Generate remaining questions via weighted selection
      for (let i = 0; i < remaining; i++) {
        if (fillerPool.length === 0) break;
        const q = Quiz.generateQuestion(mode, lessonOrAll, seen);
        if (q) questions.push(q);
      }

      // Shuffle the final list so forced words don't always appear first
      Quiz.shuffle(questions);
    }

    this.session = { questions, index: 0, score: 0, pts_earned: 0, mode, category: lessonOrAll };
    this.matchState = null;
    this.showView('quiz');
    this.renderQuizView();
  },

  renderQuizView() {
    if (!this.session) return;
    const { questions, index, score, pts_earned, category, mode } = this.session;
    const q = questions[index];
    if (!q) { this.showResults(); return; }

    const catMeta = CATEGORY_META[category] || {label: category, icon: '📖'};
    const pct = Math.round(index / questions.length * 100);

    const shell = `
      <div class="session-header">
        <button class="session-header__back" onclick="UI.showView('learn')">←</button>
        <div class="session-header__progress">
          <div class="session-header__meta">
            <span class="session-header__title">${catMeta.icon} ${catMeta.label} · ${mode === 'mixed' ? 'Mixed Practice' : mode.replace(/_/g,' ')}</span>
            <span class="session-header__counter">${index + 1} / ${questions.length}</span>
          </div>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:${pct}%"></div></div>
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--gold)">⭐ ${pts_earned}</div>
      </div>
      <div class="quiz-panel" id="quiz-content"></div>`;

    document.getElementById('view-quiz').innerHTML = shell;
    this.renderQuestion(q);
  },

  renderQuestion(q) {
    const el = document.getElementById('quiz-content');
    if (!el) return;
    if (q.type === 'flashcard') this.renderFlashcard(q, el);
    else if (q.type === 'multiple_choice') this.renderMultipleChoice(q, el);
    else if (q.type === 'type_answer') this.renderTypeAnswer(q, el);
    else if (q.type === 'fill_sentence') this.renderFillSentence(q, el);
    else if (q.type === 'match_pairs') this.renderMatchPairs(q, el);
    else if (q.type === 'grammar_quiz') this.renderGrammarQuiz(q, el);
    else if (q.type === 'word_order') this.renderWordOrder(q, el);
    else if (q.type === 'particles') this.renderParticles(q, el);
  },

  dialectHtml(note) {
    if (!note) return '';
    return `<div class="dialect-note" style="justify-content:center;margin-top:8px">🗺️ ${note}</div>`;
  },

  speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const uri = Store.state.tts_voice_uri;
    const chosen = uri && window.speechSynthesis.getVoices().find(v => v.voiceURI === uri);
    if (chosen) { u.voice = chosen; u.lang = chosen.lang; }
    else { u.lang = 'vi-VN'; }
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  },

  getViVoices() {
    if (!('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('vi'));
  },

  setVoice(uri) {
    Store.state.tts_voice_uri = uri || null;
    Store.save();
  },

  testVoice() {
    this.speak('Xin chào! Tôi là người Việt Nam.');
  },

  renderVoiceSettingsHtml() {
    if (!('speechSynthesis' in window)) {
      return `<div style="font-size:12px;color:var(--muted)">Your browser doesn't support text-to-speech.</div>`;
    }
    const voices = this.getViVoices();
    if (voices.length === 0) {
      return `<div style="font-size:12px;color:var(--muted)">No Vietnamese voice detected in your browser — 🔊 buttons will fall back to your browser's default voice, which may not sound correct. Try Microsoft Edge on Windows, which usually ships Northern and Southern Vietnamese voices.</div>`;
    }
    const current = Store.state.tts_voice_uri;
    const options = voices.map(v =>
      `<option value="${this.escAttr(v.voiceURI)}" ${v.voiceURI===current?'selected':''}>${this.escAttr(v.name)} (${v.lang})</option>`
    ).join('');
    return `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <select class="select-input" style="flex:1;min-width:160px" onchange="UI.setVoice(this.value)">${options}</select>
        <button class="btn-ghost" style="padding:10px 14px;font-size:13px" onclick="UI.testVoice()">🔊 Test</button>
      </div>`;
  },

  escAttr(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  },

  speakBtnHtml(text, size = 16) {
    return `<button class="speak-btn" style="font-size:${size}px" data-text="${this.escAttr(text)}" onclick="event.stopPropagation();UI.speak(this.dataset.text)" title="Listen">🔊</button>`;
  },

  renderFlashcard(q, el) {
    el.innerHTML = `
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:16px">What does this mean?</div>
        <div id="fc-card" style="cursor:pointer;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:40px 24px;margin-bottom:16px;transition:all 0.3s">
          <div style="font-family:var(--font-display);font-size:clamp(32px,6vw,52px);font-weight:700;color:var(--cream);margin-bottom:8px">${q.word.vn} ${this.speakBtnHtml(q.word.vn, 22)}</div>
          ${this.dialectHtml(q.dialect_note)}
          <div id="fc-reveal" style="display:none;margin-top:16px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
            <div style="font-size:22px;font-weight:600;color:var(--gold);margin-bottom:8px">${q.word.en}</div>
            <div style="font-size:14px;color:var(--muted);font-style:italic">${q.word.example_vn} ${this.speakBtnHtml(q.word.example_vn)}</div>
            <div style="font-size:13px;color:var(--muted)">${q.word.example_en}</div>
          </div>
        </div>
        <button id="flashcard-reveal" class="btn-ghost" style="margin-bottom:20px;width:100%">Tap to Reveal</button>
        <div id="fc-buttons" style="display:none;flex-direction:column;gap:10px">
          <div style="font-size:12px;color:var(--muted);margin-bottom:2px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600">How well did you know it?</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
            <button class="fc-rating-btn" data-rating="again" style="background:rgba(217,107,72,0.18);border:1.5px solid var(--coral);border-radius:12px;padding:12px 4px;cursor:pointer;transition:all 0.15s" onclick="UI.handleFlashcardRating('${q.word.id}', 'again')">
              <div style="font-size:20px;margin-bottom:4px">😵</div>
              <div style="font-size:12px;font-weight:700;color:var(--coral)">Again</div>
              <div style="font-size:10px;color:var(--muted)">Blank</div>
            </button>
            <button class="fc-rating-btn" data-rating="hard" style="background:rgba(232,184,75,0.12);border:1.5px solid rgba(232,184,75,0.4);border-radius:12px;padding:12px 4px;cursor:pointer;transition:all 0.15s" onclick="UI.handleFlashcardRating('${q.word.id}', 'hard')">
              <div style="font-size:20px;margin-bottom:4px">😓</div>
              <div style="font-size:12px;font-weight:700;color:var(--gold)">Hard</div>
              <div style="font-size:10px;color:var(--muted)">Struggled</div>
            </button>
            <button class="fc-rating-btn" data-rating="good" style="background:rgba(45,155,111,0.12);border:1.5px solid rgba(45,155,111,0.4);border-radius:12px;padding:12px 4px;cursor:pointer;transition:all 0.15s" onclick="UI.handleFlashcardRating('${q.word.id}', 'good')">
              <div style="font-size:20px;margin-bottom:4px">🙂</div>
              <div style="font-size:12px;font-weight:700;color:var(--jade)">Good</div>
              <div style="font-size:10px;color:var(--muted)">Got it</div>
            </button>
            <button class="fc-rating-btn" data-rating="easy" style="background:rgba(45,155,111,0.22);border:1.5px solid var(--jade);border-radius:12px;padding:12px 4px;cursor:pointer;transition:all 0.15s" onclick="UI.handleFlashcardRating('${q.word.id}', 'easy')">
              <div style="font-size:20px;margin-bottom:4px">😎</div>
              <div style="font-size:12px;font-weight:700;color:var(--jade)">Easy</div>
              <div style="font-size:10px;color:var(--muted)">Perfect</div>
            </button>
          </div>
        </div>
      </div>`;

    const reveal = () => {
      document.getElementById('fc-reveal').style.display = 'block';
      document.getElementById('flashcard-reveal').style.display = 'none';
      document.getElementById('fc-buttons').style.display = 'flex';
    };
    document.getElementById('fc-card').onclick = reveal;
    document.getElementById('flashcard-reveal').onclick = reveal;
  },

  handleFlashcardRating(word_id, rating) {
    // again=wrong(0), hard=partial credit(0.4), good=correct(1), easy=correct+bonus(1)
    const credit_map = { again: 0, hard: 0.4, good: 1, easy: 1 };
    const pts_map    = { again: 0, hard: 3,   good: 5, easy: 8 };
    const credit = credit_map[rating];
    const correct = credit > 0;

    if (!Store.state.seen[word_id]) Store.state.seen[word_id] = {seen:0,correct:0,mastery_awarded:false};
    const e = Store.state.seen[word_id];
    const first = e.seen === 0;
    e.seen++;
    e.correct += credit;   // fractional: hard adds 0.4, good/easy add 1.0
    Store.state.total_attempts++;
    if (correct) { Store.state.total_correct++; Store.state.consec_correct++; }
    else { Store.state.consec_correct = 0; }

    let pts = correct ? pts_map[rating] : 0;
    if (correct && first) pts += 5;
    if (!e.mastery_awarded && e.seen >= 5 && e.correct/e.seen >= 0.8) { pts += 50; e.mastery_awarded = true; }
    Store.state.points += pts; Store.state.total_points_earned += pts;
    Store.save();

    if (this.session) {
      if (correct) this.session.score++;
      this.session.pts_earned += pts;
    }
    this.updateHeader();
    if (pts > 0) Gamify.showPointsFloat(pts, document.querySelector(`.fc-rating-btn[data-rating="${rating}"]`));
    if (this.session) { this.session.index++; this.renderQuizView(); }
  },

  renderMultipleChoice(q, el) {
    const choiceHtml = q.choices.map((c, i) => `
      <button class="choice-btn" data-idx="${i}" onclick="UI.checkMC(${i}, ${q.correct_index}, this)">
        <span class="choice-btn__index">${i+1}</span>
        <span>${c}</span>
      </button>`).join('');

    el.innerHTML = `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">${q.prompt}</div>
        <div style="font-family:var(--font-display);font-size:clamp(26px,5vw,40px);font-weight:700;color:var(--cream)">${q.display_word}${q.asking==='en'?' '+this.speakBtnHtml(q.display_word,22):''}</div>
        ${this.dialectHtml(q.dialect_note)}
      </div>
      <div style="display:flex;flex-direction:column;gap:10px" id="mc-choices">${choiceHtml}</div>
      <div id="mc-feedback" style="margin-top:16px;display:none"></div>`;

    this._currentQ = q;
  },

  checkMC(selected, correct, btn) {
    const q = this._currentQ;
    const allBtns = document.querySelectorAll('.choice-btn');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = selected === correct;
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) allBtns[correct].classList.add('correct');

    const pts = Store.recordAttempt(q.word.id, isCorrect, 'multiple_choice');
    if (isCorrect) { this.session.score++; this.session.pts_earned += pts; }
    this.updateHeader();
    Gamify.showPointsFloat(pts, btn);

    const fb = document.getElementById('mc-feedback');
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = `<div style="background:var(--surface-2);border-radius:12px;padding:14px;font-size:14px;color:var(--muted);font-style:italic">
        ${q.word.example_vn} ${this.speakBtnHtml(q.word.example_vn)}<br><span style="font-size:13px">${q.word.example_en}</span></div>` + this.continueButtonHtml();
    }
  },

  renderTypeAnswer(q, el) {
    el.innerHTML = `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">${q.prompt}</div>
        <div style="font-family:var(--font-display);font-size:clamp(22px,4vw,34px);font-weight:700;color:var(--cream)">${q.word.en}</div>
        ${this.dialectHtml(q.dialect_note)}
      </div>
      <input class="type-input" id="type-input" type="text" placeholder="Type in Vietnamese…" autocomplete="off" autocorrect="off" spellcheck="false">
      <div id="type-feedback" style="margin-top:12px;min-height:24px"></div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-primary" style="flex:1" id="type-submit" onclick="UI.checkType()">Check →</button>
        <button class="btn-ghost" onclick="UI.skipQuestion()">Skip</button>
      </div>`;

    const input = document.getElementById('type-input');
    input.focus();
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('type-submit').click(); } });
    this._currentQ = q;
  },

  checkType() {
    const q = this._currentQ;
    const input = document.getElementById('type-input');
    const val = input.value;
    if (!val.trim()) return;

    const result = Quiz.checkTypeAnswer(q, val);
    const cls = result.tier === 'accent' ? 'almost' : (result.correct ? 'correct' : 'wrong');
    input.classList.add(cls);
    input.disabled = true;
    document.getElementById('type-submit').disabled = true;

    const pts = Store.recordAttempt(q.word.id, result.correct, 'type_answer');
    if (result.correct) { this.session.score++; this.session.pts_earned += pts; }
    this.updateHeader();
    Gamify.showPointsFloat(pts, input);

    const fb = document.getElementById('type-feedback');
    if (result.correct) {
      fb.innerHTML = `<span style="color:var(--jade);font-weight:600">✓ ${result.variant ? 'Accepted ('+result.variant+')' : 'Correct!'}</span>`;
    } else if (result.tier === 'accent') {
      fb.innerHTML = `<span style="color:var(--gold);font-weight:600">≈ Almost — right word, check your accents</span>
        <div style="margin-top:6px;font-size:17px;letter-spacing:0.02em">${this.diffHighlight(result.target, val)}</div>`;
    } else {
      fb.innerHTML = `<span style="color:var(--coral);font-weight:600">✗ Answer: <strong style="color:var(--cream)">${q.answer}</strong>${q.word.north?' (N: '+q.word.north+')':''}</span>`;
    }
    fb.innerHTML += `<div style="margin-top:8px;font-size:13px;color:var(--muted);font-style:italic">${q.word.example_vn} ${this.speakBtnHtml(q.word.example_vn)} — ${q.word.example_en}</div>`;
    fb.innerHTML += this.continueButtonHtml();
  },

  // Renders `correct` with each character that differs (case-insensitively) from the
  // same position in `typed` highlighted — isolates exactly which accents were off.
  diffHighlight(correct, typed) {
    const t = typed.trim();
    let out = '';
    for (let i = 0; i < correct.length; i++) {
      const c = correct[i];
      const same = t[i] !== undefined && t[i].toLowerCase() === c.toLowerCase();
      out += same ? c : `<span style="color:var(--gold);font-weight:700;text-decoration:underline">${c}</span>`;
    }
    return out;
  },

  renderFillSentence(q, el) {
    const choiceHtml = q.choices.map((c, i) => `
      <button class="choice-btn" onclick="UI.checkFill('${c}', ${i === q.correct_index}, this)">
        <span class="choice-btn__index">${i+1}</span>
        <span>${c}</span>
      </button>`).join('');

    el.innerHTML = `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Fill in the blank</div>
        <div style="font-size:20px;font-weight:600;color:var(--cream);line-height:1.5">${q.sentence_with_blank.replace('___','<span style="color:var(--gold);border-bottom:2px solid var(--gold);padding:0 6px">___</span>')}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:6px">Hint: ${q.hint}</div>
        ${this.dialectHtml(q.dialect_note)}
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">${choiceHtml}</div>
      <div id="fill-feedback" style="margin-top:16px;display:none"></div>`;

    this._currentQ = q;
  },

  checkFill(chosen, isCorrect, btn) {
    const q = this._currentQ;
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      document.querySelectorAll('.choice-btn').forEach(b => { if (b.textContent.trim() === q.answer) b.classList.add('correct'); });
    }

    const pts = Store.recordAttempt(q.word.id, isCorrect, 'fill_sentence');
    if (isCorrect) { this.session.score++; this.session.pts_earned += pts; }
    this.updateHeader();
    Gamify.showPointsFloat(pts, btn);

    const fb = document.getElementById('fill-feedback');
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = `<div style="font-size:14px;color:var(--muted);font-style:italic">${q.word.example_vn} ${this.speakBtnHtml(q.word.example_vn)}<br>${q.word.example_en}</div>` + this.continueButtonHtml();
    }
  },

  renderParticles(q, el) {
    const choiceHtml = q.choices.map((c, i) => `
      <button class="choice-btn" onclick="UI.checkParticle('${c}', ${i === q.correct_index}, this)">
        <span class="choice-btn__index">${i+1}</span>
        <span>${c}</span>
      </button>`).join('');

    el.innerHTML = `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Fill in the grammar word</div>
        <div style="font-size:20px;font-weight:600;color:var(--cream);line-height:1.5">${q.sentence_with_blank.replace('___','<span style="color:var(--gold);border-bottom:2px solid var(--gold);padding:0 6px">___</span>')}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:6px">Hint: ${q.hint}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px">Pattern: ${q.grammar.pattern}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">${choiceHtml}</div>
      <div id="particle-feedback" style="margin-top:16px;display:none"></div>`;

    this._currentQ = q;
  },

  checkParticle(chosen, isCorrect, btn) {
    const q = this._currentQ;
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      document.querySelectorAll('.choice-btn').forEach(b => { if (b.textContent.trim() === q.answer) b.classList.add('correct'); });
    }

    const pts = Store.recordGrammarAttempt(q.grammar.id, isCorrect);
    if (isCorrect) { this.session.score++; this.session.pts_earned += pts; }
    this.updateHeader();
    Gamify.showPointsFloat(pts, btn);

    const fb = document.getElementById('particle-feedback');
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = `<div style="font-size:14px;color:var(--cream)">${q.example_vn} ${this.speakBtnHtml(q.example_vn)}</div>
        <div style="font-size:13px;color:var(--muted);font-style:italic;margin-top:6px">${q.grammar.note}</div>` + this.continueButtonHtml();
    }
  },

  renderMatchPairs(q, el) {
    this.matchState = { selectedLeft: null, matched: new Set(), q };

    el.innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted)">Match the pairs</div>
        <div style="font-size:14px;color:var(--muted);margin-top:4px">Click an English word, then its Vietnamese match</div>
      </div>
      <div class="match-grid">
        ${q.left_items.map((l, i) => `
          <button class="match-item" data-id="${l.id}" data-side="left" onclick="UI.selectMatch(this,'left')">${l.text}</button>
          <button class="match-item" data-id="${q.right_items[i].id}" data-side="right" onclick="UI.selectMatch(this,'right')">${q.right_items[i].text}</button>
        `).join('')}
      </div>
      <div id="match-progress" style="text-align:center;margin-top:12px;font-size:13px;color:var(--muted)">0 / ${q.left_items.length} matched</div>`;
  },

  selectMatch(btn, side) {
    const ms = this.matchState;
    if (!ms) return;
    if (btn.classList.contains('matched')) return;

    if (side === 'left') {
      // clicking left selects/deselects it
      const alreadySelected = btn.classList.contains('selected');
      document.querySelectorAll('.match-item[data-side="left"]').forEach(b => b.classList.remove('selected'));
      if (alreadySelected) {
        ms.selectedLeft = null;
      } else {
        ms.selectedLeft = btn.dataset.id;
        btn.classList.add('selected');
      }
      return;
    }

    // side === 'right': only act if a left is already selected
    if (!ms.selectedLeft) return;

    const isMatch = ms.selectedLeft === btn.dataset.id;
    const leftBtn = document.querySelector(`.match-item[data-side="left"][data-id="${ms.selectedLeft}"]`);

    if (isMatch) {
      leftBtn.classList.remove('selected');
      leftBtn.classList.add('matched');
      btn.classList.add('matched');
      ms.matched.add(ms.selectedLeft);
      ms.selectedLeft = null;

      const pts = Store.recordAttempt(btn.dataset.id, true, 'match_pairs');
      this.session.pts_earned += pts;
      this.updateHeader();
      Gamify.showPointsFloat(pts, btn);

      const prog = document.getElementById('match-progress');
      if (ms.matched.size === ms.q.left_items.length) {
        Gamify.triggerConfetti();
        Gamify.showToast('All matched! 🎉', 'gold');
        if (prog) prog.innerHTML = this.continueButtonHtml();
      } else if (prog) {
        prog.textContent = `${ms.matched.size} / ${ms.q.left_items.length} matched`;
      }
    } else {
      // wrong: flash both red, keep left selected so player can try again
      leftBtn.classList.add('wrong-flash');
      btn.classList.add('wrong-flash');
      Store.recordAttempt(ms.selectedLeft, false, 'match_pairs');
      setTimeout(() => {
        leftBtn.classList.remove('wrong-flash');
        btn.classList.remove('wrong-flash');
      }, 500);
    }
  },

  renderGrammarQuiz(q, el) {
    const choiceHtml = q.choices.map((c, i) => `
      <button class="choice-btn" onclick="UI.checkGrammar(${i}, ${q.correct_index}, this)">
        <span class="choice-btn__index">${i+1}</span>
        <span>${c}</span>
      </button>`).join('');

    el.innerHTML = `
      <div style="margin-bottom:20px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Grammar Pattern</div>
        <div style="background:var(--surface-2);border-radius:12px;padding:16px;border-left:3px solid var(--gold)">
          <div style="font-family:var(--font-display);font-size:17px;color:var(--gold);font-weight:700;margin-bottom:6px">${q.grammar.pattern}</div>
          <div style="font-size:13px;color:var(--muted)">${q.grammar.note}</div>
        </div>
      </div>
      <div style="font-size:14px;font-weight:600;color:var(--muted);margin-bottom:12px">Which sentence uses this pattern correctly?</div>
      <div style="display:flex;flex-direction:column;gap:10px">${choiceHtml}</div>
      <div id="gram-feedback" style="margin-top:16px;display:none"></div>`;

    this._currentQ = q;
  },

  checkGrammar(selected, correct, btn) {
    const q = this._currentQ;
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    const isCorrect = selected === correct;
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) document.querySelectorAll('.choice-btn')[correct].classList.add('correct');

    const pts = Store.recordGrammarAttempt(q.grammar.id, isCorrect);
    if (isCorrect) { this.session.score++; this.session.pts_earned += pts; }
    this.updateHeader();
    Gamify.showPointsFloat(pts, btn);

    const fb = document.getElementById('gram-feedback');
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = `<div style="background:var(--surface-2);border-radius:12px;padding:14px;font-size:14px">
        <div style="color:var(--jade);font-size:12px;font-weight:600;margin-bottom:4px">✓ Correct sentence</div>
        <strong style="color:var(--cream)">${q.correct_vn}</strong> ${this.speakBtnHtml(q.correct_vn)}<br>
        <span style="color:var(--muted);font-size:13px">${q.correct_en}</span>
      </div>` + this.continueButtonHtml();
    }
  },

  continueButtonHtml() {
    return `<button class="btn-primary" style="width:100%;margin-top:14px" onclick="UI.continueSession()">Continue →</button>`;
  },

  continueSession() {
    if (this.session) { this.session.index++; this.renderQuizView(); }
  },

  skipQuestion() {
    if (this.session) { this.session.index++; this.renderQuizView(); }
  },

  renderWordOrder(q, el) {
    // State: placed = tiles in the answer row (in order), bank = remaining tiles
    const state = { placed: [], bank: [...q.tiles] };

    const render = () => {
      const placedHtml = state.placed.length
        ? state.placed.map((t, i) =>
            `<button class="match-item selected" style="min-width:60px;flex-shrink:0" onclick="UI._woRemove(${i})">${t}</button>`
          ).join('')
        : `<div style="color:var(--muted);font-size:13px;font-style:italic;padding:12px">Tap words below to build the sentence</div>`;

      const bankHtml = state.bank.map((t, i) =>
        `<button class="match-item" style="min-width:60px;flex-shrink:0" onclick="UI._woAdd(${i})">${t}</button>`
      ).join('');

      const allPlaced = state.bank.length === 0;

      el.innerHTML = `
        <div style="text-align:center;margin-bottom:20px">
          <div style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Build this sentence</div>
          <div style="background:var(--surface-2);border-radius:12px;padding:14px 16px;border-left:3px solid var(--gold)">
            <div style="font-family:var(--font-display);font-size:16px;color:var(--gold);font-weight:700;margin-bottom:4px">${q.grammar.pattern}</div>
            <div style="font-size:15px;font-weight:600;color:var(--cream)">${q.prompt_en}</div>
          </div>
        </div>

        <div style="font-size:12px;color:var(--muted);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Your answer:</div>
        <div id="wo-placed" style="min-height:54px;background:var(--surface);border:1.5px solid rgba(255,255,255,0.1);border-radius:12px;padding:8px;display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;align-items:center">
          ${placedHtml}
        </div>

        <div style="font-size:12px;color:var(--muted);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Word bank:</div>
        <div id="wo-bank" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px">
          ${bankHtml || '<div style="color:var(--jade);font-size:13px;font-style:italic">All words placed ✓</div>'}
        </div>

        <div style="display:flex;gap:10px">
          <button class="btn-danger" style="padding:10px 16px;font-size:14px" onclick="UI._woReset()">↺ Reset</button>
          <button class="btn-primary" style="flex:1" ${allPlaced ? '' : 'disabled'}
            onclick="UI._woSubmit()">Check answer →</button>
        </div>
        <div id="wo-feedback" style="margin-top:14px"></div>`;
    };

    // Attach state handlers to UI namespace temporarily
    UI._woState = state;
    UI._woQ = q;
    UI._woRender = render;

    UI._woAdd = (idx) => {
      state.placed.push(state.bank[idx]);
      state.bank.splice(idx, 1);
      render();
    };
    UI._woRemove = (idx) => {
      state.bank.push(state.placed[idx]);
      state.placed.splice(idx, 1);
      render();
    };
    UI._woReset = () => {
      state.bank = [...q.tiles];
      state.placed = [];
      render();
    };
    UI._woSubmit = () => {
      const isCorrect = state.placed.join('') === q.answer.join('');
      const fb = document.getElementById('wo-feedback');

      // Highlight placed tiles
      document.querySelectorAll('#wo-placed .match-item').forEach((btn, i) => {
        const correct = q.answer[i] === state.placed[i];
        btn.style.background = correct ? 'rgba(45,155,111,0.2)' : 'rgba(217,107,72,0.2)';
        btn.style.borderColor = correct ? 'var(--jade)' : 'var(--coral)';
      });

      // Disable all buttons before adding the continue button (it should stay enabled)
      el.querySelectorAll('button').forEach(b => b.disabled = true);

      const fullSentence = q.answer.join(' ');
      if (fb) {
        if (isCorrect) {
          fb.innerHTML = `<div style="color:var(--jade);font-weight:700;font-size:15px;text-align:center">✓ Correct! ${UI.speakBtnHtml(fullSentence)}</div>`;
        } else {
          fb.innerHTML = `
            <div style="color:var(--coral);font-weight:600;margin-bottom:8px">✗ Correct order:</div>
            <div style="background:var(--surface-2);border-radius:10px;padding:12px;font-size:15px;color:var(--cream)">${fullSentence} ${UI.speakBtnHtml(fullSentence)}</div>
            <div style="font-size:13px;color:var(--muted);margin-top:6px">${q.grammar.note}</div>`;
        }
        fb.innerHTML += UI.continueButtonHtml();
      }

      const pts = Store.recordGrammarAttempt(q.grammar.id, isCorrect);
      if (isCorrect) { this.session.score++; this.session.pts_earned += pts; }
      this.updateHeader();
      Gamify.showPointsFloat(pts, el.querySelector('.btn-primary'));
    };

    render();
  },

  handleAnswer(q, correct, mode) {
    const pts = Store.recordAttempt(q.word.id, correct, mode);
    if (correct) { this.session.score++; this.session.pts_earned += pts; }
    this.updateHeader();
    this.session.index++;
    this.renderQuizView();
  },

  showResults() {
    const s = this.session;
    const pct = Math.round(s.score / s.questions.length * 100);
    const stars = pct >= 80 ? '⭐⭐⭐' : pct >= 60 ? '⭐⭐' : '⭐';
    if (pct >= 70) Gamify.triggerConfetti();

    document.getElementById('view-quiz').innerHTML = `
      <div style="padding:24px;max-width:480px;margin:0 auto;text-align:center;padding-top:60px">
        <div style="font-size:64px;margin-bottom:16px">${pct>=80?'🎉':pct>=60?'😊':'💪'}</div>
        <div style="font-family:var(--font-display);font-size:28px;font-weight:700;margin-bottom:8px">Session Complete!</div>
        <div style="font-size:48px;font-weight:700;color:var(--gold);margin:16px 0">${s.score}<span style="font-size:24px;color:var(--muted)">/${s.questions.length}</span></div>
        <div style="font-size:22px;margin-bottom:8px">${stars}</div>
        <div style="font-size:16px;color:var(--jade);font-weight:600;margin-bottom:24px">+${s.pts_earned} pts earned</div>
        <div style="background:var(--surface);border-radius:16px;padding:16px;margin-bottom:24px;text-align:left">
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
            <span style="color:var(--muted)">Score</span><strong>${pct}%</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
            <span style="color:var(--muted)">Mode</span><strong>${s.mode === 'mixed' ? 'Mixed Practice' : s.mode.replace(/_/g,' ')}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0">
            <span style="color:var(--muted)">Points</span><strong style="color:var(--gold)">⭐ ${Store.state.points} total</strong>
          </div>
        </div>
        <div style="display:flex;gap:12px">
          <button class="btn-ghost" style="flex:1" onclick="UI.showView('learn')">← Back</button>
          <button class="btn-primary" style="flex:1" onclick="UI.startSession('${s.category}','${s.mode}')">Play Again</button>
        </div>
      </div>`;
  },

  // ── LESSONS ───────────────────────────────────────────────────────────────
  renderLessons() {
    const lvl = Gamify.getLevelInfo(Store.state.total_points_earned);
    const wordById = Object.fromEntries(WORDS.map(w => [w.id, w]));
    const grammarById = Object.fromEntries(GRAMMAR.map(g => [g.id, g]));
    const WORD_PREVIEW_COUNT = 8;

    // One card per lesson, unlocked strictly in order
    const gate = Store.checkLessonAccuracyGate();
    const lessonsHtml = LESSONS.map((l, i) => {
      const isDone = i < Store.state.unlocked_lesson;
      const isNext = i === Store.state.unlocked_lesson;
      const isFuture = i > Store.state.unlocked_lesson;
      const canAfford = Store.state.points >= l.cost;
      const gateMet = gate.met;

      const gateHtml = isNext && !gateMet ? `
        <div style="background:rgba(217,107,72,0.08);border:1px solid rgba(217,107,72,0.2);border-radius:8px;padding:8px 10px;margin-bottom:8px;font-size:12px">
          <div style="color:var(--coral);font-weight:600;margin-bottom:4px">🔒 Accuracy gate: ${gate.ready}/${gate.total} at 60%+</div>
          <div style="color:var(--muted);line-height:1.5">${gate.notReady.slice(0,5).map(x =>
            `<span style="color:${x.unseen?'var(--muted)':'var(--coral)'}">${x.label} ${x.unseen ? '(unseen)' : '('+x.accuracy+'%)'}</span>`
          ).join(' · ')}${gate.notReady.length > 5 ? ` · +${gate.notReady.length-5} more` : ''}</div>
        </div>` : '';

      const introHtml = l.intro_vn ? `
        <div style="background:var(--surface-2);border-radius:10px;padding:10px 12px;margin-bottom:8px;border-left:2px solid var(--gold)">
          <div style="font-size:13px;color:var(--cream);font-style:italic">${l.intro_vn} ${this.speakBtnHtml(l.intro_vn)}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px">${l.intro_en}</div>
        </div>` : '';

      const lessonWords = l.word_ids.map(id => wordById[id]).filter(Boolean);
      const wordsSummaryHtml = lessonWords.length ? `
        <div style="font-size:12px;color:var(--muted);margin-bottom:4px">
          <strong style="color:var(--cream)">Words:</strong>
          ${lessonWords.slice(0, WORD_PREVIEW_COUNT).map(w => `<span title="${this.escAttr(w.en)}">${w.vn}</span>`).join(', ')}${lessonWords.length > WORD_PREVIEW_COUNT ? ` +${lessonWords.length - WORD_PREVIEW_COUNT} more` : ''}
        </div>` : '';

      const lessonGrammar = l.grammar_ids.map(id => grammarById[id]).filter(Boolean);
      const grammarSummaryHtml = lessonGrammar.length ? `
        <div style="font-size:12px;color:var(--muted);margin-bottom:8px">
          <strong style="color:var(--cream)">Grammar:</strong> ${lessonGrammar.map(g => g.pattern).join(' · ')}
        </div>` : '';

      return `
        <div class="shop-card${isDone?' owned':''}" style="${isFuture?'opacity:0.5':''}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span style="font-size:22px">${l.icon}</span>
            <div style="flex:1">
              <span class="shop-card__name" style="margin:0">Lesson ${l.order}: ${l.title}</span>
              <div style="font-size:11px;color:var(--muted)">${l.topic}</div>
            </div>
            ${isDone
              ? `<span class="badge badge-jade" style="flex-shrink:0">✓ Done</span>`
              : isFuture
                ? `<span class="badge badge-muted" style="flex-shrink:0">🔒 Locked</span>`
                : ''}
          </div>
          ${introHtml}
          ${wordsSummaryHtml}
          ${grammarSummaryHtml}
          ${gateHtml}
          ${isDone
            ? ''
            : isNext
              ? `<div class="shop-card__footer">
                   <span style="color:var(--gold);font-weight:700">${l.cost===0?'Free':'⭐ '+l.cost}</span>
                   <button class="btn-gold" style="padding:8px 16px;font-size:13px" ${(canAfford && gateMet)?'':'disabled'}
                     onclick="UI.buyLesson()">${!gateMet ? '🔒 Gate locked' : canAfford ? 'Unlock' : 'Need '+(l.cost-Store.state.points)+' more'}</button>
                 </div>`
              : `<div style="font-size:12px;color:var(--muted)">⭐ ${l.cost} · unlock lesson ${i} first</div>`}
        </div>`;
    }).join('');

    document.getElementById('view-lessons').innerHTML = `
      <div style="padding:16px">
        <div style="background:var(--surface);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);margin-bottom:24px;text-align:center">
          <div style="font-size:14px;color:var(--muted);margin-bottom:4px">Your Balance</div>
          <div style="font-family:var(--font-display);font-size:40px;font-weight:700;color:var(--gold)">⭐ ${Store.state.points}</div>
          <div style="font-size:13px;color:var(--muted);margin-top:4px">${lvl.title} · ${Store.state.total_points_earned} pts earned total</div>
        </div>
        <div class="section-eyebrow" style="margin-bottom:10px">📚 Lessons</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">${lessonsHtml}</div>
      </div>`;
  },

  buyItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    if (Store.isItemOwned(item)) { Gamify.showToast('Already owned!','error'); return; }
    if (Store.state.points < item.cost) { Gamify.showToast('Not enough points! Need '+(item.cost-Store.state.points)+' more.','error'); return; }
    const result = Store.unlockItem(item);
    if (result) {
      Gamify.showToast(`Unlocked: ${item.name}!`, 'gold');
      this.updateHeader();
      this.renderLearn();
    }
  },

  buyLesson() {
    const next = Store.getNextLesson();
    if (!next) return;
    if (Store.state.points < next.cost) { Gamify.showToast('Not enough points! Need '+(next.cost-Store.state.points)+' more.','error'); return; }
    const result = Store.unlockNextLesson();
    if (result === 'gate') {
      const gate = Store.checkLessonAccuracyGate();
      Gamify.showToast(`Accuracy gate: ${gate.notReady.length} item${gate.notReady.length>1?'s':''} below 60% — practice more first!`, 'error');
      return;
    }
    if (result) {
      Gamify.showToast(`Unlocked: ${next.title}!`, 'gold');
      this.updateHeader();
      this.renderLessons();
    }
  },

  // ── PROGRESS ──────────────────────────────────────────────────────────────
  renderVocabulary() {
    const mode = this._vocabMode || 'category';
    const modeToggleHtml = `
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <button class="mode-pill${mode==='category'?' active':''}" onclick="UI._vocabMode='category';UI.renderVocabulary()">📁 By Category</button>
        <button class="mode-pill${mode==='lesson'?' active':''}" onclick="UI._vocabMode='lesson';UI.renderVocabulary()">📖 By Lesson</button>
      </div>`;

    let tabsHtml, words, p, activeLessonMeta = null;

    if (mode === 'lesson') {
      const unlockedLessons = Store.getUnlockedLessons();
      const activeLesson = this._vocabLesson && unlockedLessons.some(l => l.id === this._vocabLesson)
        ? this._vocabLesson : (unlockedLessons[unlockedLessons.length-1] || {}).id;
      this._vocabLesson = activeLesson;
      activeLessonMeta = LESSONS.find(l => l.id === activeLesson) || null;

      tabsHtml = [...unlockedLessons].reverse().map(l => {
        const active = l.id === activeLesson;
        return `<button class="category-pill${active?' active':''}" onclick="UI._vocabLesson='${l.id}';UI.renderVocabulary()">${l.order}. ${l.icon} ${l.title}</button>`;
      }).join('');

      words = activeLessonMeta ? Store.getWordsForLesson(activeLessonMeta.id).sort((a,b) => {
        const sa = Store.getWordStats(a.id), sb = Store.getWordStats(b.id);
        if (sa.seen_count===0 && sb.seen_count>0) return -1;
        if (sb.seen_count===0 && sa.seen_count>0) return 1;
        return sa.accuracy - sb.accuracy;
      }) : [];
      p = activeLessonMeta ? Store.getLessonProgress(activeLessonMeta.id) : {seen:0,mastered:0,total:0,total_all:0,gSeen:0,gMastered:0,gTotal:0,gramPatterns:[]};
    } else {
      const cats = Object.keys(CATEGORY_META).filter(c => Store.isCategoryAccessible(c));
      const activeCat = this._vocabCat && cats.includes(this._vocabCat) ? this._vocabCat : (cats[0] || 'greetings');
      this._vocabCat = activeCat;

      tabsHtml = cats.map(cat => {
        const meta = CATEGORY_META[cat] || {label:cat, icon:'📁'};
        return `<button class="category-pill${cat===activeCat?' active':''}" onclick="UI._vocabCat='${cat}';UI.renderVocabulary()">${meta.icon} ${meta.label}</button>`;
      }).join('');

      words = Store.getUnlockedWords(activeCat)
        .sort((a,b) => {
          const sa = Store.getWordStats(a.id), sb = Store.getWordStats(b.id);
          if (sa.seen_count===0 && sb.seen_count>0) return -1;
          if (sb.seen_count===0 && sa.seen_count>0) return 1;
          return sa.accuracy - sb.accuracy;
        });
      p = Store.getCategoryProgress(activeCat);
    }

    const rowsHtml = words.map(w => {
      const s = Store.getWordStats(w.id);
      const dialectStr = w.north ? ` <span style="color:var(--muted);font-size:11px">/ ${w.north}</span>` : '';
      const mastBadge = s.mastered ? `<span class="badge badge-jade" style="font-size:10px">★</span>` : '';
      // color: unseen=muted, <60%=coral (struggling), 60-79%=gold, ≥80%=jade (mastered)
      let accColor = 'var(--muted)';
      if (s.seen_count > 0) {
        if (s.accuracy >= 80)      accColor = 'var(--jade)';
        else if (s.accuracy >= 60) accColor = 'var(--gold)';
        else                       accColor = 'var(--coral)';
      }
      const accBar = s.seen_count > 0
        ? `<div style="display:flex;align-items:center;gap:6px">
             <div style="width:52px"><div class="progress-bar progress-bar--sm"><div class="progress-bar__fill" style="width:${s.accuracy}%;background:${accColor};transition:none"></div></div></div>
             <span style="font-size:12px;font-weight:600;color:${accColor};min-width:32px">${s.accuracy}%</span>
           </div>`
        : `<span style="color:var(--muted);font-size:12px">—</span>`;
      return `<tr>
        <td><strong>${w.vn}</strong> ${this.speakBtnHtml(w.vn, 14)}${dialectStr}</td>
        <td style="color:var(--muted)">${w.en}</td>
        <td style="text-align:center">${s.seen_count || '—'}</td>
        <td>${accBar}</td>
        <td style="text-align:center">${mastBadge}</td>
      </tr>`;
    }).join('');

    // Lesson mode also shows a small grammar-progress list, since a lesson bundles grammar too
    const grammarProgressHtml = (mode === 'lesson' && p.gTotal > 0) ? `
      <div class="section-eyebrow" style="margin:16px 0 10px">Grammar in this lesson</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
        ${p.gramPatterns.map(g => {
          const gs = Store.getGrammarPatternStats(g.id);
          let accColor = 'var(--muted)';
          if (gs.seen_count > 0) accColor = gs.accuracy >= 80 ? 'var(--jade)' : gs.accuracy >= 60 ? 'var(--gold)' : 'var(--coral)';
          return `<div style="background:var(--surface);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,0.06)">
            <span style="flex:1;font-size:13px;font-weight:600">${g.pattern}</span>
            ${gs.seen_count > 0
              ? `<span style="font-size:12px;font-weight:600;color:${accColor}">${gs.accuracy}%</span>${gs.mastered?'<span style="font-size:10px;color:var(--jade)">★</span>':''}`
              : `<span style="color:var(--muted);font-size:12px">—</span>`}
          </div>`;
        }).join('')}
      </div>` : '';

    const summaryLabel = mode === 'lesson' ? `${p.total} words unlocked` : `${p.total}/${p.total_all} words unlocked`;

    document.getElementById('view-vocabulary').innerHTML = `
      <div style="padding:16px;max-width:100%">
        <div class="section-title">Vocabulary</div>
        ${modeToggleHtml}
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">${tabsHtml}</div>
        <div style="background:var(--surface);border-radius:12px;padding:14px 16px;margin-bottom:16px;display:flex;gap:20px;align-items:center">
          <div><span style="font-family:var(--font-display);font-size:24px;font-weight:700;color:var(--gold)">${p.seen}</span><span style="color:var(--muted);font-size:13px">/${p.total} seen</span></div>
          <div><span style="font-family:var(--font-display);font-size:24px;font-weight:700;color:var(--jade)">${p.mastered}</span><span style="color:var(--muted);font-size:13px"> mastered</span></div>
          <div style="margin-left:auto;text-align:right"><span style="font-size:12px;color:var(--muted)">${summaryLabel}</span></div>
        </div>
        <div style="overflow-x:auto;background:var(--surface);border-radius:16px;border:1px solid rgba(255,255,255,0.06)">
          <table class="progress-table">
            <thead><tr><th>Vietnamese</th><th>English</th><th>Seen</th><th>Accuracy</th><th>★</th></tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
        ${grammarProgressHtml}
      </div>`;
  },

  // ── GRAMMAR ───────────────────────────────────────────────────────────────
  renderGrammar() {
    const cats = ['all','identity','pronouns','intensifiers','negation','questions','tense','modal','comparisons','classifiers','possession','imperatives','directions','numbers','linking'];
    const catLabels = {all:'All',identity:'Identity',pronouns:'Pronouns',intensifiers:'Intensifiers',negation:'Negation',questions:'Questions',tense:'Tense',modal:'Modals',comparisons:'Compare',classifiers:'Classifiers',possession:'Possession',imperatives:'Imperatives',directions:'Directions',numbers:'Numbers',linking:'Linking'};
    const activeCat = this._grammarCat || 'all';

    // Category pills are a pure browsing filter now — gating happens per-pattern via the Lessons tab
    const tabsHtml = cats.map(c => {
      return `<button class="category-pill${c===activeCat?' active':''}" onclick="UI._grammarCat='${c}';UI.renderGrammar()">
        ${catLabels[c]||c}
      </button>`;
    }).join('');

    const patterns = (activeCat === 'all'
      ? GRAMMAR.filter(g => Store.isGrammarUnlocked(g.id))
      : GRAMMAR.filter(g => g.category === activeCat && Store.isGrammarUnlocked(g.id)));

    const unlockedCount = GRAMMAR.filter(g => Store.isGrammarUnlocked(g.id)).length;

    const cardsHtml = patterns.length ? patterns.map(g => {
      const examplesHtml = g.examples.map(ex => `
        <div style="display:flex;flex-direction:column;gap:4px">
          <div class="grammar-card__example">${ex.vn} ${this.speakBtnHtml(ex.vn)}</div>
          <div class="grammar-card__translation">${ex.en}</div>
        </div>`).join('');
      const gs = Store.getGrammarPatternStats(g.id);
      let accColor = 'var(--muted)';
      if (gs.seen_count > 0) {
        accColor = gs.accuracy >= 80 ? 'var(--jade)' : gs.accuracy >= 60 ? 'var(--gold)' : 'var(--coral)';
      }
      const accHtml = gs.seen_count > 0
        ? `<div style="display:flex;align-items:center;gap:6px;margin-top:4px">
             <div style="width:52px;height:5px;background:var(--surface-2);border-radius:99px;overflow:hidden">
               <div style="width:${gs.accuracy}%;height:100%;background:${accColor};border-radius:99px"></div>
             </div>
             <span style="font-size:11px;font-weight:600;color:${accColor}">${gs.accuracy}%</span>
             ${gs.mastered ? `<span style="font-size:10px;color:var(--jade)">★ mastered</span>` : ''}
           </div>`
        : `<div style="font-size:11px;color:var(--muted);margin-top:4px">Not practiced yet</div>`;
      return `
        <div class="grammar-card">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div class="grammar-card__pattern">${g.pattern}</div>
            <div style="flex-shrink:0;text-align:right">${accHtml}</div>
          </div>
          <div class="grammar-card__formula">${g.pattern}</div>
          ${examplesHtml}
          <div class="grammar-card__note">💡 ${g.note}</div>
        </div>`;
    }).join('') : `<div style="color:var(--muted);font-size:14px;text-align:center;padding:24px">No patterns unlocked for this filter yet — unlock more lessons in the Lessons tab.</div>`;

    const pronunciationHtml = `
      <div style="background:rgba(139,163,184,0.08);border:1px solid rgba(139,163,184,0.2);border-radius:12px;padding:12px 14px;margin-bottom:20px">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">🗣️ Southern Pronunciation Notes</div>
        <ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">
          ${PRONUNCIATION_NOTES.map(n => `<li style="font-size:13px;color:var(--cream);line-height:1.5">${n}</li>`).join('')}
        </ul>
      </div>`;

    document.getElementById('view-grammar').innerHTML = `
      <div style="padding:16px;max-width:100%">
        <div class="section-title">A1 Grammar Reference</div>
        <div style="font-size:13px;color:var(--muted);margin-bottom:16px">${unlockedCount} / ${GRAMMAR.length} patterns unlocked</div>
        ${pronunciationHtml}
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">${tabsHtml}</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">${cardsHtml}</div>
        ${Store.isModeUnlocked('grammar_quiz')
          ? `<button class="btn-primary" style="width:100%" onclick="UI.startSession('all','grammar_quiz')">Practice Grammar Drills →</button>`
          : `<div style="text-align:center;color:var(--muted);font-size:14px">Buy Grammar Drill mode in the Learn tab to practice!</div>`}
      </div>`;
  },

  // ── DEBUG ─────────────────────────────────────────────────────────────────
  debugBoostAccuracy() {
    // Boost all unlocked words to ≥80%
    const words = Store.getAllUnlockedWords();
    for (const w of words) {
      if (!Store.state.seen[w.id]) Store.state.seen[w.id] = {seen:5,correct:4,mastery_awarded:false};
      else { const e=Store.state.seen[w.id]; if(e.seen<5)e.seen=5; e.correct=Math.max(e.correct,Math.ceil(e.seen*0.8)); }
    }
    // Boost all unlocked grammar patterns to ≥80%
    const unlockedGrammar = GRAMMAR.filter(g => Store.isGrammarUnlocked(g.id));
    for (const g of unlockedGrammar) {
      if (!Store.state.grammar_seen[g.id]) Store.state.grammar_seen[g.id] = {seen:5,correct:4};
      else { const e=Store.state.grammar_seen[g.id]; if(e.seen<5)e.seen=5; e.correct=Math.max(e.correct,Math.ceil(e.seen*0.8)); }
    }
    Store.state.total_correct = Object.values(Store.state.seen).reduce((s,e)=>s+e.correct,0);
    Store.state.total_attempts = Object.values(Store.state.seen).reduce((s,e)=>s+e.seen,0);
    Store.save();
    Gamify.showToast(`🐛 Boosted ${words.length} words + ${unlockedGrammar.length} grammar patterns to ≥80%`, 'gold');
    this.updateHeader();
    this.refreshCurrentView();
  },

  // ── STATS ─────────────────────────────────────────────────────────────────
  formatDuration(ms) {
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}m`;
  },

  accColor(acc) {
    if (acc === null) return 'var(--muted)';
    return acc >= 80 ? 'var(--jade)' : acc >= 60 ? 'var(--gold)' : 'var(--coral)';
  },

  renderAccuracyChart(days) {
    const W = 320, H = 120, padL = 8, padR = 8, padT = 10, padB = 24;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const n = days.length;
    const x = i => padL + (n === 1 ? 0 : i * (plotW / (n - 1)));
    const y = acc => padT + (100 - acc) / 100 * plotH;

    const gridLines = [0, 50, 100].map(v => `
      <line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${W - padR}" y2="${y(v).toFixed(1)}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="${padL}" y="${(y(v) - 3).toFixed(1)}" font-size="8" fill="var(--muted)">${v}%</text>`).join('');

    // Group into contiguous runs of days that have data, so gaps don't draw a misleading line through 0%
    const segments = [];
    let current = [];
    days.forEach((d, i) => {
      if (d.accuracy === null) { if (current.length) segments.push(current); current = []; }
      else current.push({x: x(i), y: y(d.accuracy)});
    });
    if (current.length) segments.push(current);

    const linesHtml = segments.filter(s => s.length > 1).map(s =>
      `<polyline points="${s.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}" fill="none" stroke="var(--jade)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    ).join('');

    const dotsHtml = days.map((d, i) => d.accuracy === null ? '' :
      `<circle cx="${x(i).toFixed(1)}" cy="${y(d.accuracy).toFixed(1)}" r="3" fill="${this.accColor(d.accuracy)}"><title>${d.date}: ${d.accuracy}% (${d.correct}/${d.attempts})</title></circle>`
    ).join('');

    const noData = days.every(d => d.accuracy === null);
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
      ${gridLines}${linesHtml}${dotsHtml}
      <text x="${padL}" y="${H-4}" font-size="9" fill="var(--muted)">${days[0].date.slice(5).replace('-','/')}</text>
      <text x="${W-padR}" y="${H-4}" font-size="9" fill="var(--muted)" text-anchor="end">${days[n-1].date.slice(5).replace('-','/')}</text>
    </svg>${noData ? '<div style="text-align:center;color:var(--muted);font-size:12px;margin-top:4px">No activity yet</div>' : ''}`;
  },

  renderTimeChart(days) {
    const W = 320, H = 110, padL = 8, padR = 8, padT = 10, padB = 24;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const n = days.length;
    const minutes = days.map(d => d.ms / 60000);
    const maxMin = Math.max(...minutes, 1);
    const slot = plotW / n;
    const barW = slot * 0.6;

    const barsHtml = days.map((d, i) => {
      const m = minutes[i];
      const h = (m / maxMin) * plotH;
      const bx = padL + i * slot + (slot - barW) / 2;
      const by = padT + plotH - h;
      return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(h,1).toFixed(1)}" rx="2" fill="var(--gold)"><title>${d.date}: ${Math.round(m)}m</title></rect>`;
    }).join('');

    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
      <line x1="${padL}" y1="${padT+plotH}" x2="${W-padR}" y2="${padT+plotH}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      ${barsHtml}
      <text x="${padL}" y="${H-4}" font-size="9" fill="var(--muted)">${days[0].date.slice(5).replace('-','/')}</text>
      <text x="${W-padR}" y="${H-4}" font-size="9" fill="var(--muted)" text-anchor="end">${days[n-1].date.slice(5).replace('-','/')}</text>
    </svg>`;
  },

  renderStats() {
    const lvl = Gamify.getLevelInfo(Store.state.total_points_earned);
    const streaks = Store.getStreakStats();
    const days = Store.getDailyRange(14);

    const streakHtml = `
      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card"><div class="stat-card__number">${streaks.current}</div><div class="stat-card__label">Current Streak 🔥</div></div>
        <div class="stat-card"><div class="stat-card__number">${streaks.longest}</div><div class="stat-card__label">Longest Streak</div></div>
        <div class="stat-card"><div class="stat-card__number">${streaks.shortest ?? '—'}</div><div class="stat-card__label">Shortest Streak</div></div>
      </div>`;

    // Categories/lessons with at least one attempted word, for the "best category" stat and the two breakdown lists
    const catStats = Object.keys(CATEGORY_META)
      .map(cat => ({ cat, meta: CATEGORY_META[cat], p: Store.getCategoryProgress(cat) }))
      .filter(x => x.p.accuracy !== null);
    const bestCat = catStats.filter(x => x.p.seen >= 3)
      .sort((a, b) => b.p.accuracy - a.p.accuracy)[0];

    const overviewHtml = `
      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card"><div class="stat-card__number">${Store.getSeenCount()}</div><div class="stat-card__label">Words Seen</div></div>
        <div class="stat-card"><div class="stat-card__number">${Store.getMasteredCount()}</div><div class="stat-card__label">Mastered</div></div>
        <div class="stat-card"><div class="stat-card__number">${Store.getOverallAccuracy()}%</div><div class="stat-card__label">Overall Accuracy</div></div>
        <div class="stat-card"><div class="stat-card__number">${Store.state.total_points_earned}</div><div class="stat-card__label">Points Earned</div></div>
        <div class="stat-card"><div class="stat-card__number">${this.formatDuration(Store.getAvgTimePerActiveDay())}</div><div class="stat-card__label">Avg / Active Day</div></div>
        <div class="stat-card"><div class="stat-card__number" style="font-size:17px">${bestCat ? bestCat.meta.icon + ' ' + bestCat.meta.label : '—'}</div><div class="stat-card__label">Best Category</div></div>
      </div>`;

    const catRows = catStats
      .sort((a, b) => b.p.accuracy - a.p.accuracy)
      .map(({meta, p}) => `
        <div style="display:flex;align-items:center;gap:10px;background:var(--surface);border-radius:12px;padding:10px 14px;border:1px solid rgba(255,255,255,0.06)">
          <span style="flex:1;font-size:13px;font-weight:600">${meta.icon} ${meta.label}</span>
          <div style="width:60px"><div class="progress-bar progress-bar--sm"><div class="progress-bar__fill" style="width:${p.accuracy}%;background:${this.accColor(p.accuracy)}"></div></div></div>
          <span style="font-size:12px;font-weight:600;color:${this.accColor(p.accuracy)};min-width:32px;text-align:right">${p.accuracy}%</span>
        </div>`).join('');

    const lessonRows = Store.getUnlockedLessons()
      .map(l => ({ l, p: Store.getLessonProgress(l.id) }))
      .filter(x => x.p.accuracy !== null)
      .sort((a, b) => b.p.accuracy - a.p.accuracy)
      .map(({l, p}) => `
        <div style="display:flex;align-items:center;gap:10px;background:var(--surface);border-radius:12px;padding:10px 14px;border:1px solid rgba(255,255,255,0.06)">
          <span style="flex:1;font-size:13px;font-weight:600">${l.order}. ${l.icon} ${l.title}</span>
          <div style="width:60px"><div class="progress-bar progress-bar--sm"><div class="progress-bar__fill" style="width:${p.accuracy}%;background:${this.accColor(p.accuracy)}"></div></div></div>
          <span style="font-size:12px;font-weight:600;color:${this.accColor(p.accuracy)};min-width:32px;text-align:right">${p.accuracy}%</span>
        </div>`).join('');

    document.getElementById('view-stats').innerHTML = `
      <div style="padding:16px">
        <div class="section-title">📈 Stats</div>
        <div style="font-size:13px;color:var(--muted);margin-bottom:16px">${lvl.title} · ${Store.state.total_points_earned} pts earned total</div>

        <div class="section-eyebrow" style="margin-bottom:10px">Streaks</div>
        ${streakHtml}

        <div class="section-eyebrow" style="margin-bottom:10px">Overview</div>
        ${overviewHtml}

        ${catRows ? `
        <div class="section-eyebrow" style="margin-bottom:10px">Accuracy by Category</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">${catRows}</div>` : ''}

        ${lessonRows ? `
        <div class="section-eyebrow" style="margin-bottom:10px">Accuracy by Lesson</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">${lessonRows}</div>` : ''}

        <div class="section-eyebrow" style="margin-bottom:10px">Accuracy Trend (last 14 days)</div>
        <div style="background:var(--surface);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);margin-bottom:20px">${this.renderAccuracyChart(days)}</div>

        <div class="section-eyebrow" style="margin-bottom:10px">Time Spent per Day (last 14 days)</div>
        <div style="background:var(--surface);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);margin-bottom:8px">${this.renderTimeChart(days)}</div>
      </div>`;
  },
};
