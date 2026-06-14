/* ============================================
   MENÚ DE SITIO · burbuja glass (index · trayectoria · pef)
   Burbuja flotante (LDG·UDEM + botón MENÚ/CERRAR) con relleno de vidrio
   oscuro. Al pulsar suelta píldoras hacia abajo y desenfoca el fondo.
   Grande arriba, se encoge al hacer scroll. Config por página vía
   window.SITE_MENU = { current, sections }. Pausa ScrollSmoother al abrir.
   ============================================ */
(function () {
  'use strict';

  var cfg = window.SITE_MENU || {};
  var current = cfg.current || '';
  var sections = Array.isArray(cfg.sections) ? cfg.sections : [];

  var LINKS = [
    { n: '01', label: 'Inicio',          href: 'index.html',         key: 'inicio' },
    { n: '02', label: 'Proyectos',       href: 'index.html#gallery', key: 'proyectos' },
    { n: '03', label: 'Reconocimiento',  href: 'index.html#awards',  key: 'reconocimiento' },
    { n: '04', label: 'Trayectoria',     href: 'trayectoria.html',   key: 'trayectoria' },
    { n: '05', label: 'Guía PEF',        href: 'pef.html',           key: 'pef' },
    { n: '06', label: 'Mi Avance',       href: 'avance.html',        key: 'avance' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var pillsHtml = LINKS.map(function (l) {
    var cur = (l.key === current) ? ' is-current' : '';
    var aria = (l.key === current) ? ' aria-current="page"' : '';
    return '<a class="site-pill' + cur + '" href="' + esc(l.href) + '"' + aria +
      '><span class="num">' + l.n + '</span>' + esc(l.label) + '</a>';
  }).join('');
  if (sections.length) {
    pillsHtml += '<span class="site-pills__sep">En esta página</span>';
    pillsHtml += sections.map(function (s) {
      return '<a class="site-pill site-pill--sm" href="' + esc(s.href) + '">' + esc(s.label) + '</a>';
    }).join('');
  }

  var html =
    '<header class="site-bar" id="siteBar">' +
      '<a class="site-bar__brand" href="index.html"><b>LDG <span class="u">&times; UDEM</span></b></a>' +
      '<button class="site-bar__toggle" id="siteMenuToggle" type="button" aria-expanded="false" aria-controls="sitePills">' +
        '<span class="site-bar__toggle-label">Menú</span>' +
        '<span class="site-bar__toggle-icon" aria-hidden="true"><i></i><i></i></span>' +
      '</button>' +
    '</header>' +
    '<div class="site-scrim" id="siteScrim"></div>' +
    '<nav class="site-pills" id="sitePills" aria-label="Navegación principal" aria-hidden="true">' + pillsHtml + '</nav>';

  function init() {
    var host = document.createElement('div');
    host.id = 'site-menu-root';
    host.innerHTML = html;
    document.body.insertBefore(host, document.body.firstChild);

    var smoothContent = document.getElementById('smooth-content');
    var barH = getComputedStyle(document.documentElement).getPropertyValue('--site-bar-h').trim() || '84px';
    if (smoothContent) smoothContent.style.paddingTop = barH;
    else document.body.style.paddingTop = barH;

    var bar = document.getElementById('siteBar');
    var toggle = document.getElementById('siteMenuToggle');
    var label = toggle.querySelector('.site-bar__toggle-label');
    var scrim = document.getElementById('siteScrim');
    var pills = document.getElementById('sitePills');
    var barPx = parseInt(barH, 10) || 84;

    function getSmoother() {
      try { return (window.ScrollSmoother && ScrollSmoother.get) ? ScrollSmoother.get() : null; }
      catch (e) { return null; }
    }
    function isOpen() { return pills.classList.contains('open'); }

    // ---- escala según scroll: 1.5 solo arriba del todo, 1 al bajar ----
    // Loop por frame: ScrollSmoother (index/trayectoria) no dispara el evento
    // 'scroll' nativo, así que leemos la posición real (smoother o window) cada
    // frame y solo tocamos la clase cuando cruza el umbral.
    function readScroll() {
      var s = getSmoother();
      if (s && s.scrollTop) return s.scrollTop();
      return window.scrollY || document.documentElement.scrollTop || 0;
    }
    var wasTop = null;
    function tick() {
      var atTop = readScroll() <= 4;
      if (atTop !== wasTop) { wasTop = atTop; bar.classList.toggle('is-top', atTop); }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // ---- menú completo (píldoras) ----
    function applyStagger(opening) {
      var items = pills.children, n = items.length;
      for (var i = 0; i < n; i++) {
        var idx = opening ? i : (n - 1 - i);
        var d = (0.04 + idx * 0.045).toFixed(3) + 's';
        items[i].style.transitionDelay = d + ', ' + d + ', 0s, 0s';
      }
    }
    function open() {
      applyStagger(true);
      pills.classList.add('open'); scrim.classList.add('open'); bar.classList.add('is-open');
      pills.setAttribute('aria-hidden', 'false'); toggle.setAttribute('aria-expanded', 'true');
      label.textContent = 'Cerrar';
      document.documentElement.classList.add('site-menu-open');
      var s = getSmoother(); if (s) s.paused(true);
      var first = pills.querySelector('.site-pill'); if (first) first.focus();
    }
    function close(returnFocus) {
      applyStagger(false);
      pills.classList.remove('open'); scrim.classList.remove('open'); bar.classList.remove('is-open');
      pills.setAttribute('aria-hidden', 'true'); toggle.setAttribute('aria-expanded', 'false');
      label.textContent = 'Menú';
      document.documentElement.classList.remove('site-menu-open');
      var s = getSmoother(); if (s) s.paused(false);
      if (returnFocus !== false) toggle.focus();
    }

    toggle.addEventListener('click', function () { isOpen() ? close() : open(); });
    scrim.addEventListener('click', function () { close(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { e.preventDefault(); close(); return; }
      if (e.key === 'Tab' && isOpen()) {
        var f = document.querySelectorAll('#siteBar a[href], #siteBar button, #sitePills a[href]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // clic en una píldora: cerrar; si es ancla de ESTA página, desplazar suave
    pills.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var url;
      try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
      var samePage = url.pathname === location.pathname;
      if (samePage && url.hash) {
        e.preventDefault();
        var target = null;
        try { target = document.querySelector(url.hash); } catch (err2) {}
        close(false);
        if (target) {
          var s = getSmoother();
          if (s) { s.scrollTo(s.offset(target, 'top ' + (barPx + 8) + 'px'), true); }
          else { window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - barPx - 8, behavior: 'smooth' }); }
          if (history.replaceState) history.replaceState(null, '', url.hash);
        }
      } else if (samePage && !url.hash) {
        e.preventDefault();
        close(false);
        var s2 = getSmoother();
        if (s2) s2.scrollTo(0, true); else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        close(false);
      }
    });
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
