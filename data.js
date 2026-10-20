// Test vocabulary — two simple A1 lessons. Will be replaced by textbook content.
const LESSONS = [
  {
    id: 1,
    title_vn: 'Chào hỏi',
    title_en: 'Greetings & people',
    title_de: 'Begrüßung & Menschen',
    words: [
      { vn: 'xin chào',  en: 'hello',                        de: 'hallo' },
      { vn: 'cảm ơn',    en: 'thank you',                    de: 'danke' },
      { vn: 'xin lỗi',   en: 'sorry, excuse me',             de: 'Entschuldigung' },
      { vn: 'tạm biệt',  en: 'goodbye',                      de: 'auf Wiedersehen' },
      { vn: 'vâng',      en: 'yes (polite)',                 de: 'ja (höflich)' },
      { vn: 'không',     en: 'no, not',                      de: 'nein, nicht' },
      { vn: 'tôi',       en: 'I, me',                        de: 'ich' },
      { vn: 'bạn',       en: 'you; friend',                  de: 'du; Freund' },
      { vn: 'anh',       en: 'older brother; you (to a man)', de: 'älterer Bruder; du (zu einem Mann)' },
      { vn: 'chị',       en: 'older sister; you (to a woman)', de: 'ältere Schwester; du (zu einer Frau)' },
      { vn: 'em',        en: 'younger sibling; you (to someone younger)', de: 'jüngeres Geschwister; du (zu Jüngeren)' },
      { vn: 'tên',       en: 'name',                         de: 'Name' },
      { vn: 'người',     en: 'person, people',               de: 'Mensch, Person' },
      { vn: 'gia đình',  en: 'family',                       de: 'Familie' },
      { vn: 'mẹ',        en: 'mother',                       de: 'Mutter' },
      { vn: 'bố',        en: 'father',                       de: 'Vater' },
      { vn: 'khỏe',      en: 'healthy, well',                de: 'gesund, fit' },
      { vn: 'rất',       en: 'very',                         de: 'sehr' },
      { vn: 'đẹp',       en: 'beautiful',                    de: 'schön' },
      { vn: 'học',       en: 'to study, to learn',           de: 'lernen' },
    ],
  },
  {
    id: 2,
    title_vn: 'Ăn uống',
    title_en: 'Food & drink',
    title_de: 'Essen & Trinken',
    words: [
      { vn: 'ăn',        en: 'to eat',                       de: 'essen' },
      { vn: 'uống',      en: 'to drink',                     de: 'trinken' },
      { vn: 'nước',      en: 'water',                        de: 'Wasser' },
      { vn: 'cà phê',    en: 'coffee',                       de: 'Kaffee' },
      { vn: 'trà',       en: 'tea',                          de: 'Tee' },
      { vn: 'cơm',       en: 'cooked rice; meal',            de: 'gekochter Reis; Mahlzeit' },
      { vn: 'phở',       en: 'pho (noodle soup)',            de: 'Pho (Nudelsuppe)' },
      { vn: 'bánh mì',   en: 'bread, baguette sandwich',     de: 'Brot, Baguette-Sandwich' },
      { vn: 'thịt gà',   en: 'chicken (meat)',               de: 'Hähnchenfleisch' },
      { vn: 'cá',        en: 'fish',                         de: 'Fisch' },
      { vn: 'rau',       en: 'vegetables',                   de: 'Gemüse' },
      { vn: 'trái cây',  en: 'fruit',                        de: 'Obst' },
      { vn: 'ngon',      en: 'delicious',                    de: 'lecker' },
      { vn: 'đói',       en: 'hungry',                       de: 'hungrig' },
      { vn: 'khát',      en: 'thirsty',                      de: 'durstig' },
      { vn: 'nhà hàng',  en: 'restaurant',                   de: 'Restaurant' },
      { vn: 'tiền',      en: 'money',                        de: 'Geld' },
      { vn: 'bao nhiêu', en: 'how much, how many',           de: 'wie viel' },
      { vn: 'đắt',       en: 'expensive',                    de: 'teuer' },
      { vn: 'rẻ',        en: 'cheap',                        de: 'billig' },
      { vn: 'muốn',      en: 'to want',                      de: 'wollen, möchten' },
      { vn: 'thích',     en: 'to like',                      de: 'mögen, gern haben' },
      { vn: 'và',        en: 'and',                          de: 'und' },
      { vn: 'ở',         en: 'at, in; to be (somewhere)',    de: 'in, bei; sich befinden' },
    ],
  },
];

// Reading texts — every word should exist in LESSONS so it can be tapped for a translation.
const TEXTS = [
  {
    id: 1,
    title_vn: 'Ăn ở nhà hàng',
    title_en: 'Eating at a restaurant',
    title_de: 'Essen im Restaurant',
    vn: 'Xin chào! Gia đình tôi đói. Bố, mẹ, chị và tôi ăn ở nhà hàng. ' +
        'Bố tôi muốn ăn phở. Mẹ tôi muốn ăn cơm, cá và rau. ' +
        'Chị tôi khát, chị uống nước. Tôi thích bánh mì thịt gà. ' +
        'Bánh mì rất ngon và rẻ. Bố uống cà phê, mẹ uống trà. ' +
        '“Bao nhiêu tiền?” “Không đắt!” Cảm ơn! Tạm biệt!',
  },
];
