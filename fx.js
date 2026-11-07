/* =========================================================
   Club Atlético Monteverde — efectos 3D
   (se apagan solos con "reducir movimiento")
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* Mouse normalizado (-0.5 … 0.5), compartido por todos los efectos */
  const M = { x: 0, y: 0 };
  addEventListener('pointermove', e => { M.x = e.clientX / innerWidth - .5; M.y = e.clientY / innerHeight - .5; }, { passive: true });
  /* En celular: inclinación del teléfono (si el navegador la da sin pedir permiso) */
  addEventListener('deviceorientation', e => {
    if (e.gamma == null) return;
    M.x = Math.max(-.5, Math.min(.5, e.gamma / 60)); M.y = Math.max(-.5, Math.min(.5, (e.beta - 45) / 60));
  }, { passive: true });

  /* ---------- Escudo 3D extruido ---------- */
  function crest3D(img, { depth = 16, gap = 1.15, cls = '' } = {}) {
    const wrap = document.createElement('div'); wrap.className = 'c3d ' + cls;
    const stage = document.createElement('div'); stage.className = 'c3d-stage';
    const back = new Image(); back.src = 'img/escudo-3d.png'; back.alt = '';
    back.style.transform = `translateZ(${-(depth + 1) * gap}px) rotateY(180deg)`; stage.appendChild(back);
    for (let i = depth; i > 0; i--) {
      const l = new Image(); l.src = 'img/escudo-side.png'; l.alt = '';
      l.style.transform = `translateZ(${-i * gap}px)`;
      stage.appendChild(l);
    }
    const front = new Image(); front.src = 'img/escudo-3d.png'; front.alt = img.alt || 'Escudo del Club Atlético Monteverde';
    stage.appendChild(front);
    const glare = document.createElement('div'); glare.className = 'c3d-glare'; stage.appendChild(glare);
    const shadow = document.createElement('div'); shadow.className = 'c3d-shadow';
    wrap.append(shadow, stage);
    img.replaceWith(wrap);
    return { wrap, stage, glare };
  }

  const loaderImg = $('#loader img');
  if (loaderImg && !reduce) crest3D(loaderImg, { depth: 12 });

  const crests = [];
  const heroImg = $('.crest-wrap img');
  if (heroImg) crests.push({ ...crest3D(heroImg, { depth: 20, gap: 1.45 }), amp: 1, spin: true });
  const miniImg = $('.page-hero img.crest-mini');
  if (miniImg) crests.push({ ...crest3D(miniImg, { depth: 12, gap: .9, cls: 'crest-mini' }), amp: .8, spin: false });

  if (crests.length && !reduce) {
    let rx = 0, ry = 0, t0 = performance.now();
    const loop = t => {
      const idle = Math.sin((t - t0) / 1600) * 6;
      const spin = Math.min(scrollY, innerHeight) * .12;
      rx = lerp(rx, -M.y * 26, .07);
      ry = lerp(ry, M.x * 40 + idle, .07);
      crests.forEach(c => {
        const y = ry * c.amp + (c.spin ? spin : 0), x = rx * c.amp;
        c.stage.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
        c.glare.style.setProperty('--gx', `${50 - y * 1.6}%`);
        c.glare.style.setProperty('--gy', `${40 + x * 2}%`);
      });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- Cancha 3D en la portada ---------- */
  const hero = $('.hero');
  if (hero) {
    const P = document.createElement('div'); P.className = 'pitch3d'; P.setAttribute('aria-hidden', 'true');
    P.innerHTML = `<svg viewBox="0 0 105 68">
      <rect class="ln" x=".5" y=".5" width="104" height="67" style="--len:345"/>
      <line class="ln" x1="52.5" y1=".5" x2="52.5" y2="67.5" style="--len:68;--d:.3s"/>
      <circle class="ln" cx="52.5" cy="34" r="9.15" style="--len:58;--d:.5s"/>
      <rect class="ln" x=".5" y="13.85" width="16.5" height="40.3" style="--len:114;--d:.6s"/>
      <rect class="ln" x="88" y="13.85" width="16.5" height="40.3" style="--len:114;--d:.6s"/>
      <rect class="ln" x=".5" y="24.85" width="5.5" height="18.3" style="--len:48;--d:.8s"/>
      <rect class="ln" x="99" y="24.85" width="5.5" height="18.3" style="--len:48;--d:.8s"/>
      <path class="ln" d="M17 26.7A9.15 9.15 0 0 1 17 41.3" style="--len:16;--d:1s"/>
      <path class="ln" d="M88 26.7A9.15 9.15 0 0 0 88 41.3" style="--len:16;--d:1s"/>
    </svg>`;
    hero.insertBefore(P, $('.stripes', hero));
  }

  /* ---------- Partículas con profundidad ---------- */
  if (!reduce) $$('.hero, .page-hero').forEach(sec => {
    const cv = document.createElement('canvas'); cv.className = 'fx-dust'; cv.setAttribute('aria-hidden', 'true');
    sec.insertBefore(cv, sec.firstChild.nextSibling);
    const ctx = cv.getContext('2d'); let W, H, dpr, on = true;
    const N = innerWidth < 700 ? 28 : 64;
    const pts = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * .9 + .1, s: Math.random() * .0004 + .0001, g: Math.random() < .7 }));
    const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.width = sec.offsetWidth * dpr; H = cv.height = sec.offsetHeight * dpr; };
    size(); addEventListener('resize', size);
    new IntersectionObserver(([e]) => on = e.isIntersecting).observe(sec);
    /* sprites de brillo pre-dibujados (mucho más livianos que shadowBlur) */
    const sprite = col => {
      const s = document.createElement('canvas'); s.width = s.height = 32; const g = s.getContext('2d');
      const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      gr.addColorStop(0, col); gr.addColorStop(.25, col); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 32, 32); return s;
    };
    const SG = sprite('rgba(40,220,120,1)'), SW = sprite('rgba(255,255,255,1)');
    const draw = () => {
      if (on) {
        ctx.clearRect(0, 0, W, H);
        for (const p of pts) {
          p.y -= p.s * (1 + p.z); if (p.y < -.05) { p.y = 1.05; p.x = Math.random(); }
          const x = (p.x + M.x * .04 * p.z) * W, y = (p.y + M.y * .04 * p.z) * H, r = p.z * 9 * dpr;
          ctx.globalAlpha = p.g ? p.z * .6 : p.z * .4;
          ctx.drawImage(p.g ? SG : SW, x - r, y - r, r * 2, r * 2);
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  });

  /* ---------- Profundidad del hero al hacer scroll ---------- */
  const heroText = $('.hero-grid > div:first-child');
  if (heroText && !reduce) addEventListener('scroll', () => {
    const y = Math.min(scrollY, innerHeight);
    heroText.style.transform = `translate3d(0,${y * -.18}px,0)`;
    heroText.style.opacity = 1 - y / (innerHeight * .9);
  }, { passive: true });

  /* ---------- Títulos letra por letra ---------- */
  const splitText = el => {
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          [...part].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); });
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR' && n.tagName !== 'svg') walk(n);
    });
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    $$('.ch', el).forEach((c, i) => { c.style.setProperty('--i', i); c.setAttribute('aria-hidden', 'true'); });
    el.classList.add('split');
  };
  if (!reduce) {
    const titles = $$('.sec-title, .sen-title, .join h2, .sub-h h3, .feature-body h3');
    titles.forEach(splitText);
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); so.unobserve(e.target); } }), { threshold: .3 });
    titles.forEach(t => so.observe(t));
  }

  /* ---------- Escalonado de la galería ---------- */
  $$('.gallery figure').forEach((f, i) => f.style.transitionDelay = `${(i % 4) * 90}ms`);

  /* ---------- Profundidad + brillo en tarjetas ---------- */
  if (fine && !reduce) $$('.card, .tile').forEach(c => {
    const sh = document.createElement('span'); sh.className = 'fx-shine'; c.appendChild(sh);
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--px', (x - .5).toFixed(3)); c.style.setProperty('--py', (y - .5).toFixed(3));
      c.style.setProperty('--sx', `${x * 100}%`); c.style.setProperty('--sy', `${y * 100}%`);
    });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--px', 0); c.style.setProperty('--py', 0); });
  });

  /* ---------- Coverflow 3D: Jugador del partido ---------- */
  const mvp = $('#mvp');
  if (mvp && !reduce) {
    mvp.classList.add('fx-flow');
    let raf = 0;
    const upd = () => {
      raf = 0;
      const r = mvp.getBoundingClientRect(), c = r.left + r.width / 2;
      $$('article', mvp).forEach(a => {
        const b = a.getBoundingClientRect();
        const d = Math.max(-1, Math.min(1, ((b.left + b.width / 2) - c) / (b.width * 2.2)));
        const ad = Math.abs(d);
        a.style.transform = `rotateY(${d * -38}deg) translateZ(${-ad * 140}px) scale(${1 - ad * .08})`;
        a.style.filter = `brightness(${1 - ad * .45})`;
        a.style.zIndex = 10 - Math.round(ad * 10);
      });
    };
    mvp.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    addEventListener('resize', upd); setTimeout(upd, 60); setTimeout(upd, 600);
    $$('article', mvp).forEach(a => a.addEventListener('click', () => a.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })));
  }

  /* ---------- Cursor personalizado + botones magnéticos ---------- */
  if (fine && !reduce) {
    const dot = document.createElement('div'); dot.className = 'cur-dot';
    const ring = document.createElement('div'); ring.className = 'cur-ring'; ring.innerHTML = '<span>VER</span>';
    document.body.append(dot, ring); document.body.classList.add('has-cursor');
    let tx = -100, ty = -100, rx = -100, ry = -100;
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; dot.style.transform = `translate3d(${tx}px,${ty}px,0)`; }, { passive: true });
    (function loop() { rx = lerp(rx, tx, .18); ry = lerp(ry, ty, .18); ring.style.transform = `translate3d(${rx}px,${ry}px,0)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => {
      const t = e.target;
      ring.classList.toggle('view', !!t.closest('.gallery figure, .mvp article'));
      ring.classList.toggle('big', !t.closest('.gallery figure, .mvp article') && !!t.closest('a, button, .card, .tile'));
      const ifr = !!t.closest('iframe'); dot.classList.toggle('hide', ifr); ring.classList.toggle('hide', ifr);
    });
    document.addEventListener('pointerleave', () => { dot.classList.add('hide'); ring.classList.add('hide'); });
    document.addEventListener('pointerenter', () => { dot.classList.remove('hide'); ring.classList.remove('hide'); });

    $$('.btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px,0)`;
      });
      b.addEventListener('pointerleave', () => b.style.transform = '');
    });
  }

  /* ---------- Transición entre páginas ---------- */
  if (!reduce) {
    const cur = document.createElement('div'); cur.className = 'curtain';
    cur.innerHTML = '<img src="img/escudo-3d.png" alt="">';
    document.body.appendChild(cur);
    const root = document.documentElement;
    if (root.classList.contains('nav-in')) {
      cur.classList.add('cover'); cur.style.transition = 'none';
      root.classList.remove('nav-in');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        cur.style.transition = ''; cur.classList.add('out');
        setTimeout(() => { cur.classList.remove('cover', 'out'); }, 650);
      }));
    }
    try { sessionStorage.removeItem('cam-nav'); } catch (e) {}
    document.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a) return;
      const href = a.getAttribute('href') || '';
      if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (!/^[\w-]+\.html(#.*)?$/.test(href)) return;
      const [file] = href.split('#');
      const here = (location.pathname.split('/').pop() || 'index.html');
      if (file === here) return;
      e.preventDefault();
      try { sessionStorage.setItem('cam-nav', '1'); } catch (err) {}
      cur.classList.remove('out'); cur.classList.add('cover');
      setTimeout(() => { location.href = href; }, 560);
    });
    addEventListener('pageshow', e => { if (e.persisted) cur.classList.remove('cover', 'out'); });
  }
})();
