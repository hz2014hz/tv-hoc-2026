const Gamify = {
  ACHIEVEMENT_CONDITIONS: {
    first_word: s => Object.values(s.seen).some(x=>x.seen>0),
    words_10:   s => Object.values(s.seen).filter(x=>x.seen>0).length >= 10,
    words_50:   s => Object.values(s.seen).filter(x=>x.seen>0).length >= 50,
    words_100:  s => Object.values(s.seen).filter(x=>x.seen>0).length >= 100,
    mastered_1: s => Object.values(s.seen).some(x=>x.seen>=5&&x.correct/x.seen>=0.8),
    mastered_10:s => Object.values(s.seen).filter(x=>x.seen>=5&&x.correct/x.seen>=0.8).length >= 10,
    streak_3:   s => s.streak >= 3,
    streak_7:   s => s.streak >= 7,
    consec_10:  s => s.consec_correct >= 10,
    food_5:     s => WORDS.filter(w=>w.category==='food').filter(w=>s.seen[w.id]&&s.seen[w.id].seen>=5&&s.seen[w.id].correct/s.seen[w.id].seen>=0.8).length >= 5,
    categories_3: s => Object.keys(CATEGORY_META).filter(c => Store.isCategoryAccessible(c)).length >= 3,
    typist:     s => s.typed_correct >= 50,
  },

  checkAchievements() {
    const newly = [];
    for (const ach of ACHIEVEMENTS) {
      if (Store.state.achievements.includes(ach.id)) continue;
      const fn = this.ACHIEVEMENT_CONDITIONS[ach.id];
      if (fn && fn(Store.state)) {
        Store.state.achievements.push(ach.id);
        Store.save();
        this.showAchievement(ach);
        newly.push(ach);
      }
    }
    return newly;
  },

  showToast(msg, type='success') {
    const icons = {success:'✅',error:'❌',gold:'⭐',achievement:'🏆'};
    const borders = {success:'var(--jade)',error:'var(--coral)',gold:'var(--gold)',achievement:'#9b59b6'};
    const el = document.createElement('div');
    el.className = 'toast toast--'+type;
    el.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
    el.style.borderLeftColor = borders[type]||borders.success;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(12px)'; el.style.transition='0.3s'; setTimeout(()=>el.remove(),300); }, 2800);
  },

  showPointsFloat(pts, el) {
    const rect = el ? el.getBoundingClientRect() : {left:window.innerWidth/2,top:window.innerHeight/2};
    const div = document.createElement('div');
    div.textContent = '+'+pts+' pts';
    div.style.cssText=`position:fixed;left:${rect.left+rect.width/2}px;top:${rect.top}px;color:var(--gold);font-size:18px;font-weight:700;pointer-events:none;z-index:9999;animation:floatUp 1.2s ease forwards;transform:translateX(-50%)`;
    document.body.appendChild(div);
    setTimeout(()=>div.remove(),1200);
  },

  triggerConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#E8B84B','#2D9B6F','#D96B48','#F2EDE4','#9b59b6'];
    const pieces = [];
    for (let i=0;i<35;i++) {
      const p = document.createElement('div');
      const color = colors[Math.floor(Math.random()*colors.length)];
      const size = 7+Math.random()*9;
      p.style.cssText=`position:absolute;left:${Math.random()*100}%;top:0;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random()>0.5?'50%':'2px'};animation:confettiFall ${2+Math.random()*1.5}s ${Math.random()*0.8}s ease forwards`;
      container.appendChild(p); pieces.push(p);
    }
    setTimeout(()=>pieces.forEach(p=>p.remove()),4000);
  },

  showAchievement(ach) {
    const el = document.createElement('div');
    el.className = 'toast toast--achievement';
    el.style.cssText='min-width:260px;background:rgba(155,89,182,0.95);border-left:3px solid #9b59b6;padding:14px 16px;gap:12px;flex-direction:row';
    el.innerHTML=`<span style="font-size:28px">${ach.icon}</span><div><div style="font-weight:700;font-size:14px">🏆 ${ach.title}</div><div style="font-size:12px;opacity:0.85">${ach.desc}</div></div>`;
    document.getElementById('toast-container').appendChild(el);
    this.triggerConfetti();
    setTimeout(()=>{ el.style.opacity='0'; el.style.transition='0.3s'; setTimeout(()=>el.remove(),300); }, 4000);
  },

  getLevelInfo(totalPts) {
    const levels=[{min:0,title:'Beginner',next:100},{min:100,title:'Learner',next:300},{min:300,title:'Student',next:600},{min:600,title:'Speaker',next:1000},{min:1000,title:'Conversant',next:2000},{min:2000,title:'Fluent',next:Infinity}];
    const lvl = levels.filter(l=>totalPts>=l.min).pop();
    const pct = lvl.next===Infinity?100:Math.round((totalPts-lvl.min)/(lvl.next-lvl.min)*100);
    return {title:lvl.title,next:lvl.next,pct,in_level:totalPts-lvl.min};
  },
};
