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

function init() {
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
