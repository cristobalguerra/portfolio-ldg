/* ============================================================
   TRAYECTO · trayectorias de exalumnos LDG (oscuro, autocontenido)
   6 caminos reales del egresado, ordenados por años para llegar.
   Datos portados de trayectoria.html (crema) — NO usa script.js/styles.css.
   ============================================================ */
(function () {
  'use strict';

  var ESC = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
  function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return ESC[c]; }); }

  /* ---- 6 caminos del egresado (datos reales) ---- */
  var PATHS = [
    {
      id:'freelance', num:'01', path:'Freelance con grandes marcas', chip:'Freelance', years:'1 año',
      name:'Paulina González', role:'Directora creativa & fundadora de House of Archives.',
      photo:'proyectos/alumnos/paulina-gonzalez.jpg',
      links:[{label:'LinkedIn', url:'https://www.linkedin.com/in/paulina-gonz%C3%A1lez-9448002b0/'},{label:'House of Archives', url:'https://instagram.com/houseof_archives'}],
      profile:['Egresada de Diseño Gráfico UDEM con tesis reconocida por el A′ Design Award & Competition en Italia. Desde Monterrey dirige House of Archives, su agencia enfocada en storytelling y en construir conceptos creativos. La creación de video la acompaña desde los 12 años y hoy define su práctica profesional.'],
      skills:['Storytelling visual','Dirección creativa','Video y audiovisual','Identidad y narrativa'],
      clients:'Zone · Xile Chile · Sico · Boru · Endless Luxe',
      stat:{label:'Modalidad', value:'Freelance'}
    },
    {
      id:'motion', num:'02', path:'Motion designer', chip:'Motion', years:'3 años',
      name:'Marbella', role:'Diseñadora gráfica, ilustradora y muralista. Basada en Barcelona.',
      photo:'proyectos/alumnos/marbella.jpg',
      links:[],
      profile:['Diseñadora gráfica, ilustradora y muralista egresada de la UDEM. Desde Barcelona desarrolla proyectos internacionales con una estética maximalista y mirada femenina, entre la ilustración de mujeres y el muralismo, animando sus propias piezas.','Recientemente su trayectoria fue destacada por la revista Players of Life.'],
      skills:['Ilustración','Motion y animación','Muralismo','Dirección de arte'],
      clients:'Shake Shack · Tecate Pa’l Norte · Innvictus · Sally Beauty · Mercedes-Benz · Campari · Randy’s Donuts',
      stat:{label:'Base', value:'Barcelona'}
    },
    {
      id:'fundador', num:'03', path:'Fundador de estudio', chip:'Fundador', years:'5 años',
      name:'Paola Rhon', role:'Founder & Creative Director en Better Projects.',
      photo:'proyectos/alumnos/paola-rhon.jpg',
      links:[{label:'LinkedIn', url:'https://www.linkedin.com/in/paolarhon/'},{label:'Better Projects', url:'https://bttrprojects.com/'}],
      profile:['Fundadora de Better Projects, estudio creativo especializado en branding, experiencia y estrategia. También dirige BTTR School. Egresada UDEM con reconocimiento PEF Sobresaliente.'],
      skills:['Branding e identidad','Dirección creativa','Estrategia de marca','Liderazgo de equipo'],
      clients:'',
      stat:{label:'Equipo', value:'2–10'}
    },
    {
      id:'in-house', num:'04', path:'Diseñador in-house', chip:'In-house', years:'7+ años',
      name:'Frida Medrano', role:'Art Director en Kettle, trabajando onsite para Apple.',
      photo:'proyectos/alumnos/frida-medrano.jpg',
      links:[],
      profile:['Diseñadora mexicana egresada de Diseño Gráfico por la UDEM. Art Director en Kettle, agencia digital con sede en San Francisco, colaborando onsite para Apple. Ha trabajado en proyectos de tipografía como Kalnia y Jabin, y ha presentado en ATypI, TypeLab, TypeCon, IxDA, Letrástica y Design Matters. Recibió el SOTA Catalyst Award en 2018. Antes de Kettle trabajó en Anagrama como diseñadora de branding.'],
      skills:['Dirección de arte','Diseño de producto digital','Tipografía y sistemas visuales','Interacción y UX','Diseño para tecnología','Equipos globales'],
      clients:'Kettle · Apple · Anagrama',
      stat:{label:'Modalidad', value:'In-house / tech'}
    },
    {
      id:'direccion-creativa', num:'05', path:'Dirección creativa', chip:'Dir. creativa', years:'10+ años',
      name:'Sebastián Padilla', role:'Director creativo, cofundador de Anagrama y realizador cinematográfico.',
      photo:'proyectos/alumnos/sebastian-padilla.jpg',
      links:[{label:'Anagrama', url:'https://anagrama.com/'}],
      profile:['Cofundador y director creativo de Anagrama, estudio mexicano reconocido internacionalmente por su trabajo en branding, arquitectura e interacción digital. Ha desarrollado además proyectos cinematográficos como Después del Incendio y Muerte al Verano.'],
      skills:['Dirección de arte','Branding e identidad','Narrativa visual','Dirección creativa','Conceptualización cultural','Gestión de equipos'],
      clients:'Anagrama',
      stat:{label:'Modalidad', value:'Fundador / realizador'}
    },
    {
      id:'estratega', num:'06', path:'Estratega de marca', chip:'Estratega', years:'10+ años',
      name:'Vicky González', role:'Founder & Creative Director de WORKROOM.',
      photo:'proyectos/alumnos/vicky-gonzalez.jpg',
      links:[],
      profile:['Fundadora y directora creativa de WORKROOM, estudio especializado en branding y estrategia de marca con sede en Monterrey. Antes de fundar WORKROOM, desarrolló experiencia como consultora independiente.'],
      skills:['Estrategia de marca','Dirección creativa','Branding e identidad','Posicionamiento','Gestión de clientes','Liderazgo creativo'],
      clients:'',
      stat:{label:'Modalidad', value:'Fundadora / estratega'}
    }
  ];

  function panelHtml(p){
    var links = p.links && p.links.length ? '<div class="tr-links">' + p.links.map(function(l){
      return '<a href="'+escapeHtml(l.url)+'" target="_blank" rel="noopener">'+escapeHtml(l.label)+' ↗</a>';
    }).join('') + '</div>' : '';
    var profile = p.profile.map(function(t){ return '<p>'+escapeHtml(t)+'</p>'; }).join('');
    var skills = '<div class="tr-skills">' + p.skills.map(function(s){ return '<span>'+escapeHtml(s)+'</span>'; }).join('') + '</div>';
    var clients = p.clients ? '<div class="tr-block"><span class="tr-block__label">Clientes y colaboraciones</span><p>'+escapeHtml(p.clients)+'</p></div>' : '';
    return '<div class="tr-panel" id="panel-'+escapeHtml(p.id)+'">'
      + '<div class="tr-panel__grid">'
      + '<figure class="tr-photo"><img src="'+escapeHtml(p.photo)+'" alt="'+escapeHtml(p.name)+'" loading="lazy"></figure>'
      + '<div class="tr-detail">'
      + '<h3 class="tr-name">'+escapeHtml(p.name)+'</h3>'
      + '<p class="tr-role">'+escapeHtml(p.role)+'</p>'
      + links
      + '<div class="tr-block"><span class="tr-block__label">Perfil</span>'+profile+'</div>'
      + '<div class="tr-block"><span class="tr-block__label">Habilidades clave</span>'+skills+'</div>'
      + clients
      + '<dl class="tr-stats"><div><dt>Años para llegar</dt><dd>'+escapeHtml(p.years)+'</dd></div>'
      + '<div><dt>'+escapeHtml(p.stat.label)+'</dt><dd>'+escapeHtml(p.stat.value)+'</dd></div></dl>'
      + '</div></div></div>';
  }

  function itemHtml(p){
    return '<article class="tr-item" id="'+escapeHtml(p.id)+'" data-id="'+escapeHtml(p.id)+'">'
      + '<button class="tr-head" type="button" aria-expanded="false" aria-controls="panel-'+escapeHtml(p.id)+'">'
      + '<span class="tr-num">'+escapeHtml(p.num)+'</span>'
      + '<span class="tr-headmain"><span class="tr-path">'+escapeHtml(p.path)+'</span>'
      + '<span class="tr-who">'+escapeHtml(p.name)+' · '+escapeHtml(p.role)+'</span></span>'
      + '<span class="tr-chip">'+escapeHtml(p.chip)+'</span>'
      + '<span class="tr-years">'+escapeHtml(p.years)+'</span>'
      + '<span class="tr-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>'
      + '</button>'
      + panelHtml(p)
      + '</article>';
  }

  function init(){
    var list = document.getElementById('trList');
    if(!list) return;
    list.innerHTML = PATHS.map(itemHtml).join('');

    var items = Array.prototype.slice.call(list.querySelectorAll('.tr-item'));

    function setOpen(item, open){
      var btn = item.querySelector('.tr-head');
      item.classList.toggle('is-open', open);
      if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function toggle(item){
      var willOpen = !item.classList.contains('is-open');
      items.forEach(function(it){ setOpen(it, false); });   // single-open
      if(willOpen){
        setOpen(item, true);
        if(item.id && history.replaceState) history.replaceState(null, '', '#'+item.id);
      } else if(history.replaceState){
        history.replaceState(null, '', location.pathname + location.search);
      }
    }

    list.addEventListener('click', function(e){
      var head = e.target.closest('.tr-head'); if(!head) return;
      toggle(head.closest('.tr-item'));
    });

    // deep-link: si la URL trae #id de un camino, ábrelo y haz scroll
    function openFromHash(){
      var id = (location.hash || '').replace('#','');
      if(!id) return;
      var item = document.getElementById(id);
      if(item && item.classList.contains('tr-item')){
        setOpen(item, true);
        item.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block:'start' });
      }
    }
    openFromHash();

    // imprimir guía (PRD §6: sale en CLARO vía @media print)
    var printBtns = document.querySelectorAll('[data-print]');
    Array.prototype.forEach.call(printBtns, function(b){
      b.addEventListener('click', function(){ window.print(); });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
