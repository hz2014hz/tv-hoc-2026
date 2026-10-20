// Accent-insensitive folding: "ắ", "à", "â" → "a", "ơ"/"ư" → "o"/"u", "đ" → "d", "ü" → "u".
// Folds one character at a time so every folded index lines up with the original string,
// which lets matches be highlighted in the original (accented) text.
function foldChar(c) {
  if (c === 'đ' || c === 'Đ') return 'd';
  const f = c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  return f.length === 1 ? f : c.toLowerCase().slice(0, 1) || c;
}

function fold(s) {
  return Array.from(s.normalize('NFC'), foldChar).join('');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Wraps every accent-insensitive occurrence of the folded query in <mark>.
function highlight(text, foldedQuery) {
  const chars = Array.from(text.normalize('NFC'));
  if (!foldedQuery) return escapeHtml(chars.join(''));
  const folded = chars.map(foldChar).join('');
  let out = '';
  let i = 0;
  while (i < chars.length) {
    const hit = folded.indexOf(foldedQuery, i);
    if (hit === -1) break;
    out += escapeHtml(chars.slice(i, hit).join(''));
    out += '<mark>' + escapeHtml(chars.slice(hit, hit + foldedQuery.length).join('')) + '</mark>';
    i = hit + foldedQuery.length;
  }
  return out + escapeHtml(chars.slice(i).join(''));
}

// Typos tolerated per query length: short Vietnamese words are too alike to allow any.
function maxTypos(q) {
  return q.length < 4 ? 0 : q.length < 8 ? 1 : 2;
}

// Edit distance (substitute / insert / delete / swap two neighbours), giving up past max.
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2 = null;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        cur[j] = Math.min(cur[j], prev2[j - 2] + 1);
      }
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[b.length];
}

// Closest run of as many words as the query has, within the typo limit.
// Returns the matched slice of the folded field (for highlighting) or null.
function fuzzyMatch(foldedField, foldedQuery) {
  const max = maxTypos(foldedQuery);
  if (!max) return null;
  const tokens = [...foldedField.matchAll(/[^\s,;()]+/g)];
  const n = foldedQuery.split(/\s+/).length;
  let best = null;
  let bestDist = max + 1;
  for (let i = 0; i + n <= tokens.length; i++) {
    const start = tokens[i].index;
    const end = tokens[i + n - 1].index + tokens[i + n - 1][0].length;
    const slice = foldedField.slice(start, end);
    const d = editDistance(foldedQuery, slice, max);
    if (d < bestDist) { bestDist = d; best = slice; }
  }
  return best;
}

// Lower is better: whole-word match beats prefix beats anywhere; at each level the
// accents-as-typed match ranks just above the accent-free one. Typo matches come last.
// Returns { s, hl } (hl = folded text to highlight) or null when there is no match.
function score(word, query, foldedQuery) {
  const fields = [word.vn, word.en, word.de];
  const lower = fields.map(f => f.toLowerCase());
  const folded = fields.map(fold);
  const words = s => s.split(/[\s,;()]+/);
  const tests = [
    (f, q) => f === q || words(f).includes(q),
    (f, q) => words(f).some(w => w.startsWith(q)),
    (f, q) => f.includes(q),
  ];
  for (let i = 0; i < tests.length; i++) {
    if (lower.some(f => tests[i](f, query))) return { s: i * 2, hl: foldedQuery };
    if (folded.some(f => tests[i](f, foldedQuery))) return { s: i * 2 + 1, hl: foldedQuery };
  }
  for (const f of folded) {
    const hl = fuzzyMatch(f, foldedQuery);
    if (hl) return { s: FUZZY, hl };
  }
  return null;
}

const FUZZY = 6;

const state = { query: '', lesson: 'all' };

function render() {
  const query = state.query.trim().toLowerCase().normalize('NFC');
  const foldedQuery = fold(query);
  const list = document.getElementById('results');
  let total = 0;
  let html = '';

  for (const lesson of LESSONS) {
    if (state.lesson !== 'all' && String(lesson.id) !== state.lesson) continue;
    let words = lesson.words.map(w => ({ w, ...(query ? score(w, query, foldedQuery) : { s: 0, hl: '' }) }));
    if (query) words = words.filter(x => x.s !== undefined).sort((a, b) => a.s - b.s);
    if (!words.length) continue;
    total += words.length;

    html += `<section class="lesson">
      <h2><span class="lesson-num">Lesson ${lesson.id}</span> ${escapeHtml(lesson.title_vn)}
        <span class="lesson-sub">${escapeHtml(lesson.title_en)} · ${escapeHtml(lesson.title_de)}</span></h2>
      <ul class="words">`;
    for (const { w, s, hl } of words) {
      const close = s === FUZZY ? ' <span class="close">close match</span>' : '';
      html += `<li>
        <span class="vn" lang="vi">${highlight(w.vn, hl)}${close}</span>
        <span class="en" lang="en">${highlight(w.en, hl)}</span>
        <span class="de" lang="de">${highlight(w.de, hl)}</span>
      </li>`;
    }
    html += '</ul></section>';
  }

  list.innerHTML = html || `<p class="empty">No words match “${escapeHtml(state.query.trim())}”.</p>`;
  document.getElementById('count').textContent = `${total} word${total === 1 ? '' : 's'}`;
}

