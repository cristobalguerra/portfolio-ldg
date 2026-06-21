/* Dock de íconos «divertido» (prototipo) — reemplazo candidato de dock.js.
   Una sola línea siempre (íconos compactos), motion elástico en hover, etiqueta
   como tooltip, y grupo Comunidad en un popover. Cada ítem NAVEGA (no es chat).
   Config por página: window.SITE_NAV = { current: 'inicio' } antes de cargar. */
(function () {
  var current = (window.SITE_NAV && window.SITE_NAV.current) || '';

  // íconos line (estilo lucide, 24x24)
  var I = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
  };
  function svg(p){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }

  var PRIMARY = [
    { id:'inicio', label:'Inicio', href:'index.html', ico:I.rocket },
    { id:'showcase', label:'Showcase', href:'showcase.html', ico:I.star },
    { id:'trayecto', label:'Trayecto', href:'trayecto.html', ico:I.route },
    { id:'oportunidades', label:'Oportunidades', href:'oportunidades.html', ico:I.briefcase }
  ];
  var COMUNIDAD = [
    { id:'avance', label:'Mi Avance', href:'avance.html', ico:I.gauge },
    { id:'pef', label:'Guía PEF', href:'pef.html', ico:I.book },
    { id:'peftalks', label:'PEF Talks', href:'#peftalks', ico:I.mic, attr:'data-pef-talks' }
  ];

  function item(it){
    var cur = it.id === current ? ' is-current' : '';
    var aria = it.id === current ? ' aria-current="page"' : '';
    return '<a class="fdock-item' + cur + '" href="' + it.href + '"' + (it.attr ? ' ' + it.attr : '') + aria + ' aria-label="' + it.label + '">'
      + '<span class="fdock-ico">' + svg(it.ico) + '</span>'
      + '<span class="fdock-label">' + it.label + '</span></a>';
  }

  var commCur = COMUNIDAD.some(function(c){ return c.id === current; }) ? ' is-current' : '';

  var nav = document.createElement('nav');
  nav.className = 'fdock';
  nav.setAttribute('aria-label', 'Navegación principal');
  nav.innerHTML =
    '<div class="fdock-glass">'
    + PRIMARY.map(item).join('')
    + '<span class="fdock-sep" aria-hidden="true"></span>'
    + '<button class="fdock-item fdock-group' + commCur + '" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Comunidad">'
    + '<span class="fdock-ico">' + svg(I.users) + '</span><span class="fdock-label">Comunidad</span></button>'
    + '</div>'
    + '<div class="fdock-sub" role="menu" aria-label="Comunidad">'
    + COMUNIDAD.map(function(it){
        var cur = it.id === current ? ' is-current' : '';
        return '<a class="fdock-subitem' + cur + '" href="' + it.href + '"' + (it.attr ? ' ' + it.attr : '') + ' role="menuitem">'
          + '<span class="fdock-ico">' + svg(it.ico) + '</span><span>' + it.label + '</span></a>';
      }).join('')
    + '</div>';
  document.body.appendChild(nav);

  var btn = nav.querySelector('.fdock-group');
  function setOpen(o){ nav.classList.toggle('is-open', o); btn.setAttribute('aria-expanded', String(o)); }
  btn.addEventListener('click', function(e){ e.stopPropagation(); setOpen(!nav.classList.contains('is-open')); });
  document.addEventListener('click', function(e){ if(!nav.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setOpen(false); });
  nav.querySelectorAll('[data-pef-talks]').forEach(function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); setOpen(false); document.dispatchEvent(new CustomEvent('open-pef-talks')); });
  });
})();
