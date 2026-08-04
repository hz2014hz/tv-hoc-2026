# Vietnamese Learning App — Project Context

## What this is

A gamified, web-based Vietnamese language learning app built as a **multi-file vanilla JS project** (no frameworks, no build step). It runs entirely in the browser, saves all progress to `localStorage`, and is designed to be hosted on GitHub Pages. The primary audience is an A1-level adult learner with a focus on **Southern (Saigon) Vietnamese**, with Northern dialect variants shown where they differ.

## File structure

```
viet-learn/
├── index.html      — HTML shell, loads all scripts
├── style.css       — Full CSS design system
├── data.js         — All vocabulary, grammar, shop items, achievements, category metadata
├── store.js        — State management + localStorage persistence
├── quiz.js         — Question generation for all 6 quiz modes
├── gamify.js       — Points, achievements, toasts, confetti, level system
├── ui.js           — All view rendering, event handling, routing
└── CONTEXT.md      — This file
```

## Design system (style.css)

CSS custom properties defined on `:root`:
- `--bg: #0D1B2A` — midnight navy background
- `--surface: #162233` — card surface
- `--surface-2: #1E3045` — elevated surface
- `--gold: #E8B84B` — points/XP accent
- `--jade: #2D9B6F` — correct answers, progress
- `--coral: #D96B48` — wrong answers, danger
- `--cream: #F2EDE4` — primary text
- `--muted: #8BA3B8` — secondary text

Fonts: Playfair Display (display headings) + Inter (body) via Google Fonts.

The app is a **centered 680px column** on a dark `#080f18` background — like a mobile app on desktop. Header and nav use `position:sticky` (not fixed). All views use `.view` / `.view.active` toggling.

**Accuracy color convention** (used in progress bars and badges):
- Coral = below 60% (struggling)
- Gold = 60–79% (improving)
- Jade = 80%+ (mastered)
- Muted/— = never seen

## data.js structure

### WORDS array
Each word object:
```js
{
  id: 'v001',          // unique string
  tier: 1,             // 1 = free starter, 2+ = bought via shop
  vn: 'ăn',           // Vietnamese (Southern primary form)
  north: null,         // Northern variant string, or null if same
  en: 'to eat',        // English meaning
  category: 'verbs',   // see categories below
  example_vn: '...',   // example sentence in Vietnamese
  example_en: '...',   // example sentence in English
}
```

**Categories:** `greetings`, `verbs`, `adjectives`, `nouns`, `food`, `family`, `numbers`, `time`, `colors`, `places`, `prepositions`

**Unlocking:** Words/grammar are no longer unlocked per-category-tier — see `LESSONS` below. `tier` is now unused (harmless leftover field; not read by any code). `category` is still used everywhere for quiz distractor-picking and the Progress tab's grouping.

**Adding custom words:** Copy any existing line and change the fields, then add the new word's `id` to the `word_ids` array of whichever `LESSONS` entry it thematically belongs to (a word not referenced by any lesson is never unlockable). The comment block at the top of `data.js` explains the WORDS format.

### GRAMMAR array
Each grammar pattern:
```js
{
  id: 'gr01',
  category: 'identity',   // identity|negation|questions|tense|modal|comparisons|classifiers|linking
  pattern: 'Subject + là + Noun',
  note: '...',            // short explanation
  requires: {             // optional: which word categories must be accessible
    categories: ['greetings'],
    tiers: {nouns: 2}     // optional: minimum tier requirement
  },
  examples: [             // 2-3 curated examples (NOT dynamically generated)
    {vn: 'Tôi là sinh viên.', en: 'I am a student.'},
    ...
  ],
  word_order_exercises: [ // 1-2 exercises for word-order mode
    {
      prompt_en: 'I am a student.',
      tiles: ['Tôi', 'là', 'sinh viên', '.'],   // shuffled in UI
      answer: ['Tôi', 'là', 'sinh viên', '.'],  // correct order
    },
    ...
  ],
}
```

**Grammar categories:** `identity` is free. Others (negation, questions, tense, modal, comparisons, classifiers, linking) must be purchased in the Shop.

