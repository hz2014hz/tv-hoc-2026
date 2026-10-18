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

// Lower is better: whole-word match beats prefix beats anywhere; at each level the
// accents-as-typed match ranks just above the accent-free one.
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
    if (lower.some(f => tests[i](f, query))) return i * 2;
    if (folded.some(f => tests[i](f, foldedQuery))) return i * 2 + 1;
  }
  return -1;
}

const state = { query: '', lesson: 'all' };

function render() {
  const query = state.query.trim().toLowerCase().normalize('NFC');
  const foldedQuery = fold(query);
  const list = document.getElementById('results');
  let total = 0;
  let html = '';

  for (const lesson of LESSONS) {
    if (state.lesson !== 'all' && String(lesson.id) !== state.lesson) continue;
    let words = lesson.words.map(w => ({ w, s: query ? score(w, query, foldedQuery) : 0 }));
    if (query) words = words.filter(x => x.s >= 0).sort((a, b) => a.s - b.s);
    if (!words.length) continue;
    total += words.length;

    html += `<section class="lesson">
      <h2><span class="lesson-num">Lesson ${lesson.id}</span> ${escapeHtml(lesson.title_vn)}
        <span class="lesson-sub">${escapeHtml(lesson.title_en)} · ${escapeHtml(lesson.title_de)}</span></h2>
      <ul class="words">`;
    for (const { w } of words) {
      html += `<li>
        <span class="vn" lang="vi">${highlight(w.vn, foldedQuery)}</span>
        <span class="en" lang="en">${highlight(w.en, foldedQuery)}</span>
        <span class="de" lang="de">${highlight(w.de, foldedQuery)}</span>
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
