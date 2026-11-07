/* Torneo Senior +35 — dibuja tabla, fechas y goleadores desde torneo-data.js */
(() => {
  const T = window.TORNEO; if (!T) return;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const badge = name => {
    const e = T.equipos[name] || { sigla: name.slice(0, 2).toUpperCase(), color: '#888' };
    return e.escudo
      ? `<span class="tb tb-cam"><img src="img/escudo.png" alt=""></span>`
      : `<span class="tb" style="--tc:${e.color}">${esc(e.sigla)}</span>`;
  };
  const isHome = n => n === 'Monteverde';

  /* ---------- Tabla ---------- */
  const tb = $('#standings');
  if (tb) {
    const maxP = Math.max(...T.tabla.map(r => r[1])) || 1;
    tb.innerHTML = `
      <div class="st-row st-head"><span>#</span><span>Equipo</span><span>PTS</span><span>J</span><span class="opt">G</span><span class="opt">E</span><span class="opt">P</span><span class="opt">GF</span><span class="opt">GC</span><span>DIF</span></div>
      ${T.tabla.map((r, i) => {
        const [n, pts, j, g, e, p, gf, gc] = r, dif = gf - gc;
        return `<div class="st-row${isHome(n) ? ' me' : ''}${i === 0 ? ' lead' : ''} reveal" style="--w:${(pts / maxP * 100).toFixed(1)}%;transition-delay:${i * 60}ms">
          <span class="pos">${i + 1}</span>
          <span class="team-c">${badge(n)}<span class="nm"><b>${esc(n)}</b><i class="bar"></i></span></span>
          <span class="pts">${pts}</span><span>${j}</span>
          <span class="opt">${g}</span><span class="opt">${e}</span><span class="opt">${p}</span><span class="opt">${gf}</span><span class="opt">${gc}</span>
          <span class="dif ${dif > 0 ? 'up' : dif < 0 ? 'down' : ''}">${dif > 0 ? '+' : ''}${dif}</span>
        </div>`;
      }).join('')}`;
    const upd = $('#st-updated'); if (upd) upd.textContent = `Actualizado: ${T.actualizado}`;
  }

  /* ---------- Próxima fecha ---------- */
  const nx = $('#next-fixture');
  if (nx && T.fechas[T.proximaFecha]) {
    $('#next-title') && ($('#next-title').innerHTML = `${T.proximaFecha}ª <em>fecha</em>`);
    $('#next-info') && ($('#next-info').textContent = T.proximaInfo || '');
    nx.innerHTML = T.fechas[T.proximaFecha].map(([a, , , b], i) => `
      <div class="fx-card${isHome(a) || isHome(b) ? ' me' : ''} reveal" style="transition-delay:${i * 90}ms">
        <div class="fx-t">${badge(a)}<b>${esc(a)}</b></div>
        <span class="fx-vs">VS</span>
        <div class="fx-t">${badge(b)}<b>${esc(b)}</b></div>
      </div>`).join('');
  }

  /* ---------- Resultados por fecha ---------- */
  const tabs = $('#fecha-tabs'), list = $('#fecha-list');
  if (tabs && list) {
    const nums = Object.keys(T.fechas).map(Number).filter(n => T.fechas[n].some(m => m[1] !== null));
    const show = n => {
      [...tabs.children].forEach(b => b.classList.toggle('on', +b.dataset.f === n));
      list.innerHTML = T.fechas[n].map(([a, ga, gb, b]) => {
        const played = ga !== null && gb !== null;
        const wa = played && ga > gb, wb = played && gb > ga;
        const tag = !played ? 'Pendiente' : ga === gb ? 'Empate' : (wa ? a : b) === 'Monteverde' ? '¡Victoria verde!' : 'Final';
        return `<div class="board res${isHome(a) || isHome(b) ? ' me' : ''}">
          <span class="t${wa ? ' w' : ''}">${badge(a)}${esc(a)}</span>
          <span class="sc">${played ? `${ga}-${gb}` : 'vs'}</span>
          <span class="t r${wb ? ' w' : ''}">${esc(b)}${badge(b)}</span>
          <small>${tag}</small></div>`;
      }).join('');
    };
    tabs.innerHTML = nums.map(n => `<button data-f="${n}">${n}ª</button>`).join('');
    tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.f); });
    show(nums[nums.length - 1]);
  }

  /* ---------- Goleadores ---------- */
  const gl = $('#scorers');
  if (gl) {
    const max = T.goleadores[0] ? T.goleadores[0][2] : 1;
    let rank = 0, prev = null;
    gl.innerHTML = T.goleadores.map(([n, t, g], i) => {
      if (g !== prev) { rank = i + 1; prev = g; }
      return `<li class="${isHome(t) ? 'me ' : ''}${i === 0 ? 'top ' : ''}reveal" style="--w:${(g / max * 100).toFixed(1)}%;transition-delay:${i * 50}ms">
        <span class="rk">${rank}</span>${badge(t)}
        <span class="who"><b>${esc(n)}</b><small>${esc(t)}</small><i class="bar"></i></span>
        <span class="gl">${g}<small>${g === 1 ? 'gol' : 'goles'}</small></span></li>`;
    }).join('');
  }

  /* Que los nuevos elementos también aparezcan con la animación */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll('#standings .reveal, #next-fixture .reveal, #scorers .reveal').forEach(el => io.observe(el));
})();
