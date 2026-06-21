/* Card-fan carousel — port vainilla + GSAP del componente React.
   Inicializa cada [data-card-fan]. Las tarjetas son .fan-card dentro.
   Si hay >7, pagina con flechas+dots (busca .fan-nav hermano). */
(function () {
  const MAX_VISIBLE = 7, HALF = 3;
  const FAN = [
    { rot: -21, scale: 0.7756, x: -30, y: 7.3, z: 1 },
    { rot: -14, scale: 0.8498, x: -22, y: 4.0, z: 2 },
    { rot: -7,  scale: 0.9346, x: -11, y: 1.3, z: 3 },
    { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, z: 10 },
    { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, z: 3 },
    { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, z: 2 },
    { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, z: 1 },
  ];
  const rMult = (w) => w < 480 ? 0.28 : w < 640 ? 0.38 : w < 768 ? 0.5 : w < 1024 ? 0.75 : 1.0;
  function hMult(w) {
    let ideal; if (w < 480) ideal = 22 * 16; else if (w < 640) ideal = 26 * 16;
    else if (w < 768) ideal = 28 * 16; else if (w < 1024) ideal = 34 * 16; else ideal = 38 * 16;
    const avail = window.innerHeight * 0.7; return avail >= ideal ? 1 : avail / ideal;
  }
  function slotCfg(slotCount, slot) {
    if (slotCount >= MAX_VISIBLE) return FAN[slot];
    const center = slotCount >> 1;
    const dist = slotCount > 1 ? (slot - center) / center : 0;
    const ad = Math.abs(dist);
    return { rot: dist * 21, scale: 1 - 0.2244 * ad * ad, x: dist * 30, y: ad * ad * 7.3, z: 10 - Math.abs(slot - center) };
  }

  function initFan(root) {
    const cards = Array.prototype.slice.call(root.querySelectorAll('.fan-card'));
    const total = cards.length; if (!total) return;
    const G = window.gsap || null;
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const needsPagination = total > MAX_VISIBLE;
    const wrap = root.closest('.proy-fan-wrap') || root.parentElement;
    const nav = wrap ? wrap.querySelector('.fan-nav') : null;

    let centerIndex = needsPagination ? HALF : (total >> 1);
    let isAnimating = false, hasEntered = false, direction = null;
    let prevVisible = new Set();
    let hoverCleanup = null;

    function visibleMap(center) {
      const m = new Map();
      if (!needsPagination) { cards.forEach((_, i) => m.set(i, i)); return m; }
      for (let s = 0; s < MAX_VISIBLE; s++) m.set(((center + s - HALF) % total + total) % total, s);
      return m;
    }

    function placeStatic(card, c, mult, hM, z) {
      card.style.opacity = '1';
      card.style.zIndex = z;
      card.style.transform = 'translate(-50%,-50%) translate(' + (c.x * mult) + 'rem,' + (c.y * hM) + 'rem) rotate(' + c.rot + 'deg) scale(' + c.scale + ')';
    }

    function render() {
      if (hoverCleanup) { hoverCleanup(); hoverCleanup = null; }
      const vmap = visibleMap(centerIndex);
      const prev = prevVisible, dir = direction, first = !hasEntered;
      const mult = rMult(window.innerWidth), hM = hMult(window.innerWidth);
      const slotCount = needsPagination ? MAX_VISIBLE : total;
      const cfg = (s) => slotCfg(slotCount, s);
      const base = { xPercent: -50, yPercent: -50 };
      if (first) isAnimating = true;
      let done = 0; const vis = vmap.size;
      const onDone = () => { if (++done >= vis) { isAnimating = false; if (first) hasEntered = true; } };

      cards.forEach((card, ci) => {
        const slot = vmap.get(ci); const was = prev.has(ci);
        if (slot !== undefined) {
          const c = cfg(slot);
          if (!G || reduce) { placeStatic(card, c, mult, hM, c.z); onDone(); return; }
          const target = { xPercent: -50, yPercent: -50, x: (c.x * mult) + 'rem', y: (c.y * hM) + 'rem', rotation: c.rot, scale: c.scale, opacity: 1, zIndex: c.z };
          if (first) {
            G.set(card, { xPercent: -50, yPercent: -50, x: 0, y: (12 * hM) + 'rem', rotation: 0, scale: 0.5, opacity: 0 });
            G.to(card, Object.assign({}, target, { duration: 1.2, ease: 'elastic.out(1.05,.78)', delay: 0.2 + slot * 0.06, onComplete: onDone }));
          } else if (!was) {
            const ex = dir === 'right' ? 40 : -40;
            G.set(card, { xPercent: -50, yPercent: -50, x: ex + 'rem', y: (c.y * hM) + 'rem', rotation: dir === 'right' ? 30 : -30, scale: 0.5, opacity: 0 });
            G.to(card, Object.assign({}, target, { duration: 0.6, ease: 'power2.out', overwrite: true, onComplete: onDone }));
          } else {
            G.to(card, Object.assign({}, target, { duration: 0.5, ease: 'power2.out', overwrite: 'auto', onComplete: onDone }));
          }
        } else if (was) {
          const ex = dir === 'right' ? -40 : 40;
          if (G && !reduce) G.to(card, { xPercent: -50, yPercent: -50, x: ex + 'rem', opacity: 0, scale: 0.5, rotation: dir === 'right' ? -30 : 30, duration: 0.4, ease: 'power2.in', overwrite: true, zIndex: 0 });
          else card.style.opacity = '0';
        } else {
          /* cualquier otra carta fuera de vista: garantizar OCULTA (evita cartas varadas al paginar) */
          if (G && !reduce) G.set(card, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
          else card.style.opacity = '0';
        }
      });
      // red de seguridad: garantiza que el candado isAnimating se libere
      // aunque algún onComplete no dispare (evita que se "trabe" al avanzar)
      if (G && !reduce) setTimeout(function () { isAnimating = false; if (first) hasEntered = true; }, first ? 1700 : 760);
      prevVisible = new Set(vmap.keys());
      hoverCleanup = wireHover(vmap, cfg, mult, hM);
      updateDots();
    }

    /* ---- hover: levanta la activa, empuja vecinas ---- */
    function wireHover(vmap, cfg, mult, hM) {
      if (!G || reduce || matchMedia('(hover:none)').matches) return null;
      const entries = [];
      cards.forEach((el, i) => { const s = vmap.get(i); if (s !== undefined) entries.push({ el, slot: s }); });
      entries.sort((a, b) => a.slot - b.slot);
      const centerSlot = entries.length >> 1;
      let leaveTimer = null;

      function layout(hovered) {
        entries.forEach(({ el, slot }) => {
          const b = cfg(slot);
          let tx = b.x * mult, ty = b.y * hM, tr = b.rot, ts = b.scale, delay = 0;
          if (hovered !== null) {
            const d = Math.abs(slot - hovered); delay = d * 0.02;
            if (slot === hovered) { ty -= 2.5 * hM; ts *= 1.08; }
            else {
              const norm = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
              const push = 8 * (1 - Math.abs(norm)) * (1 + 0.2 * Math.max(0, 3 - d));
              if (slot < hovered) { tx -= push * mult; tr -= 3 / (d + 1); }
              else { tx += push * mult; tr += 3 / (d + 1); }
              if (slot === entries.length - 1 && hovered < centerSlot) ty -= 1 * hM;
              if (slot === 0 && hovered > centerSlot) ty -= 1 * hM;
            }
          } else delay = Math.abs(slot - centerSlot) * 0.02;
          G.to(el, { xPercent: -50, yPercent: -50, x: tx + 'rem', y: ty + 'rem', rotation: tr, scale: ts, duration: 0.5, delay, ease: 'elastic.out(1,.75)', overwrite: 'auto' });
          G.set(el, { zIndex: b.z });
        });
      }
      let activeSlot = null;
      const handlers = entries.map(({ el, slot }) => {
        const h = () => { if (isAnimating) return; if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; } if (activeSlot !== slot) { activeSlot = slot; layout(slot); } };
        el.addEventListener('mouseenter', h); return { el, h };
      });
      const onLeave = () => { if (isAnimating) return; if (leaveTimer) clearTimeout(leaveTimer); leaveTimer = setTimeout(() => { activeSlot = null; layout(null); }, 50); };
      root.addEventListener('mouseleave', onLeave);
      return () => { handlers.forEach(({ el, h }) => el.removeEventListener('mouseenter', h)); root.removeEventListener('mouseleave', onLeave); if (leaveTimer) clearTimeout(leaveTimer); };
    }

    /* ---- paginación ---- */
    function cycle(dir) {
      if (isAnimating || !needsPagination) return;
      isAnimating = true; direction = dir;
      centerIndex = dir === 'right' ? (centerIndex + 1) % total : (centerIndex - 1 + total) % total;
      render();
    }
    let dotsEls = [];
    function updateDots() {
      dotsEls.forEach((d, i) => d.classList.toggle('is-on', i === centerIndex));
    }
    if (nav && needsPagination) {
      nav.hidden = false;
      const dotsWrap = nav.querySelector('.fan-dots');
      if (dotsWrap) { dotsWrap.innerHTML = ''; dotsEls = cards.map(() => { const s = document.createElement('span'); s.className = 'fan-dot'; dotsWrap.appendChild(s); return s; }); }
      const prevBtn = nav.querySelector('[data-fan-prev]'), nextBtn = nav.querySelector('[data-fan-next]');
      if (prevBtn) prevBtn.addEventListener('click', () => cycle('left'));
      if (nextBtn) nextBtn.addEventListener('click', () => cycle('right'));
    } else if (nav) nav.hidden = true;

    render();
    window.addEventListener('resize', () => { if (!isAnimating) render(); });
  }

  function boot() { document.querySelectorAll('[data-card-fan]').forEach(initFan); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
