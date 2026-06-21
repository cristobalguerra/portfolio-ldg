/* ============================================================
   OPORTUNIDADES · Prácticas + Bolsa de trabajo (oscuro, autocontenido)
   Vacantes = PLACEHOLDERS genéricos (reemplazar por reales / futuro nodo
   Firebase `ldgJobs`, mismo patrón solo-lectura que showcase.js).
   No depende de script.js/styles.css del crema.
   ============================================================ */
(function () {
  'use strict';

  var ESC = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
  function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return ESC[c]; }); }
  var CONTACT = 'ldg.crgs@udem.edu';

  /* ---- bolsa (PLACEHOLDERS realistas · reemplazar por vacantes reales) ---- */
  var LISTINGS = [
    { tipo:'Práctica', puesto:'Diseño de identidad y branding', org:'Estudio de branding', area:'Branding',  modalidad:'Presencial', ciudad:'San Pedro, N.L.' },
    { tipo:'Práctica', puesto:'Motion & contenido social',      org:'Agencia creativa',    area:'Motion',    modalidad:'Híbrido',    ciudad:'Monterrey' },
    { tipo:'Práctica', puesto:'Diseño editorial',               org:'Despacho editorial',  area:'Editorial', modalidad:'Presencial', ciudad:'Monterrey' },
    { tipo:'Empleo',   puesto:'Jr. Brand Designer',             org:'Estudio de diseño',   area:'Branding',  modalidad:'Presencial', ciudad:'Monterrey' },
    { tipo:'Empleo',   puesto:'Diseñador UX/UI',                org:'Producto digital',    area:'UX/UI',     modalidad:'Remoto',     ciudad:'Remoto' },
    { tipo:'Empleo',   puesto:'Diseñador de producto digital',  org:'Agencia de tecnología', area:'Producto', modalidad:'Remoto',    ciudad:'Global' }
  ];

  var query = '', activeTipo = 'all';
  var $grid, $count, $chips, $search, $empty;

  function filtered(){
    return LISTINGS.filter(function(l){
      if(activeTipo !== 'all' && l.tipo !== activeTipo) return false;
      if(!query) return true;
      var hay = (l.puesto+' '+l.org+' '+l.area+' '+l.tipo+' '+l.modalidad+' '+l.ciudad).toLowerCase();
      return hay.indexOf(query) !== -1;
    });
  }

  function renderChips(){
    var defs = [['all','Todo'],['Práctica','Prácticas'],['Empleo','Empleo']];
    $chips.innerHTML = defs.map(function(d){
      var on = activeTipo===d[0];
      return '<button class="op-chip'+(on?' is-on':'')+'" data-tipo="'+escapeHtml(d[0])+'" type="button" aria-pressed="'+(on?'true':'false')+'">'+escapeHtml(d[1])+'</button>';
    }).join('');
  }

  function cardHtml(l){
    var subject = encodeURIComponent('Interés · '+l.puesto+' ('+l.tipo+') · '+l.org);
    var href = 'mailto:'+CONTACT+'?subject='+subject;
    var tipoClass = l.tipo==='Empleo' ? ' op-card__tipo--job' : '';
    return '<article class="op-card">'
      + '<div class="op-card__top">'
      + '<span class="op-card__tipo'+tipoClass+'">'+escapeHtml(l.tipo)+'</span>'
      + '<span class="op-card__mod">'+escapeHtml(l.modalidad)+'</span>'
      + '</div>'
      + '<h3 class="op-card__role">'+escapeHtml(l.puesto)+'</h3>'
      + '<p class="op-card__org">'+escapeHtml(l.org)+' · '+escapeHtml(l.ciudad)+'</p>'
      + '<div class="op-card__foot">'
      + '<span class="op-card__area">'+escapeHtml(l.area)+'</span>'
      + '<a class="op-card__cta" href="'+href+'">Postular →</a>'
      + '</div></article>';
  }

  function renderGrid(){
    var list = filtered();
    $count.textContent = list.length + (list.length===1 ? ' vacante' : ' vacantes');
    if(!list.length){ $grid.innerHTML=''; $empty.hidden=false; return; }
    $empty.hidden = true;
    $grid.innerHTML = list.map(cardHtml).join('');
  }

  function init(){
    $grid = document.getElementById('opGrid');
    $count = document.getElementById('opCount');
    $chips = document.getElementById('opChips');
    $search = document.getElementById('opSearch');
    $empty = document.getElementById('opEmpty');
    if(!$grid) return;

    renderChips(); renderGrid();

    if($search) $search.addEventListener('input', function(){ query = this.value.toLowerCase().trim(); renderGrid(); });
    if($chips) $chips.addEventListener('click', function(e){
      var btn = e.target.closest('.op-chip'); if(!btn) return;
      activeTipo = btn.getAttribute('data-tipo');
      renderChips(); renderGrid();
    });

    /* FUTURO: merge live de un nodo Firebase `ldgJobs` (mismo patrón que showcase.js):
       if (typeof db !== 'undefined') db.ref('ldgJobs').on('value', function(s){
         var extra=(s.val()||[]).filter(Boolean); LISTINGS=BASE.concat(extra); renderGrid();
       }, function(){}); */
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
