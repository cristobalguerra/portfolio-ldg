/* Port FIEL (vainilla) de ScrollExpandMedia (21st.dev) — sin React, sin framer-motion.
   Reproduce el "scroll hijack" original: mientras el media no está expandido, la página
   se mantiene arriba y la rueda/el touch alimentan la expansión; al llegar a 1 se libera
   el scroll y se revela el contenido. Rueda hacia arriba en el tope → vuelve a colapsar.
   Markup esperado:
     <header class="se" data-scroll-expand> <div class="se-stage">…</div> <section class="se-content">…</section> </header>
   Variables/clases que escribe:
     --se-prog (0→1) · --se-tx (vw del título) · .se-expanded · .se-show */
(function () {
  var root = document.querySelector('[data-scroll-expand]');
  if (!root) return;

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var prog = 0, expanded = false, touchStartY = 0;

  function isMobile() { return window.innerWidth < 768; }

  function render() {
    root.style.setProperty('--se-prog', prog.toFixed(4));
    root.style.setProperty('--se-tx', (prog * (isMobile() ? 180 : 150)).toFixed(2));
    root.classList.toggle('se-expanded', expanded);
    root.classList.toggle('se-show', expanded);
  }

  // Sin movimiento: deja todo expandido y el contenido visible.
  if (reduce) { prog = 1; expanded = true; render(); return; }

  function bump(delta) {
    prog = Math.min(1, Math.max(0, prog + delta));
    if (prog >= 1) expanded = true;
    render();
  }

  function onWheel(e) {
    if (expanded && e.deltaY < 0 && window.scrollY <= 5) {
      expanded = false; e.preventDefault(); render();
    } else if (!expanded) {
      e.preventDefault();
      bump(e.deltaY * 0.0009);
    }
  }
  function onTouchStart(e) { touchStartY = e.touches[0].clientY; }
  function onTouchMove(e) {
    if (!touchStartY) return;
    var y = e.touches[0].clientY, dy = touchStartY - y;
    if (expanded && dy < -20 && window.scrollY <= 5) {
      expanded = false; e.preventDefault(); render();
    } else if (!expanded) {
      e.preventDefault();
      bump(dy * (dy < 0 ? 0.008 : 0.005)); // más sensible al regresar
      touchStartY = y;
    }
  }
  function onTouchEnd() { touchStartY = 0; }
  function onScroll() { if (!expanded) window.scrollTo(0, 0); } // bloquea la página hasta expandir

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: false });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', render);
  render();
})();
