/* Club Atlético Monteverde — script compartido por todas las páginas */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* Preloader: solo la primera vez por visita */
  const loader = $('#loader');
  let seen = false;
  try { seen = sessionStorage.getItem('cam-seen') === '1'; sessionStorage.setItem('cam-seen', '1'); } catch (e) {}
  const ready = () => { loader && loader.classList.add('out'); document.body.classList.add('ready'); };
  if (seen) ready();
  else { addEventListener('load', () => setTimeout(ready, 700)); setTimeout(ready, 3000); }

  /* Año en el pie */
  $$('.yr').forEach(e => e.textContent = new Date().getFullYear());

  /* Menú: marcar página activa */
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.links a').forEach(a => { if (a.getAttribute('href').toLowerCase() === page) a.classList.add('active'); });

  /* Header sólido, barra de progreso y parallax */
  const header = $('#top'), prog = $('#progress'), heroBg = $('.hero-bg');
  const onScroll = () => {
    const y = scrollY;
    header && header.classList.toggle('solid', y > 40);
    if (prog) prog.style.width = (y / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%';
    if (heroBg && y < innerHeight) heroBg.style.transform = `scale(1.1) translateY(${y * .25}px)`;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Menú móvil */
  const burger = $('.burger');
  burger && burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('.links a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  /* Galería (si la página la tiene) */
  const gal = $('#gallery');
  if (gal && window.GALLERY) {
    gal.innerHTML = window.GALLERY.map(([src, cat], i) =>
      `<figure class="reveal" data-cat="${cat}"><img src="${src}" alt="Club Atlético Monteverde — foto ${i + 1}" loading="lazy"></figure>`).join('');
    $$('img', gal).forEach(img => img.addEventListener('error', () => img.closest('figure').remove()));
    $$('.filters button').forEach(b => b.addEventListener('click', () => {
      $$('.filters button').forEach(x => x.classList.toggle('on', x === b));
      const f = b.dataset.f;
      $$('figure', gal).forEach(fig => fig.classList.toggle('hide', f !== 'all' && fig.dataset.cat !== f));
    }));
  }

  /* Jugador del partido (Senior +35) */
  const mvp = $('#mvp');
  if (mvp && window.MVPS) {
    mvp.innerHTML = window.MVPS.map(([f, n, t]) =>
      `<article><img src="img/senior/${f}.webp" alt="${n}, jugador del partido" loading="lazy"><span class="badge">★ MVP</span><div class="who"><b>${n}</b><span>${t}</span></div></article>`).join('');
    $$('.mvp-nav button').forEach(b => b.addEventListener('click', () =>
      mvp.scrollBy({ left: +b.dataset.dir * (mvp.firstElementChild.offsetWidth + 16) * 2, behavior: 'smooth' })));
  }

  /* Aparición al hacer scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* Contadores */
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || ''; let t0;
    const step = t => { t0 ??= t; const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); co.unobserve(el);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => co.observe(el));

  /* Inclinación 3D de tarjetas (solo con mouse) */
  if (matchMedia('(hover:hover)').matches) {
    $$('.card, .tile').forEach(c => {
      c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      c.addEventListener('mouseleave', () => c.style.transform = '');
    });
  }

  /* Visor de fotos */
  const lb = $('#lb');
  if (lb && gal) {
    const lbImg = $('img', lb), lbCount = $('.lb-count', lb); let cur = 0;
    const list = () => $$('figure:not(.hide) img', gal);
    const show = () => { const l = list(); lbImg.src = l[cur].src; lbCount.textContent = `${cur + 1} / ${l.length}`; };
    const move = d => { const l = list(); cur = (cur + d + l.length) % l.length; show(); };
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    gal.addEventListener('click', e => {
      const img = e.target.closest('figure') && $('img', e.target.closest('figure')); if (!img) return;
      cur = list().indexOf(img); show(); lb.classList.add('open'); document.body.style.overflow = 'hidden';
    });
    $('.lb-close', lb).onclick = close; $('.lb-prev', lb).onclick = () => move(-1); $('.lb-next', lb).onclick = () => move(1);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1);
    });
    let sx = 0;
    lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); });
  }
})();
