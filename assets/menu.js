/* ============================================
   MENÚ DE SITIO · componente compartido (index · trayectoria · pef)
   Burbuja flotante fija arriba. Al pulsar, suelta una columna de píldoras
   hacia abajo y desenfoca el fondo (scrim con blur). Las píldoras se vuelven
   amarillas al pasar el cursor. Config por página vía window.SITE_MENU:
     { current: 'inicio'|'proyectos'|'reconocimiento'|'trayectoria'|'pef',
       sections: [ { href:'#id', label:'Texto' }, ... ]  // opcional }
   Sin dependencias. Si hay ScrollSmoother, lo pausa al abrir.
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
    { n: '05', label: 'Guía PEF',        href: 'pef.html',           key: 'pef' }
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
      '<a class="site-bar__brand" href="index.html"><b>LDG <span>UDEM</span></b></a>' +
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

    // reservar el espacio de la burbuja flotante
    var smoothContent = document.getElementById('smooth-content');
    var barH = getComputedStyle(document.documentElement).getPropertyValue('--site-bar-h').trim() || '76px';
    if (smoothContent) smoothContent.style.paddingTop = barH;
    else document.body.style.paddingTop = barH;

    var bar = document.getElementById('siteBar');
    var toggle = document.getElementById('siteMenuToggle');
    var label = toggle.querySelector('.site-bar__toggle-label');
    var scrim = document.getElementById('siteScrim');
    var pills = document.getElementById('sitePills');

    function getSmoother() {
      try { return (window.ScrollSmoother && ScrollSmoother.get) ? ScrollSmoother.get() : null; }
      catch (e) { return null; }
    }
    function focusables() {
      return document.querySelectorAll('#siteBar a[href], #siteBar button, #sitePills a[href]');
    }
    function isOpen() { return pills.classList.contains('open'); }

    // Stagger simétrico: al abrir cae de arriba a abajo; al cerrar se retira
    // de abajo a arriba. transition-delay en formato de 4 valores para no
    // retrasar los cambios de color del hover (background/color a 0s).
    function applyStagger(opening) {
      var items = pills.children;
      var n = items.length;
      for (var i = 0; i < n; i++) {
        var idx = opening ? i : (n - 1 - i);
        var d = (0.04 + idx * 0.045).toFixed(3) + 's';
        items[i].style.transitionDelay = d + ', ' + d + ', 0s, 0s';
      }
    }

    function open() {
      applyStagger(true);
      pills.classList.add('open');
      scrim.classList.add('open');
      bar.classList.add('is-open');
      pills.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      label.textContent = 'Cerrar';
      document.documentElement.classList.add('site-menu-open');
      var s = getSmoother(); if (s) s.paused(true);
      var first = pills.querySelector('.site-pill');
      if (first) first.focus();
    }
    function close(returnFocus) {
      applyStagger(false);
      pills.classList.remove('open');
      scrim.classList.remove('open');
      bar.classList.remove('is-open');
      pills.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
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
        var f = focusables();
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
          var barPx = parseInt(barH, 10) || 76;
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