// ---- Reading ----

// Lower-cased Vietnamese entry → { word, lesson }, for looking up words in a text.
const DICT = new Map();
for (const lesson of LESSONS) {
  for (const word of lesson.words) DICT.set(word.vn.toLowerCase().normalize('NFC'), { word, lesson });
}
const MAX_SYLLABLES = Math.max(...[...DICT.keys()].map(k => k.split(' ').length));

// Splits a text into dictionary words and plain text. Vietnamese words can span several
// space-separated syllables (cà phê, bánh mì), so the longest dictionary match wins.
function tokenize(text) {
  const parts = text.normalize('NFC').match(/[\p{L}\p{M}]+|[^\p{L}\p{M}]+/gu) || [];
  const out = [];
  let i = 0;
  while (i < parts.length) {
    if (!/\p{L}/u.test(parts[i])) { out.push({ text: parts[i] }); i++; continue; }
    let match = null;
    for (let n = MAX_SYLLABLES; n >= 1 && !match; n--) {
      const span = parts.slice(i, i + 2 * n - 1);
      if (span.length !== 2 * n - 1) continue;
      // odd positions are the gaps between syllables: only a single space joins a word
      if (span.some((p, k) => k % 2 === 1 && p !== ' ')) continue;
      const entry = DICT.get(span.join('').toLowerCase());
      if (entry) match = { text: span.join(''), entry, len: span.length };
    }
    if (match) { out.push(match); i += match.len; }
    else { out.push({ text: parts[i], unknown: true }); i++; }
  }
  return out;
}

const tokenEntries = [];

function renderTexts() {
  document.getElementById('texts').innerHTML = TEXTS.map(t => {
    const body = tokenize(t.vn).map(tok => {
      if (tok.entry) {
        tokenEntries.push(tok.entry);
        return `<button class="tok" data-i="${tokenEntries.length - 1}">${escapeHtml(tok.text)}</button>`;
      }
      return tok.unknown ? `<span class="tok-unknown">${escapeHtml(tok.text)}</span>` : escapeHtml(tok.text);
    }).join('');
    return `<article class="text">
      <h2>${escapeHtml(t.title_vn)}<span class="lesson-sub">${escapeHtml(t.title_en)} · ${escapeHtml(t.title_de)}</span></h2>
      <p class="text-body" lang="vi">${body}</p>
    </article>`;
  }).join('');
}

let activeTok = null;

function hideTip() {
  document.getElementById('tip').hidden = true;
  if (activeTok) activeTok.classList.remove('active');
  activeTok = null;
}

function showTip(btn) {
  const { word, lesson } = tokenEntries[btn.dataset.i];
  const tip = document.getElementById('tip');
  tip.innerHTML = `<div class="tip-vn" lang="vi">${escapeHtml(word.vn)}</div>
    <div lang="en">🇬🇧 ${escapeHtml(word.en)}</div>
    <div lang="de">🇩🇪 ${escapeHtml(word.de)}</div>
    <div class="tip-lesson">Lesson ${lesson.id} · ${escapeHtml(lesson.title_vn)}</div>`;
  tip.hidden = false;

  // Below the word, or above it if there's no room; kept inside the viewport horizontally.
  const r = btn.getBoundingClientRect();
  const w = tip.offsetWidth;
  const h = tip.offsetHeight;
  const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
  const below = r.bottom + 8 + h <= window.innerHeight;
  tip.style.left = `${left + window.scrollX}px`;
  tip.style.top = `${(below ? r.bottom + 8 : r.top - 8 - h) + window.scrollY}px`;

  if (activeTok) activeTok.classList.remove('active');
  activeTok = btn;
  btn.classList.add('active');
}

function initReading() {
  renderTexts();
  document.getElementById('texts').addEventListener('click', e => {
    const btn = e.target.closest('.tok');
    if (!btn) return;
    e.stopPropagation();
    if (btn === activeTok) hideTip(); else showTip(btn);
  });
  document.addEventListener('click', e => { if (!e.target.closest('#tip')) hideTip(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });
  window.addEventListener('resize', hideTip);
}

// ---- Tabs ----

function showView() {
  const view = location.hash === '#reading' ? 'reading' : 'words';
  document.getElementById('view-words').hidden = view !== 'words';
  document.getElementById('view-reading').hidden = view !== 'reading';
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  hideTip();
}

function initTabs() {
  document.getElementById('tabs').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn) location.hash = btn.dataset.view;
  });
  window.addEventListener('hashchange', showView);
  showView();
}

function init() {
  initTabs();
  initReading();
  const filter = document.getElementById('lesson-filter');
  filter.innerHTML = '<button data-lesson="all" class="active">All</button>' +
    LESSONS.map(l => `<button data-lesson="${l.id}">Lesson ${l.id}</button>`).join('');
  filter.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    state.lesson = btn.dataset.lesson;
    filter.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    render();
  });

  const search = document.getElementById('search');
  search.addEventListener('input', () => { state.query = search.value; render(); });
  render();
}

init();
