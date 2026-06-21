/* Directorio de equipo (Alto Desempeño): cajón expandible + buscador.
   Inicializa cada .teamdir. */
(function () {
  function init(td) {
    const drawer = td.querySelector('.teamdir-drawer');
    const bar = td.querySelector('.teamdir-bar');
    const closeBtn = td.querySelector('.teamdir-close');

    // La barra colapsada actúa como botón accesible; al expandir deja de serlo
    // (contiene el botón Cerrar), para no anidar roles button.
    function setTrigger(on) {
      if (!bar) return;
      if (on) {
        bar.setAttribute('role', 'button');
        bar.setAttribute('tabindex', '0');
        bar.setAttribute('aria-expanded', 'false');
        if (!bar.getAttribute('aria-label')) bar.setAttribute('aria-label', 'Abrir directorio completo del equipo');
      } else {
        bar.removeAttribute('role');
        bar.setAttribute('tabindex', '-1');
        bar.setAttribute('aria-expanded', 'true');
      }
    }
    function expand() {
      if (td.classList.contains('is-expanded')) return;
      td.classList.add('is-expanded'); setTrigger(false);
      const s = td.querySelector('.teamdir-drawer-body [data-tdsearch]');
      if (s) setTimeout(function () { s.focus(); }, 120);
    }
    function collapse() {
      if (!td.classList.contains('is-expanded')) return;
      td.classList.remove('is-expanded'); setTrigger(true);
      if (bar) bar.focus();
    }

    setTrigger(true);
    if (drawer) drawer.addEventListener('click', function () { if (!td.classList.contains('is-expanded')) expand(); });
    if (bar) bar.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !td.classList.contains('is-expanded')) { e.preventDefault(); expand(); }
    });
    if (closeBtn) closeBtn.addEventListener('click', function (e) { e.stopPropagation(); collapse(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') collapse(); });

    // Buscadores: cada input filtra su lista por nombre/especialidad
    td.querySelectorAll('[data-tdsearch]').forEach(function (inp) {
      const list = td.querySelector('[data-tdlist="' + inp.getAttribute('data-tdsearch') + '"]');
      if (!list) return;
      const items = Array.prototype.slice.call(list.querySelectorAll('.td-item'));
      inp.addEventListener('input', function () {
        const q = inp.value.trim().toLowerCase();
        items.forEach(function (it) {
          const hay = ((it.getAttribute('data-name') || '') + ' ' + (it.getAttribute('data-role') || '')).toLowerCase();
          it.classList.toggle('is-hidden', q !== '' && hay.indexOf(q) === -1);
        });
      });
    });
  }
  function boot() { document.querySelectorAll('.teamdir').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