### SHOP_ITEMS array
Only one type now: `type:'mode'` — flat unlock for a quiz mode. Key fields: `id`, `type`, `name`, `cost`, `desc`, `unlockKey`, `icon`.

Word/grammar unlocking used to live here as `type:'tier'`/`type:'grammar'` entries; that's been replaced entirely by `LESSONS` (see below) — `Store.unlockNextLesson()` reads `LESSONS[i].cost` directly instead of a shop item.

### LESSONS array
The A1 curriculum and the *only* unlock mechanism for words/grammar. An ordered array, unlocked strictly in sequence via `Store.unlockNextLesson()`:
```js
{
  id: 'lesson01', order: 1, title: 'Xin chào!', topic: 'Greetings & basic manners',
  icon: '👋', cost: 0,
  word_ids: ['g001','g004', ...],   // WORDS ids, any category, curated by theme
  grammar_ids: ['gr01','gr61'],     // GRAMMAR ids introduced in this lesson
  intro_vn: '...', intro_en: '...', // short scene-setting blurb
}
```
22 lessons cover every `WORDS` id and every `GRAMMAR` id exactly once. Word/grammar `category` fields are untouched by this and still drive the Progress tab and the Grammar tab's browse filter.

### ACHIEVEMENTS array
```js
{id:'first_word', title:'First Steps', desc:'See your first word', icon:'👀'}
```
Conditions are evaluated in `gamify.js` `ACHIEVEMENT_CONDITIONS` map.

### CATEGORY_META
```js
greetings: {label:'Greetings', icon:'👋', color:'#2D9B6F'}
```
Used throughout the UI for display.

## store.js

Single `Store` object. Key state fields:
```js
{
  seen: {},              // {word_id: {seen, correct, mastery_awarded}}
  grammar_seen: {},      // {grammar_id: {seen, correct}}
  points: 0,
  total_points_earned: 0,
  streak: 0,
  best_streak: 0,
  last_activity: null,   // YYYY-MM-DD string
  unlocked_lesson: 1,    // how many LESSONS entries are unlocked (1-indexed; lesson 1 is free)
  unlocked_modes: ['flashcard', 'multiple_choice'],
  unlocked_boosts: [],
  achievements: [],
  consec_correct: 0,
  typed_correct: 0,
  total_correct: 0,
  total_attempts: 0,
  last_category: 'all',
  last_mode: 'multiple_choice',
  tts_voice_uri: null,   // selected Web Speech API voice, or null for browser default
}
```

**localStorage key:** `viet_learn_v2` (bumped from `v1` when the lesson system replaced category tiers — no migration, old saves just reset)

