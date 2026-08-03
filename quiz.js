const Quiz = {
  shuffle(arr) {
    for (let i=arr.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    return arr;
  },

  selectWord(pool, seen) {
    const w = pool.map(word => {
      const s = seen[word.id];
      if (!s || s.seen===0) return 3;
      return s.correct/s.seen < 0.6 ? 2 : 1;
    });
    const total = w.reduce((a,b)=>a+b,0);
    let r = Math.random()*total;
    for (let i=0;i<pool.length;i++) { r-=w[i]; if(r<=0) return pool[i]; }
    return pool[pool.length-1];
  },

  getDistractors(correct, pool, n=3) {
    const same = this.shuffle(pool.filter(w=>w.id!==correct.id&&w.category===correct.category));
    const picks = same.slice(0,n);
    if (picks.length<n) {
      const other = this.shuffle(pool.filter(w=>w.id!==correct.id&&w.category!==correct.category));
      picks.push(...other.slice(0,n-picks.length));
    }
    return picks;
  },

  normalize(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[đĐ]/g,'d').toLowerCase().trim(); },

  getDialectNote(word) { return word.north ? `South: ${word.vn} · North: ${word.north}` : null; },

  generateQuestion(mode, category, seenStats) {
    const pool = category==='all' ? Store.getAllUnlockedWords() : Store.getUnlockedWords(category);
    if (pool.length === 0) return null;

    if (mode==='match_pairs') {
      const sel = this.shuffle([...pool]).slice(0,Math.min(6,pool.length));
      return { type:'match_pairs', pairs:sel.map(w=>({en:w.en,vn:w.vn,id:w.id})),
        left_items:sel.map(w=>({text:w.en,id:w.id})),
        right_items:this.shuffle(sel.map(w=>({text:w.vn,id:w.id}))) };
    }

    if (mode==='grammar_quiz' || mode==='word_order') {
      // Filter patterns whose requires are met
      const available = GRAMMAR.filter(g => {
        // Must have grammar category unlocked
        if (!Store.isGrammarUnlocked(g.category)) return false;
        if (!g.requires) return true;
        const cats = g.requires.categories || [];
        if (!cats.every(c => Store.isCategoryAccessible(c))) return false;
        const tiers = g.requires.tiers || {};
        return Object.entries(tiers).every(([c,t]) => Store.getCategoryTier(c) >= t);
      });
      if (available.length === 0) return null;
      const g = available[Math.floor(Math.random() * available.length)];

      if (mode === 'word_order') {
        const exs = g.word_order_exercises;
        if (!exs || exs.length === 0) {
          // fallback: use grammar_quiz question instead
          mode = 'grammar_quiz';
        } else {
          const ex = exs[Math.floor(Math.random() * exs.length)];
          const shuffled = Quiz.shuffle([...ex.tiles]);
          return {
            type: 'word_order',
            grammar: g,
            prompt_en: ex.prompt_en,
            tiles: shuffled,
            answer: ex.answer,
          };
        }
      }

      // grammar_quiz: pick correct example, 3 wrong from other patterns
      const example = g.examples[Math.floor(Math.random() * g.examples.length)];
      const others = Quiz.shuffle(available.filter(x => x.id !== g.id));
      const wrongSentences = [];
      for (const og of others) {
        if (wrongSentences.length >= 3) break;
        const oe = og.examples[Math.floor(Math.random() * og.examples.length)];
        wrongSentences.push(oe.vn);
      }
      while (wrongSentences.length < 3) {
        wrongSentences.push(available[wrongSentences.length % available.length].examples[0].vn);
      }
      const choices = Quiz.shuffle([example.vn, ...wrongSentences]);
      return {
        type: 'grammar_quiz',
        grammar: g,
        correct_vn: example.vn,
        correct_en: example.en,
        prompt: `Pattern: "${g.pattern}"`,
        choices,
        correct_index: choices.indexOf(example.vn),
      };
    }

    if (mode==='particles') {
      const available = GRAMMAR.filter(g => {
        if (!g.key) return false;
        if (!Store.isGrammarUnlocked(g.category)) return false;
        if (!g.requires) return true;
        const cats = g.requires.categories || [];
        if (!cats.every(c => Store.isCategoryAccessible(c))) return false;
        const tiers = g.requires.tiers || {};
        return Object.entries(tiers).every(([c,t]) => Store.getCategoryTier(c) >= t);
      });
      if (available.length === 0) return null;

      const pool2 = this.shuffle([...available]);
      let g, example;
      for (const cand of pool2) {
        const matches = cand.examples.filter(e => e.vn.toLowerCase().includes(cand.key.toLowerCase()));
        if (matches.length > 0) { g = cand; example = matches[Math.floor(Math.random() * matches.length)]; break; }
      }
      if (!g) return null;

      const blankRe = new RegExp(g.key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'i');
      const sentence_with_blank = example.vn.replace(blankRe, '___');

      const sameCategory = this.shuffle(available.filter(x => x.id !== g.id && x.category === g.category));
      const otherCategory = this.shuffle(available.filter(x => x.id !== g.id && x.category !== g.category));
      const distractorPool = [...sameCategory, ...otherCategory];
      const distractorKeys = [];
      for (const d of distractorPool) {
        if (distractorKeys.length >= 3) break;
        if (!distractorKeys.includes(d.key) && d.key !== g.key) distractorKeys.push(d.key);
      }
      const choices = this.shuffle([g.key, ...distractorKeys]);
      return {
        type: 'particles',
        grammar: g,
        sentence_with_blank,
        answer: g.key,
        hint: example.en,
        choices,
        correct_index: choices.indexOf(g.key),
      };
    }

    const word = this.selectWord(pool, seenStats);

    if (mode==='flashcard') {
      return { type:'flashcard', word, dialect_note:this.getDialectNote(word) };
    }

    if (mode==='multiple_choice') {
      const askEN = Math.random()<0.5;
      const dist = this.getDistractors(word, pool);
      if (askEN) {
        const choices = this.shuffle([word.en,...dist.map(d=>d.en)]);
        return { type:'multiple_choice', word, prompt:`What does "${word.vn}" mean?`, display_word:word.vn,
          choices, correct_index:choices.indexOf(word.en), asking:'en', dialect_note:this.getDialectNote(word) };
      } else {
        const choices = this.shuffle([word.vn,...dist.map(d=>d.vn)]);
        return { type:'multiple_choice', word, prompt:`Which Vietnamese word means "${word.en}"?`, display_word:word.en,
          choices, correct_index:choices.indexOf(word.vn), asking:'vn', dialect_note:this.getDialectNote(word) };
      }
    }

    if (mode==='type_answer') {
      return { type:'type_answer', word, prompt:`Type Vietnamese for: "${word.en}"`, answer:word.vn, dialect_note:this.getDialectNote(word) };
    }

    if (mode==='fill_sentence') {
      const blanked = word.example_vn.replace(new RegExp(word.vn.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'___');
      const dist = this.getDistractors(word, pool);
      const choices = this.shuffle([word.vn,...dist.map(d=>d.vn)]);
      return { type:'fill_sentence', word, sentence_with_blank:blanked, answer:word.vn,
        choices, correct_index:choices.indexOf(word.vn), hint:word.en, dialect_note:this.getDialectNote(word) };
    }

    return null;
  },

  // Generate a question for a specific word (used for guaranteed slots)
  generateQuestionForWord(mode, word, pool) {
    const dialect_note = this.getDialectNote(word);
    if (mode === 'flashcard') {
      return { type:'flashcard', word, dialect_note };
    }
    if (mode === 'multiple_choice') {
      const askEN = Math.random() < 0.5;
      const dist = this.getDistractors(word, pool);
      if (askEN) {
        const choices = this.shuffle([word.en, ...dist.map(d=>d.en)]);
        return { type:'multiple_choice', word, prompt:`What does "${word.vn}" mean?`, display_word:word.vn,
          choices, correct_index:choices.indexOf(word.en), asking:'en', dialect_note };
      } else {
        const choices = this.shuffle([word.vn, ...dist.map(d=>d.vn)]);
        return { type:'multiple_choice', word, prompt:`Which Vietnamese word means "${word.en}"?`, display_word:word.en,
          choices, correct_index:choices.indexOf(word.vn), asking:'vn', dialect_note };
      }
    }
    if (mode === 'type_answer') {
      return { type:'type_answer', word, prompt:`Type Vietnamese for: "${word.en}"`, answer:word.vn, dialect_note };
    }
    if (mode === 'fill_sentence') {
      const blanked = word.example_vn.replace(new RegExp(word.vn.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'___');
      const dist = this.getDistractors(word, pool);
      const choices = this.shuffle([word.vn, ...dist.map(d=>d.vn)]);
      return { type:'fill_sentence', word, sentence_with_blank:blanked, answer:word.vn,
        choices, correct_index:choices.indexOf(word.vn), hint:word.en, dialect_note };
    }
    // match_pairs doesn't work per-word — fall back to multiple_choice
    const choices = this.shuffle([word.en, ...this.getDistractors(word, pool).map(d=>d.en)]);
    return { type:'multiple_choice', word, prompt:`What does "${word.vn}" mean?`, display_word:word.vn,
      choices, correct_index:choices.indexOf(word.en), asking:'en', dialect_note };
  },

  checkTypeAnswer(question, input) {
    const ni = this.normalize(input), na = this.normalize(question.answer);
    if (input.trim()===question.answer || ni===na) return {correct:true,exact:input.trim()===question.answer,variant:null};
    if (question.word&&question.word.north && ni===this.normalize(question.word.north))
      return {correct:true,exact:false,variant:question.word.north};
    return {correct:false,exact:false,variant:null};
  },
};
