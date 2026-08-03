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

**Tier system:**
- Categories with free starters (greetings, verbs, adjectives, food, numbers) begin at `category_tiers[cat] = 1` in default state
- Fully locked categories (nouns, family, time, colors, places, prepositions) begin at `0`
- Shop items for locked categories start at `tier:1`; for free-starter categories at `tier:2`
- Tiers always increment by 1 — no skipping

**Adding custom words:** Copy any existing line and change the fields. The comment block at the top of `data.js` explains the format. Words are automatically included in quizzes based on their `category` and `tier`.

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
Four types:
- `type:'mode'` — flat unlock for a quiz mode
- `type:'tier'` — unlocks next tier of words in a category
- `type:'grammar'` — unlocks a grammar pattern category
- (boost type exists but currently unused)

Key fields: `id`, `type`, `name`, `cost`, `desc`, `unlockKey`, `icon`
For tier items: also `tier` (which tier this unlocks) and `wordsInTier` (informational).

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
  category_tiers: {      // how many tiers unlocked per category
    greetings: 1, verbs: 1, adjectives: 1, food: 1, numbers: 1,
    nouns: 0, family: 0, time: 0, colors: 0, places: 0, prepositions: 0,
  },
  unlocked_modes: ['flashcard', 'multiple_choice'],
  unlocked_grammar: ['identity'],
  unlocked_boosts: [],
  achievements: [],
  consec_correct: 0,
  typed_correct: 0,
  total_correct: 0,
  total_attempts: 0,
  last_category: 'greetings',
  last_mode: 'multiple_choice',
}
```

**localStorage key:** `viet_learn_v1`

**Key methods:**
- `recordAttempt(word_id, correct, mode)` — updates seen/correct, awards points, returns pts earned. Points only awarded on correct.
- `recordGrammarAttempt(grammar_id, correct)` — same for grammar patterns
- `getUnlockedWords(cat)` — filters WORDS by category and `tier <= category_tiers[cat]`
- `getAllUnlockedWords()` — all accessible words across all categories
- `checkAccuracyGate(cat)` — returns `{met, total, ready, notReady[]}` for word accuracy gate
- `checkGrammarAccuracyGate()` — same for grammar patterns across all unlocked grammar categories
- `getNextTierItem(cat)` — finds the shop item for `category_tiers[cat] + 1`
- `unlockItem(item)` — returns `true` (success), `false` (can't), or `'gate'` (accuracy gate blocked)
- `getGrammarPatternStats(id)` — `{seen_count, accuracy, mastered}`

**Accuracy gate:** Before buying a higher tier (for both words and grammar), all currently-unlocked items in that category must be ≥60% accuracy. The first unlock of a fully-locked category (tier 0 → 1) is exempt since there are no words to check yet.

## quiz.js

Single `Quiz` object.

**Question generation:**
```js
Quiz.generateQuestion(mode, category, seenStats)
// category can be 'all' to use all unlocked words
```

**Modes:**
- `flashcard` — show VN word, tap to reveal EN + example. 4 Anki-style rating buttons: Again (0 credit), Hard (0.4 credit), Good (1.0 credit), Easy (1.0 credit + bonus pts)
- `multiple_choice` — 50% show VN→pick EN, 50% show EN→pick VN. 4 choices.
- `type_answer` — show EN, type Vietnamese. Lenient matching (strips diacritics). Accepts Northern variant.
- `fill_sentence` — blank out the word in `example_vn`, pick from 4 choices
- `match_pairs` — click EN word then matching VN word. 6 pairs. Left tile stays selected on wrong guess.
- `grammar_quiz` — show pattern, pick correct example sentence from 4 options
- `word_order` — show English prompt, tap Vietnamese word tiles into correct order

**Grammar modes filter** by both `Store.isGrammarUnlocked(g.category)` AND `g.requires` (vocabulary prerequisites).

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
- `learnCategory`, `learnMode` — selections on Learn tab
- `_progressCat`, `_grammarCat` — active filter on Progress/Grammar tabs

**Views:** home, learn, quiz, shop, progress, grammar, achievements

**Tab navigation:** Bottom nav with 6 tabs: Home, Learn, Shop, Progress, Grammar, Awards

**Debug buttons** (in Shop balance card, dashed borders):
- 🐛 +300 stars — adds 300 pts directly
- 🐛 boost accuracy — sets all unlocked words AND grammar patterns to 5 seen / 4 correct (80%), clearing all accuracy gates

**Learn tab features:**
- Grammar modes (grammar_quiz, word_order) auto-select "All Words" category and hide category picker
- 🌐 All Words option at top of category list
- Compatibility warnings for incompatible mode/category combos
- Session preview shows unseen/struggling/known word counts
- Green badge when guarantee kicks in (≥2 unseen or ≥2 struggling exist)

**Shop tab features:**
- Grammar category cards show per-category pattern accuracy counts
- Word category cards show accuracy gate status with list of failing words
- Both gates disabled and show "🔒 Gate locked" when not met

**Progress tab:**
- Words sorted: unseen first, then by accuracy ascending (hardest first)
- Accuracy bar colored coral/gold/jade by threshold

**Grammar tab:**
- Pattern cards show accuracy bar + % top-right
- Locked grammar categories grayed with cost shown
- `●live` badge removed — all examples are now curated fixed sentences

## Known issues / things to watch

1. **`fill_sentence` blanking** — uses simple regex replace on `word.vn` in `example_vn`. If the word appears multiple times or as part of another word, the blank may be wrong. Worth improving with word-boundary matching.

2. **Match pairs with <6 words** — the quiz generates pairs up to `Math.min(6, pool.length)`. If a category has only 2-3 words, the round will be very short. The Learn tab warns about this.

3. **Grammar word_order fallback** — if a grammar pattern has no `word_order_exercises`, the mode falls back to `grammar_quiz` for that pattern. All 45 current patterns have exercises.

4. **localStorage key** is `viet_learn_v1`. If a breaking state change is made, bump to `v2` and add migration logic in `Store.load()`.

5. **No audio** — the app is text-only. Adding audio would require hosting `.mp3` files and wiring them to word objects.

6. **GitHub Pages hosting** — push all files to a public repo, enable Pages from the `main` branch root. Works with no server-side logic needed. `fetch()` is never used so CORS is not an issue.

7. **Local development** — open `index.html` directly in browser. No server needed since all data is inline JS (not JSON). `localStorage` works fine on `file://` URLs.

## Planned / discussed but not yet implemented

- **Book/notes import** — user wants to photograph pages from a Vietnamese textbook and handwritten class notes, and have them parsed into vocabulary + grammar entries. Would require adding words with a `source: 'book_ch1'` field and a new category type.
- **Chapter-based categories** — related to above. Custom categories from a specific book chapter.
- **PWA / GitHub Pages** — discussed but not yet set up. Would need `manifest.json` + service worker for installability.
- **Removing debug buttons** — the two 🐛 debug buttons in the Shop are for testing only and should be removed before sharing with others.

## Content summary

- **~300 vocabulary words** across 11 categories, with Southern dialect primary and Northern variants where different
- **45 A1 grammar patterns** across 8 categories, each with 2–3 curated examples and 1–2 word-order exercises
- **12 achievements**
- **6 quiz modes** (2 free, 4 purchasable)
- **7 grammar categories** (1 free, 6 purchasable)
- **Variable word tiers** per category (2–6 tiers depending on category size)