**Key methods:**
- `recordAttempt(word_id, correct, mode)` — updates seen/correct, awards points, returns pts earned. Points only awarded on correct.
- `recordGrammarAttempt(grammar_id, correct)` — same for grammar patterns
- `getUnlockedLessons()` / `getUnlockedWordIdSet()` / `getUnlockedGrammarIdSet()` — derived from `LESSONS.slice(0, state.unlocked_lesson)`
- `getUnlockedWords(cat)` — WORDS in category `cat` whose id is in the unlocked-word-id set
- `getAllUnlockedWords()` — all accessible words across every unlocked lesson
- `getWordsForLesson(lessonId)` — the specific words taught in one lesson (used by the Learn tab's per-lesson practice)
- `isGrammarUnlocked(grammarId)` — takes a `GRAMMAR` pattern **id**, not a category
- `getCurrentLesson()` / `getNextLesson()` — `LESSONS[unlocked_lesson-1]` / `LESSONS[unlocked_lesson]`
- `checkLessonAccuracyGate()` — returns `{met, total, ready, notReady[]}` across every word + grammar pattern in currently-unlocked lessons
- `unlockNextLesson()` — returns `true` (success), `false` (can't afford / no next lesson), or `'gate'` (accuracy gate blocked)
- `getGrammarPatternStats(id)` — `{seen_count, accuracy, mastered}`

**Accuracy gate:** Before unlocking the next lesson, every word and grammar pattern across *all* currently-unlocked lessons must be ≥60% accuracy. Unlocking lesson 2 (the first paid one) is exempt, since lesson 1 has nothing practiced yet by definition.

## quiz.js

Single `Quiz` object.

**Question generation:**
```js
Quiz.generateQuestion(mode, lessonOrAll, seenStats)
// lessonOrAll is 'all' (every unlocked word) or a specific LESSONS id
```

**Modes:**
- `flashcard` — show VN word, tap to reveal EN + example. 4 Anki-style rating buttons: Again (0 credit), Hard (0.4 credit), Good (1.0 credit), Easy (1.0 credit + bonus pts)
- `multiple_choice` — 50% show VN→pick EN, 50% show EN→pick VN. 4 choices.
- `type_answer` — show EN, type Vietnamese. Lenient matching (strips diacritics). Accepts Northern variant.
- `fill_sentence` — blank out the word in `example_vn`, pick from 4 choices
- `match_pairs` — click EN word then matching VN word. 6 pairs. Left tile stays selected on wrong guess.
- `grammar_quiz` — show pattern, pick correct example sentence from 4 options
- `word_order` — show English prompt, tap Vietnamese word tiles into correct order

**Grammar modes filter** by `Store.isGrammarUnlocked(g.id)` (per-pattern, since a `GRAMMAR.category` can now be partially unlocked across different lessons). `g.requires` still exists on some patterns but is no longer read — lesson curation is the prerequisite mechanism now.

- `particles` — show a sentence with the pattern's marker word blanked out (`GRAMMAR[i].key`, matched against a random `examples[]` entry), pick from 4 choices

**`generateQuestionForWord(mode, word, pool)`** — generates a question for a specific word (used for guaranteed struggling/unseen slots in session).

**Weighted word selection (`selectWord`):**
- Unseen (seen=0): weight 3
- Struggling (accuracy <60%): weight 2
- Known (accuracy ≥60%): weight 1

**Session composition** (in `UI.startSession`):
- Guaranteed 2 unseen + 2 struggling slots (if they exist)
- Remaining 6 slots: weighted random
- Final list shuffled so guaranteed words don't always appear first
- Grammar modes skip this — just generate 10 questions normally

**Flashcard credit system:**
- `Again` → `correct += 0`, weight stays high
- `Hard` → `correct += 0.4`, partial credit
- `Good` → `correct += 1.0`
- `Easy` → `correct += 1.0` + bonus points

## gamify.js

- `getLevelInfo(totalPts)` — returns `{title, next, pct, in_level}`. Levels: Beginner(0) → Learner(100) → Student(300) → Speaker(600) → Conversant(1000) → Fluent(2000)
- `checkAchievements()` — evaluates all 12 achievements against current Store state
- `showToast(msg, type)` — types: `success`, `error`, `gold`, `achievement`
- `showPointsFloat(pts, el)` — floating "+N pts" animation
- `triggerConfetti()` — 35 confetti pieces

## ui.js

Single `UI` object. Key properties:
- `currentView` — active tab name
- `session` — `{questions, index, score, pts_earned, mode, category}`
- `matchState` — state for match_pairs mode
- `learnLesson`, `learnMode` — selections on Learn tab (`learnLesson` is `'all'` or a `LESSONS` id)
- `_progressCat`, `_grammarCat` — active filter on Progress/Grammar tabs

**Views:** home, learn, quiz, shop, progress, grammar, achievements

**Tab navigation:** Bottom nav with 6 tabs: Home, Learn, Shop, Progress, Grammar, Awards

**Debug buttons** (in Shop balance card, dashed borders):
- 🐛 +300 stars — adds 300 pts directly
- 🐛 boost accuracy — sets all unlocked words AND grammar patterns to 5 seen / 4 correct (80%), clearing all accuracy gates

**Learn tab features:**
- Grammar modes (grammar_quiz, word_order, particles) auto-select "All Words" and hide the lesson picker
- 🌐 All Words option at top of the lesson list (pools every word across every unlocked lesson)
- Unlocked lessons listed most-recent-first for per-lesson practice
- Compatibility warnings for incompatible mode/lesson combos
- Session preview shows unseen/struggling/known word counts
- Green badge when guarantee kicks in (≥2 unseen or ≥2 struggling exist)

**Shop tab features:**
- Single "📚 Lessons" section, ordered list, unlocked strictly in sequence
- Only the next lesson is buyable; shows accuracy-gate status with list of failing words/patterns when blocked
- Already-completed lessons show "✓ Done"; future ones are dimmed and show their cost

**Progress tab:**
- Words sorted: unseen first, then by accuracy ascending (hardest first)
- Accuracy bar colored coral/gold/jade by threshold
- Still grouped by `WORDS.category` / `CATEGORY_META` — unaffected by the lesson system

**Grammar tab:**
- Pattern cards show accuracy bar + % top-right, plus a 🔊 speak button on the example sentence
- Category pills are a pure browsing filter now (always enabled) — actual unlock status is per-pattern (`Store.isGrammarUnlocked(g.id)`), driven by which lessons are unlocked
- `●live` badge removed — all examples are now curated fixed sentences
- Static "🗣️ Southern Pronunciation Notes" card at the top (`PRONUNCIATION_NOTES` in `data.js`), not quizzed

**Pronunciation:** 🔊 buttons (Web Speech API `speechSynthesis`) appear on flashcards, quiz feedback, and Grammar tab examples — see `UI.speak`/`UI.speakBtnHtml` in `ui.js`. Voice choice is a dropdown on the Home tab ("🔊 Pronunciation Voice"), persisted to `state.tts_voice_uri`; falls back to the browser default when no Vietnamese voice is installed.

## Known issues / things to watch

1. **`fill_sentence` blanking** — uses simple regex replace on `word.vn` in `example_vn`. If the word appears multiple times or as part of another word, the blank may be wrong. Worth improving with word-boundary matching.

2. **Match pairs with <6 words** — the quiz generates pairs up to `Math.min(6, pool.length)`. If a category has only 2-3 words, the round will be very short. The Learn tab warns about this.

3. **Grammar word_order fallback** — if a grammar pattern has no `word_order_exercises`, the mode falls back to `grammar_quiz` for that pattern. All 63 current patterns have exercises.

4. **localStorage key** is `viet_learn_v2` (bumped from `v1` when tier-based unlocking was replaced by `LESSONS` — no migration was written, old saves just reset). If another breaking state change is made, bump to `v3` and add migration logic in `Store.load()`.

5. **Audio** — no recorded `.mp3` files; pronunciation instead uses the browser's built-in Web Speech API (see "Pronunciation" above), which only works if the visitor's OS/browser has a Vietnamese voice installed (patchy outside Edge/Windows).

6. **GitHub Pages hosting** — push all files to a public repo, enable Pages from the `main` branch root. Works with no server-side logic needed. `fetch()` is never used so CORS is not an issue.

7. **Local development** — open `index.html` directly in browser. No server needed since all data is inline JS (not JSON). `localStorage` works fine on `file://` URLs.

## Planned / discussed but not yet implemented

- **Book/notes import** — user wants to photograph pages from a Vietnamese textbook and handwritten class notes, and have them parsed into vocabulary + grammar entries. Would require adding words with a `source: 'book_ch1'` field and a new category type.
- **Chapter-based categories** — related to above. Custom categories from a specific book chapter.
- **PWA / GitHub Pages** — discussed but not yet set up. Would need `manifest.json` + service worker for installability.
- **Removing debug buttons** — the two 🐛 debug buttons in the Shop are for testing only and should be removed before sharing with others.

## Content summary

- **415 vocabulary words** across 11 categories, with Southern dialect primary and Northern variants where different
- **63 A1 grammar patterns** across 14 categories, each with 2–3 curated examples and 1–2 word-order exercises
- **22 lessons** (`LESSONS` in `data.js`), covering every word and every grammar pattern exactly once, unlocked strictly in sequence
- **12 achievements**
- **7 quiz modes** (2 free, 5 purchasable)
