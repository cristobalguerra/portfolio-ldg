/* ============================================================
   SHOWCASE · galería de proyectos LDG (oscuro, autocontenido)
   Datos: 17 proyectos base (Otoño 2025) + merge LIVE no-bloqueante
   de Firebase RTDB (ldgProjects / ldgAwards). No depende de
   script.js ni styles.css del sitio crema.
   ============================================================ */
(function () {
  'use strict';

  /* ---- helpers (port de script.js) ---- */
  var ESC = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
  function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return ESC[c]; }); }
  function normalizeThumbUrl(url){
    if(!url) return '';
    var m = String(url).match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?[^"' ]*id=)|lh3\.googleusercontent\.com\/d\/)([\w-]{20,})/);
    return m ? 'https://lh3.googleusercontent.com/d/' + m[1] + '=w1600' : url;
  }
  var CAT_LABELS = { branding:'BRANDING', editorial:'EDITORIAL', packaging:'PACKAGING', motion:'MOTION', uiux:'UI/UX', identidad:'IDENTIDAD' };
  function catLabel(slug){ return CAT_LABELS[slug] || String(slug || '').toUpperCase(); }

  /* ---- datos base: 17 proyectos Otoño 2025 ---- */
  var BASE_PROJECTS = [
    {id:1,title:"Deconstrucción de la Percepción y los Estándares de la Belleza Femenina",student:"Emilia Bermúdez, Angelina Avalos, Sofía Peralta",tutor:"Jessica Elizabeth Ochoa Zamarripa",year:2025,semester:"Otoño 2025",category:"editorial",thumbnail:"proyectos/thumbnails/ellaz.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1KmmkDmmBlF4XjhRszk3_9JMo0ax7J_m5",abstract:"Este proyecto analiza cómo los estándares de belleza han sido impuestos a las mujeres, afectando su bienestar físico y emocional. Se explora cómo los elementos gráficos y la construcción visual de los medios han normalizado la idea de que la belleza debe alcanzarse a costo del sufrimiento."},
    {id:2,title:"Del Interés a la Decisión: Comunicación para Estudiantes Interesados en Diseño Gráfico",student:"Valeria de la Garza, Carolina Lebrija, Milagros Martínez",tutor:"Diana Woolrich",year:2025,semester:"Otoño 2025",category:"branding",thumbnail:"proyectos/thumbnails/atraccin-creativa4.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1MW86Alp7qqyM9sH8pbFrQQqwXECWALZJ",abstract:"Este proyecto busca incentivar la comunicación dirigida a estudiantes de preparatoria UDEM interesados en Diseño Gráfico. A través de una investigación sobre percepción, estigmas y el síndrome del impostor, se desarrolla una estrategia de comunicación visual que conecta con sus intereses y motivaciones."},
    {id:3,title:"Las Habilidades de Gestión en los Diseñadores Gráficos",student:"Eva Schroeder, Bárbara Ghio, Yolanda Mazur, Andrea Criollos",tutor:"Daniel Almaguer",year:2025,semester:"Otoño 2025",category:"editorial",thumbnail:"proyectos/thumbnails/mediante.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1xCpUfI6rhKQCDLPpivkyV9yUoSW65HJK",abstract:"Aborda las habilidades de gestión necesarias para los diseñadores gráficos en su práctica profesional. A través de la plataforma MEDIANTE, se investigan y proponen metodologías y herramientas que fortalezcan las capacidades administrativas y de gestión de proyectos en el ámbito del diseño gráfico."},
    {id:4,title:"Te Falta Barrio: Estrategias de Información para el Barrio Antiguo de Monterrey",student:"Ana Lucía Maraboto, Frida de la Garza",tutor:"Julian Iñiguez Flores",year:2025,semester:"Otoño 2025",category:"uiux",thumbnail:"proyectos/thumbnails/tefaltabarrio_9.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=15Gt7Tu7FJsKemb_UIkl531jRGdYf2Wtj",abstract:"Desarrolla e implementa una estrategia de comunicación que mejora la experiencia de los usuarios al brindar información clara, accesible y atractiva sobre el Barrio Antiguo de Monterrey. Con metodología Human Centered Design se crearon herramientas digitales y físicas como una página web y un tótem con mapas seccionados."},
    {id:5,title:"Kinua: Conciencia Psicoemocional en el Servicio de Nutrición",student:"Bárbara Rodríguez, Karen Peña, Ian Hernández",tutor:"Rolando Angulo Gálvez",year:2025,semester:"Otoño 2025",category:"uiux",thumbnail:"proyectos/thumbnails/kinua11.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=19SDuVjGiiMPDJeyGLldaJbPK289xDmZc",abstract:"Kinua es una herramienta digital que promueve la conciencia psicoemocional en el servicio de nutrición. Desarrolla una app móvil para pacientes y una plataforma web para nutriólogos que facilitan la comunicación, el seguimiento y la comprensión del proceso nutricional."},
    {id:6,title:"Experiencia Mundialista 2026: Sistema Gráfico para Monterrey",student:"María Fernanda Adame Moreno",tutor:"Daniel Almaguer",year:2025,semester:"Otoño 2025",category:"branding",thumbnail:"proyectos/thumbnails/bendito_mockup-mb-t_shirt-01.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=15Ma9XCXcXQa6n5J_A06ZdXgC7rMCwJ87",abstract:"Sistema integrado de diseño gráfico para mejorar la experiencia de los visitantes internacionales de Monterrey durante el Mundial 2026. Abarca identidad, señalética, experiencia del usuario y comunicación de la ciudad, buscando mejorar la movilidad y el sentido de pertenencia de los turistas."},
    {id:7,title:"Historias Detrás de la Mesa",student:"Ximena Díaz, Raquel Jaime, Roberta Maldonado, Rebeca Wolberg",tutor:"Fernando Rafael Mateos",year:2025,semester:"Otoño 2025",category:"branding",thumbnail:"proyectos/thumbnails/tulan.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1T3vXuNdJ8AYi9Ysiw9xsyLyNZ4PDTkJN",abstract:"Aborda la falta de visibilidad y estrategias de comunicación de los pequeños negocios culinarios en San Pedro Garza García. A través de la agencia creativa Sobremesa y el proyecto social Sobrefondas, se diseñan propuestas de identidad visual, storytelling y contenido audiovisual."},
    {id:8,title:"Alteria: Interacción Multisensorial, Tecnología y Sinestesia en el Diseño",student:"Mariángela Garza, Patricio Treviño, Marian Treviño",tutor:"Dr. Cristobal Guerra Tamez",year:2025,semester:"Otoño 2025",category:"motion",thumbnail:"proyectos/thumbnails/alteria.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1johQRByvDnWGBPfdEfmRLwxwcRbBJJB_",abstract:"Alteria es un modelo de diseño multisensorial que articula sinestesia digital, correspondencias perceptuales, inmersión emocional y flujo corporal para expandir la experiencia del usuario en entornos interactivos. El 87% de los participantes reportó altos niveles de inmersión."},
    {id:9,title:"Creando Espacios para Crear",student:"Fernanda Pequeño, Lorena Garza, Nahely Leal, Alda Camacho",tutor:"Fabio Spagnoli Herrera",year:2025,semester:"Otoño 2025",category:"branding",thumbnail:"proyectos/thumbnails/creando-espacios.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=16spSSW2oPhv3niiQ2x7z7O7eQLhM9Ou-",abstract:"Propuesta de emprendimiento orientada al diseño y conceptualización de un espacio creativo en Monterrey, acompañado de una identidad visual sólida, estrategia de comunicación y plataformas digitales que facilitan la colaboración interdisciplinaria entre creativos emergentes."},
    {id:10,title:"Antera: El Lenguaje de las Flores como Herramienta de Comunicación",student:"Natalia Alcalá, Danna Chávez, Victoria Lizárraga, Sarai Marines",tutor:"Mariel García Hernández",year:2025,semester:"Otoño 2025",category:"editorial",thumbnail:"proyectos/thumbnails/antera.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1zcUhV8oRgx-hXFxn_5odwqjmnbtoGbI6",abstract:"El lenguaje de las flores o floriografía ha sido una herramienta de comunicación simbólica durante siglos. Este proyecto recupera la floriografía, visibilizando su presencia e importancia dentro de la cultura mexicana y en la comunicación visual, a través de una antología visual."},
    {id:11,title:"Nodus: Ecosistema de Cuidado en Oncología Infantil",student:"Valeria Gómez, Jaqueline Casas, Sabrina Villaseñor",tutor:"Marco Vinicio Garrido Félix",year:2025,semester:"Otoño 2025",category:"uiux",thumbnail:"proyectos/thumbnails/nodus.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1UB1hNzdQIxnHd40hS3yJwaxU4ygY2YAW",abstract:"Nodus es un sistema integral de acompañamiento para mejorar la experiencia de cuidado de niños con cáncer y sus familias. A través de un pastillero inteligente, una app móvil y un brazalete lúdico, busca reducir la ansiedad, los errores en la medicación y el aislamiento emocional."},
    {id:12,title:"Rave Pilates: Implementación de Diseño de Servicio",student:"Ana Gabriela Garza, Mariana Gómez, Mariana Guerra",tutor:"Carlos Delgado De Roble",year:2025,semester:"Otoño 2025",category:"uiux",thumbnail:"proyectos/thumbnails/rave.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1_lAHQLSpzIJX7_ZGdjXJ1Z49i25inir3",abstract:"Rediseño integral de la página web de Rave Pilates y desarrollo de una app móvil que integra pilates y nutrición personalizada. Unifica reserva de clases, compra de paquetes y seguimiento de entrenamiento, junto con una guía nutricional inteligente potenciada por IA."},
    {id:13,title:"Turnout: Conectando a la Generación Z",student:"Alejandra Urteaga, Maadai Salazar",tutor:"Natalia Ceballos Gutiérrez",year:2025,semester:"Otoño 2025",category:"branding",thumbnail:"proyectos/thumbnails/turnout.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=14QYLdsddVEncTWAyg9F3cbhXwySmcmRj",abstract:"Turnout es una plataforma para la Generación Z que fomenta la conexión, el bienestar y el autoconocimiento. Desarrolla una identidad de marca, estrategia de comunicación y herramientas digitales orientadas a crear experiencias significativas de reconexión personal y social."},
    {id:14,title:"Diseño de Sistemas de Comunicación para Preparación y Respuesta ante Desastres",student:"Miranda Hernández, Luis Alberto Peña, Miguel Ángel Maldonado",tutor:"Hisa María Martínez Nimi",year:2025,semester:"Otoño 2025",category:"uiux",thumbnail:"proyectos/thumbnails/diseo-de-sistemas-de-comunicacion.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1OGM6BzjpnoK-3lSCyK5LMU0fNlUwFDn9",abstract:"Demuestra que es posible diseñar sistemas de comunicación capaces de adaptarse a múltiples usuarios y contextos, superando barreras informativas y fortaleciendo la capacidad de respuesta en los momentos tempranos y más críticos de una emergencia."},
    {id:15,title:"Verdad en Juego: Diseño Gráfico Aplicado al Fenómeno de las Cámaras de Eco",student:"Fernanda Díaz, Miranda Siller, Eugenio Nocedal, Karina Del Prado",tutor:"Jorge Cantú Sánchez",year:2025,semester:"Otoño 2025",category:"editorial",thumbnail:"proyectos/thumbnails/verdad-en-juego.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1oWVlmCvdJfZfInP-uSjiEii7gZDflc99",abstract:"Estrategia visual y lúdica para sensibilizar a los jóvenes de la Generación Z sobre el impacto de las cámaras de eco y los algoritmos. Se diseñó «Twist & Tell», un juego de mesa que simula un feed de redes sociales y reta a distinguir entre información verídica y distorsionada."},
    {id:16,title:"Biodiseño Gráfico: Co-creación con la Naturaleza para una Gráfica Regenerativa",student:"Sofía Porto Iannuzzi",tutor:"Iliana María Moreno Guzmán",year:2025,semester:"Otoño 2025",category:"packaging",thumbnail:"proyectos/thumbnails/biodiseo.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1mV0ueQ1NaF3pHgTcbUT_reDx1tpwzYo0",abstract:"Explora el potencial del biodiseño como rama emergente para el desarrollo de materialidades y procesos dentro del diseño gráfico, enfocándose en la domesticación de raíces como técnica de co-creación con organismos vivos. Una práctica multiespecie y regenerativa."},
    {id:17,title:"Colección by Habits",student:"Ana Cecilia Moreno, Ana Paula Guerra, Mariana Zambrano",tutor:"Sergio Trujillo Pérez",year:2025,semester:"Otoño 2025",category:"packaging",thumbnail:"proyectos/thumbnails/habits.jpg",pdfUrl:"https://drive.google.com/uc?export=download&id=1YqUcSRr6pX5j9f8vzDEzhqkTYEgevOoM",abstract:"Incentiva a los usuarios a diversificar la manera en que consumen proteína en polvo. Integra una página web, un recetario físico con 90 recetas y una estrategia de campaña basada en diseño centrado en el usuario y la teoría del hábito."}
  ];

  /* ---- premio base (estático del crema · A′ Design Award) ---- */
  var BASE_AWARDS = [{
    id:'base_roblemaca', name:'Roble & Maca', prize:"A′ Design Award & Competition",
    badge:'Bronce · 2025',
    students:'Eugenia Martínez-Abrego · María Andrade · Paulina González · Valeria Marín',
    advisor:'Sergio Trujillo', image:'proyectos/awards/roble-maca.jpg',
    description:'Diseño gráfico · jurado internacional'
  }];

  /* ---- estado ---- */
  var projects = BASE_PROJECTS.slice();
  var awards = BASE_AWARDS.slice();
  var dynProjects = [], dynAwards = [];
  var query = '', activeCat = 'all';

  var $grid, $count, $chips, $search, $empty, $awards;

  /* ---- filtrado ---- */
  function filtered(){
    return projects.filter(function(p){
      if(activeCat !== 'all' && p.category !== activeCat) return false;
      if(!query) return true;
      var hay = (p.title+' '+p.student+' '+p.tutor+' '+catLabel(p.category)).toLowerCase();
      return hay.indexOf(query) !== -1;
    });
  }

  /* ---- render: chips de categoría ---- */
  function renderChips(){
    var cats = {};
    projects.forEach(function(p){ if(p.category) cats[p.category]=true; });
    var order = ['branding','editorial','packaging','motion','uiux','identidad'].filter(function(c){return cats[c];});
    var html = '<button class="sc-chip'+(activeCat==='all'?' is-on':'')+'" data-cat="all" type="button" aria-pressed="'+(activeCat==='all')+'">Todo</button>';
    order.forEach(function(c){
      var on = activeCat===c;
      html += '<button class="sc-chip'+(on?' is-on':'')+'" data-cat="'+c+'" type="button" aria-pressed="'+on+'">'+escapeHtml(catLabel(c))+'</button>';
    });
    $chips.innerHTML = html;
  }

  /* ---- render: grid ---- */
  function renderGrid(){
    var list = filtered();
    $count.textContent = list.length + (list.length===1 ? ' proyecto' : ' proyectos');
    if(!list.length){ $grid.innerHTML=''; $empty.hidden=false; return; }
    $empty.hidden = true;
    $grid.innerHTML = list.map(function(p){
      var thumb = normalizeThumbUrl(p.thumbnail);
      return '<article class="sc-card" tabindex="0" role="button" aria-label="Ver ficha: '+escapeHtml(p.title)+'" data-id="'+escapeHtml(String(p.id))+'">'
        + '<div class="sc-card__media"><img src="'+escapeHtml(thumb)+'" alt="" loading="lazy">'
        + '<span class="sc-card__cat">'+escapeHtml(catLabel(p.category))+'</span></div>'
        + '<div class="sc-card__body">'
        + '<h3 class="sc-card__title">'+escapeHtml(p.title)+'</h3>'
        + '<p class="sc-card__student">'+escapeHtml(p.student)+'</p>'
        + '<div class="sc-card__foot"><span class="sc-card__period">'+escapeHtml(p.semester||String(p.year))+'</span>'
        + '<span class="sc-card__open">Ver ficha →</span></div>'
        + '</div></article>';
    }).join('');
  }

  /* ---- render: reconocimientos (premios integrados) ---- */
  function renderAwards(){
    if(!$awards) return;
    if(!awards.length){ $awards.innerHTML=''; $awards.hidden=true; return; }
    $awards.hidden = false;
    $awards.innerHTML = awards.map(function(a){
      return '<article class="sc-award">'
        + '<div class="sc-award__img"><img src="'+escapeHtml(a.image||'')+'" alt="'+escapeHtml(a.name||'')+'" loading="lazy"></div>'
        + '<div class="sc-award__body">'
        + '<div class="sc-award__tags"><span class="sc-award__tag">'+escapeHtml(a.prize||'')+'</span>'
        + (a.badge?'<span class="sc-award__tag sc-award__tag--accent">'+escapeHtml(a.badge)+'</span>':'')+'</div>'
        + '<h3 class="sc-award__name">'+escapeHtml(a.name||'')+'</h3>'
        + (a.students?'<p class="sc-award__students">'+escapeHtml(a.students)+'</p>':'')
        + (a.advisor?'<p class="sc-award__advisor">Asesor · '+escapeHtml(a.advisor)+'</p>':'')
        + '</div></article>';
    }).join('');
  }

  /* ---- modal ---- */
  var modal, modalOriginEl = null;
  function byId(id){ return document.getElementById(id); }
  // neutraliza el fondo (main + dock + footer) mientras el modal está abierto
  function setBgInert(on){
    ['main', '.fdock', '.site-footer'].forEach(function(sel){
      var el = document.querySelector(sel);
      if(!el) return;
      if(on){ el.setAttribute('inert',''); el.setAttribute('aria-hidden','true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
  }
  function openModal(p){
    if(!modal) return;
    byId('scmCover').innerHTML = '<img src="'+escapeHtml(normalizeThumbUrl(p.thumbnail))+'" alt="">';
    byId('scmCat').textContent = catLabel(p.category);
    byId('scmTitle').textContent = p.title;
    byId('scmStudent').textContent = p.student;
    byId('scmTutor').textContent = p.tutor;
    byId('scmYear').textContent = p.semester || String(p.year);
    byId('scmAbstract').textContent = p.abstract || '';
    var dl = byId('scmDownload');
    if(p.pdfUrl){ dl.href = p.pdfUrl; dl.hidden = false; } else { dl.hidden = true; }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('sc-modal-open');
    setBgInert(true);
    var closeBtn = modal.querySelector('.sc-modal__close');
    if(closeBtn) closeBtn.focus();
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('sc-modal-open');
    setBgInert(false);
    if(modalOriginEl && modalOriginEl.focus){ modalOriginEl.focus(); modalOriginEl = null; }
  }
  // foco atrapado dentro del panel (Tab cicla entre primero/último focusable)
  function trapTab(e){
    if(e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
    var f = modal.querySelectorAll('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])');
    f = Array.prototype.filter.call(f, function(el){ return el.offsetParent !== null || el === document.activeElement; });
    if(!f.length) return;
    var first = f[0], last = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }

  /* ---- Vimeo facade (poster → iframe on-click) ---- */
  function wireVimeo(){
    var banner = document.querySelector('[data-vimeo]');
    if(!banner) return;
    var id = banner.getAttribute('data-vimeo');
    var poster = banner.querySelector('.sc-banner__poster');
    if(!poster) return;
    poster.addEventListener('click', function(e){
      e.preventDefault();
      var iframe = document.createElement('iframe');
      iframe.src = 'https://player.vimeo.com/video/'+id+'?autoplay=1&badge=0&app_id=58479';
      iframe.className = 'sc-banner__video';
      iframe.title = 'Biodiseño × Sofía Porto · PEF Otoño 2025';
      iframe.setAttribute('allow','autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen','');
      iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
      banner.innerHTML = '';
      banner.appendChild(iframe);
    });
  }

  /* ---- Firebase: merge LIVE no-bloqueante (solo lectura) ---- */
  function mapDynProject(r){
    return { id:r.id, title:r.title, student:r.student, tutor:r.tutor,
      year:parseInt(r.year,10)||r.year, semester:r.semester, category:r.category,
      thumbnail:r.thumbnail, pdfUrl:r.pdfUrl, abstract:r.abstract };
  }
  function rebuildProjects(){ projects = BASE_PROJECTS.concat(dynProjects.map(mapDynProject)); }
  function rebuildAwards(){ awards = BASE_AWARDS.concat(dynAwards); }

  function initFirebase(){
    if(typeof firebase === 'undefined' || typeof db === 'undefined') return; // SDK no disponible → solo base
    try{
      db.ref('ldgProjects').on('value', function(snap){
        dynProjects = (snap.val() || []).filter(Boolean);
        rebuildProjects(); renderChips(); renderGrid();
      }, function(){ /* permiso/red: ignora, queda la base */ });
      db.ref('ldgAwards').on('value', function(snap){
        dynAwards = (snap.val() || []).filter(Boolean);
        rebuildAwards(); renderAwards();
      }, function(){ /* idem */ });
    }catch(e){ /* offline / sandbox: la base ya está renderizada */ }
  }

  /* ---- init ---- */
  function init(){
    $grid = byId('scGrid'); $count = byId('scCount'); $chips = byId('scChips');
    $search = byId('scSearch'); $empty = byId('scEmpty'); $awards = byId('scAwards');
    modal = byId('scModal');

    renderChips(); renderAwards(); renderGrid(); wireVimeo();

    // búsqueda
    if($search) $search.addEventListener('input', function(){ query = this.value.toLowerCase().trim(); renderGrid(); });
    // chips
    if($chips) $chips.addEventListener('click', function(e){
      var btn = e.target.closest('.sc-chip'); if(!btn) return;
      activeCat = btn.getAttribute('data-cat');
      renderChips(); renderGrid();
    });
    // abrir ficha (delegado: click + teclado)
    if($grid){
      $grid.addEventListener('click', function(e){ var c=e.target.closest('.sc-card'); if(c) openFromCard(c); });
      $grid.addEventListener('keydown', function(e){
        if(e.key!=='Enter' && e.key!==' ') return;
        var c=e.target.closest('.sc-card'); if(!c) return;
        e.preventDefault(); openFromCard(c);
      });
    }
    function openFromCard(card){
      modalOriginEl = card;
      var id = card.getAttribute('data-id');
      var p = projects.filter(function(x){ return String(x.id)===id; })[0];
      if(p) openModal(p);
    }
    // cerrar modal
    if(modal){
      modal.addEventListener('click', function(e){ if(e.target.hasAttribute('data-close')) closeModal(); });
    }
    document.addEventListener('keydown', function(e){
      if(!modal) return;
      if(e.key==='Escape' && modal.classList.contains('is-open')) closeModal();
      else trapTab(e);
    });

    // deep-link: showcase.html#p-<id> abre la ficha de ese proyecto (lo usa el home)
    function openById(id){
      if(!id) return;
      var p = projects.filter(function(x){ return String(x.id) === String(id); })[0];
      if(!p) return;
      var sec = byId('proyectos'); if(sec && sec.scrollIntoView) sec.scrollIntoView();
      openModal(p);
    }
    function fromHash(){
      var m = (location.hash || '').match(/^#p-(.+)$/);
      if(m) openById(decodeURIComponent(m[1]));
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();

    initFirebase();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
