/* ============================================
   PORTFOLIO LDG · Script
   Sistema "Mesa de Revisión" (ver DESIGN.md)
   ============================================ */

// ---- THESIS DATA ----
let theses = [
  {
    id: 1,
    title: "Deconstrucción de la Percepción y los Estándares de la Belleza Femenina",
    student: "Emilia Bermúdez, Angelina Avalos, Sofía Peralta",
    tutor: "Jessica Elizabeth Ochoa Zamarripa",
    year: 2025,
    semester: "Otoño 2025",
    category: "editorial",
    categoryLabel: "EDITORIAL",
    thumbnail: "proyectos/thumbnails/ellaz.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1KmmkDmmBlF4XjhRszk3_9JMo0ax7J_m5",
    abstract: "Este proyecto analiza cómo los estándares de belleza han sido impuestos a las mujeres, afectando su bienestar físico y emocional. Se explora cómo los elementos gráficos y la construcción visual de los medios de comunicación han normalizado la idea de que la belleza debe alcanzarse a costo del sufrimiento. La metodología combina análisis de contenido en publicidad y redes sociales, entrevistas y revisión de estudios previos sobre el impacto de estas exigencias en la autoestima y salud mental de la mujer."
  },
  {
    id: 2,
    title: "Del Interés a la Decisión: Comunicación para Estudiantes Interesados en Diseño Gráfico",
    student: "Valeria de la Garza, Carolina Lebrija, Milagros Martínez",
    tutor: "Diana Woolrich",
    year: 2025,
    semester: "Otoño 2025",
    category: "branding",
    categoryLabel: "BRANDING",
    thumbnail: "proyectos/thumbnails/atraccin-creativa4.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1MW86Alp7qqyM9sH8pbFrQQqwXECWALZJ",
    abstract: "Este proyecto busca incentivar la comunicación dirigida a estudiantes de preparatoria UDEM interesados en Diseño Gráfico. A través de una investigación sobre percepción, estigmas y el síndrome del impostor, se desarrolla una estrategia de comunicación visual que conecta con los intereses y motivaciones de los estudiantes potenciales."
  },
  {
    id: 3,
    title: "Las Habilidades de Gestión en los Diseñadores Gráficos",
    student: "Eva Schroeder, Bárbara Ghio, Yolanda Mazur, Andrea Criollos",
    tutor: "Daniel Almaguer",
    year: 2025,
    semester: "Otoño 2025",
    category: "editorial",
    categoryLabel: "EDITORIAL",
    thumbnail: "proyectos/thumbnails/mediante.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1xCpUfI6rhKQCDLPpivkyV9yUoSW65HJK",
    abstract: "Este proyecto aborda las habilidades de gestión necesarias para los diseñadores gráficos en su práctica profesional. A través de la plataforma MEDIANTE, se investigan y proponen metodologías y herramientas que fortalezcan las capacidades administrativas y de gestión de proyectos en el ámbito del diseño gráfico."
  },
  {
    id: 4,
    title: "Te Falta Barrio: Estrategias de Información para el Barrio Antiguo de Monterrey",
    student: "Ana Lucía Maraboto, Frida de la Garza",
    tutor: "Julian Iñiguez Flores",
    year: 2025,
    semester: "Otoño 2025",
    category: "uiux",
    categoryLabel: "UI/UX",
    thumbnail: "proyectos/thumbnails/tefaltabarrio_9.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=15Gt7Tu7FJsKemb_UIkl531jRGdYf2Wtj",
    abstract: "Este proyecto desarrolla e implementa una estrategia de comunicación que mejora la experiencia de los usuarios al brindar información clara, accesible y atractiva sobre el Barrio Antiguo de Monterrey. A través de la metodología Human Centered Design se crearon herramientas digitales y físicas como una página web y un tótem con mapas seccionados por categorías."
  },
  {
    id: 5,
    title: "Kinua: Conciencia Psicoemocional en el Servicio de Nutrición",
    student: "Bárbara Rodríguez, Karen Peña, Ian Hernández",
    tutor: "Rolando Angulo Gálvez",
    year: 2025,
    semester: "Otoño 2025",
    category: "uiux",
    categoryLabel: "UI/UX",
    thumbnail: "proyectos/thumbnails/kinua11.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=19SDuVjGiiMPDJeyGLldaJbPK289xDmZc",
    abstract: "Kinua es una herramienta digital que promueve la conciencia psicoemocional en el servicio de nutrición. El proyecto aborda la falta de integración entre los aspectos fisiológicos y emocionales del paciente, desarrollando una app móvil para pacientes y una plataforma web para nutriólogos que facilitan la comunicación, el seguimiento y la comprensión del proceso nutricional."
  },
  {
    id: 6,
    title: "Experiencia Mundialista 2026: Sistema Gráfico para Monterrey",
    student: "María Fernanda Adame Moreno",
    tutor: "Daniel Almaguer",
    year: 2025,
    semester: "Otoño 2025",
    category: "branding",
    categoryLabel: "BRANDING",
    thumbnail: "proyectos/thumbnails/bendito_mockup-mb-t_shirt-01.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=15Ma9XCXcXQa6n5J_A06ZdXgC7rMCwJ87",
    abstract: "Este proyecto desarrolla un sistema integrado de diseño gráfico para mejorar la experiencia de los visitantes internacionales de Monterrey durante el Mundial 2026. La propuesta visual abarca identidad corporativa, señalética, experiencia del usuario y comunicación de la ciudad, buscando mejorar la movilidad y el sentido de pertenencia de los turistas."
  },
  {
    id: 7,
    title: "Historias Detrás de la Mesa",
    student: "Ximena Díaz, Raquel Jaime, Roberta Maldonado, Rebeca Wolberg",
    tutor: "Fernando Rafael Mateos",
    year: 2025,
    semester: "Otoño 2025",
    category: "branding",
    categoryLabel: "BRANDING",
    thumbnail: "proyectos/thumbnails/tulan.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1T3vXuNdJ8AYi9Ysiw9xsyLyNZ4PDTkJN",
    abstract: "Este proyecto aborda la falta de visibilidad y estrategias de comunicación que enfrentan los pequeños negocios culinarios en San Pedro Garza García. A través de la agencia creativa Sobremesa y el proyecto social Sobrefondas, se diseñan propuestas de identidad visual, storytelling y contenido audiovisual para fortalecer la marca de emprendimientos locales."
  },
  {
    id: 8,
    title: "Alteria: Interacción Multisensorial, Tecnología y Sinestesia en el Diseño",
    student: "Mariángela Garza, Patricio Treviño, Marian Treviño",
    tutor: "Dr. Cristobal Guerra Tamez",
    year: 2025,
    semester: "Otoño 2025",
    category: "motion",
    categoryLabel: "MOTION",
    thumbnail: "proyectos/thumbnails/alteria.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1johQRByvDnWGBPfdEfmRLwxwcRbBJJB_",
    abstract: "Alteria es un modelo de diseño multisensorial que articula sinestesia digital, correspondencias perceptuales, inmersión emocional y flujo corporal para expandir la experiencia del usuario en entornos interactivos. Los resultados muestran que el 87% de los participantes reportó altos niveles de inmersión y el 90% manifestó un incremento significativo en la curiosidad."
  },
  {
    id: 9,
    title: "Creando Espacios para Crear",
    student: "Fernanda Pequeño, Lorena Garza, Nahely Leal, Alda Camacho",
    tutor: "Fabio Spagnoli Herrera",
    year: 2025,
    semester: "Otoño 2025",
    category: "branding",
    categoryLabel: "BRANDING",
    thumbnail: "proyectos/thumbnails/creando-espacios.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=16spSSW2oPhv3niiQ2x7z7O7eQLhM9Ou-",
    abstract: "Este proyecto desarrolla una propuesta de emprendimiento orientada al diseño y conceptualización de un espacio creativo en Monterrey, acompañado de una identidad visual sólida, estrategia de comunicación y plataformas digitales que facilitan la colaboración interdisciplinaria entre creativos emergentes."
  },
  {
    id: 10,
    title: "Antera: El Lenguaje de las Flores como Herramienta de Comunicación",
    student: "Natalia Alcalá, Danna Chávez, Victoria Lizárraga, Sarai Marines",
    tutor: "Mariel García Hernández",
    year: 2025,
    semester: "Otoño 2025",
    category: "editorial",
    categoryLabel: "EDITORIAL",
    thumbnail: "proyectos/thumbnails/antera.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1zcUhV8oRgx-hXFxn_5odwqjmnbtoGbI6",
    abstract: "El lenguaje de las flores o floriografía ha sido una herramienta de comunicación simbólica presente desde hace siglos. Este proyecto busca recuperar el lenguaje de las flores, visibilizando su presencia e importancia dentro de la cultura mexicana y en la comunicación visual, a través de una antología visual de la floriografía."
  },
  {
    id: 11,
    title: "Nodus: Ecosistema de Cuidado en Oncología Infantil",
    student: "Valeria Gómez, Jaqueline Casas, Sabrina Villaseñor",
    tutor: "Marco Vinicio Garrido Félix",
    year: 2025,
    semester: "Otoño 2025",
    category: "uiux",
    categoryLabel: "UI/UX",
    thumbnail: "proyectos/thumbnails/nodus.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1UB1hNzdQIxnHd40hS3yJwaxU4ygY2YAW",
    abstract: "Nodus es un sistema integral de acompañamiento diseñado para mejorar la experiencia de cuidado de niños con cáncer y sus familias. A través de un pastillero inteligente, una aplicación móvil y un brazalete lúdico, el proyecto busca reducir la ansiedad, los errores en la medicación y el aislamiento emocional."
  },
  {
    id: 12,
    title: "Rave Pilates: Implementación de Diseño de Servicio",
    student: "Ana Gabriela Garza, Mariana Gómez, Mariana Guerra",
    tutor: "Carlos Delgado De Roble",
    year: 2025,
    semester: "Otoño 2025",
    category: "uiux",
    categoryLabel: "UI/UX",
    thumbnail: "proyectos/thumbnails/rave.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1_lAHQLSpzIJX7_ZGdjXJ1Z49i25inir3",
    abstract: "Este proyecto presenta el rediseño integral de la página web de Rave Pilates y el desarrollo de una aplicación móvil que integra de manera innovadora pilates y nutrición personalizada. La app unifica reserva de clases, compra de paquetes y seguimiento de entrenamiento, junto con una guía nutricional inteligente potenciada por IA."
  },
  {
    id: 13,
    title: "Turnout: Conectando a la Generación Z",
    student: "Alejandra Urteaga, Maadai Salazar",
    tutor: "Natalia Ceballos Gutiérrez",
    year: 2025,
    semester: "Otoño 2025",
    category: "branding",
    categoryLabel: "BRANDING",
    thumbnail: "proyectos/thumbnails/turnout.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=14QYLdsddVEncTWAyg9F3cbhXwySmcmRj",
    abstract: "Turnout es una plataforma diseñada para la Generación Z que busca fomentar la conexión, el bienestar y el autoconocimiento. El proyecto desarrolla una identidad de marca, estrategia de comunicación y herramientas digitales orientadas a crear experiencias significativas de reconexión personal y social."
  },
  {
    id: 14,
    title: "Diseño de Sistemas de Comunicación para Preparación y Respuesta ante Desastres",
    student: "Miranda Hernández, Luis Alberto Peña, Miguel Ángel Maldonado",
    tutor: "Hisa María Martínez Nimi",
    year: 2025,
    semester: "Otoño 2025",
    category: "uiux",
    categoryLabel: "UI/UX",
    thumbnail: "proyectos/thumbnails/diseo-de-sistemas-de-comunicacion.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1OGM6BzjpnoK-3lSCyK5LMU0fNlUwFDn9",
    abstract: "This project demonstrates that it is possible to design communication systems capable of adapting to multiple users and contexts, overcoming informational barriers, and strengthening response capacity in the early and most critical moments of an emergency."
  },
  {
    id: 15,
    title: "Verdad en Juego: Diseño Gráfico Aplicado al Fenómeno de las Cámaras de Eco",
    student: "Fernanda Díaz, Miranda Siller, Eugenio Nocedal, Karina Del Prado",
    tutor: "Jorge Cantú Sánchez",
    year: 2025,
    semester: "Otoño 2025",
    category: "editorial",
    categoryLabel: "EDITORIAL",
    thumbnail: "proyectos/thumbnails/verdad-en-juego.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1oWVlmCvdJfZfInP-uSjiEii7gZDflc99",
    abstract: "Este proyecto propone una estrategia visual y lúdica para sensibilizar a los jóvenes de la Generación Z sobre el impacto de las cámaras de eco y los algoritmos en la percepción de la información. Se diseñó 'Twist & Tell', un juego de mesa que simula un feed de redes sociales y reta al jugador a distinguir entre información verídica y distorsionada."
  },
  {
    id: 16,
    title: "Biodiseño Gráfico: Co-creación con la Naturaleza para una Gráfica Regenerativa",
    student: "Sofía Porto Iannuzzi",
    tutor: "Iliana María Moreno Guzmán",
    year: 2025,
    semester: "Otoño 2025",
    category: "packaging",
    categoryLabel: "PACKAGING",
    thumbnail: "proyectos/thumbnails/biodiseo.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1mV0ueQ1NaF3pHgTcbUT_reDx1tpwzYo0",
    abstract: "Este proyecto explora el potencial del biodiseño como una rama emergente para el desarrollo de materialidades y procesos dentro del diseño gráfico, enfocándose en la domesticación de raíces como técnica de co-creación con organismos vivos. El proyecto demuestra que el diseño gráfico puede expandirse hacia prácticas multiespecie y regenerativas."
  },
  {
    id: 17,
    title: "Colección by Habits",
    student: "Ana Cecilia Moreno, Ana Paula Guerra, Mariana Zambrano",
    tutor: "Sergio Trujillo Pérez",
    year: 2025,
    semester: "Otoño 2025",
    category: "packaging",
    categoryLabel: "PACKAGING",
    thumbnail: "proyectos/thumbnails/habits.jpg",
    pdfUrl: "https://drive.google.com/uc?export=download&id=1YqUcSRr6pX5j9f8vzDEzhqkTYEgevOoM",
    abstract: "Colección by Habits incentiva a los usuarios a diversificar la manera en que consumen proteína en polvo. La propuesta integra una página web, un recetario físico con 90 recetas y una estrategia de campaña basada en diseño centrado en el usuario y la teoría del hábito, reforzando los valores de bienestar, simplicidad y comunidad."
  }
];

// ---- STATE ----
let activeCategory = 'all';
let activeYear = 'all';
let currentPage = 0;
function getItemsPerPage() {
  const w = window.innerWidth;
  if (w >= 1400) return 8;  // 4 cols × 2 rows
  if (w >= 1100) return 6;  // 3 cols × 2 rows
  return 4;                 // 2 cols × 2 rows
}

// ---- ACCESSIBILITY FLAGS ----
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- MOTION · CONTRATO v2 (DESIGN.md) ----
// Capa 1: sin JS todo visible (la clase .js gatea los estados ocultos;
// también la añade un inline en <head> para evitar FOUC).
document.documentElement.classList.add('js');
// Capa 3 solo si GSAP cargó; con reduced-motion al cargar, la rama IO
// ya entrega el estado final directo (cero animación GSAP).
const MESA_GSAP = !!(window.gsap && window.ScrollTrigger && !reduceMotion);
// Hooks que instala la capa GSAP. null => fallback IO (capa 2).
let gsapCardBinder = null;   // (cards) => void · marcos de ficha vía ScrollTrigger
let gsapFlipCapture = null;  // () => FlipState · antes del re-render de galería
let gsapFlipPlay = null;     // (state) => void · después del re-render
let suppressFlip = false;    // re-render por resize: sin Flip

// ---- HTML ESCAPING (datos de Firebase / dinámicos) ----
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return String(text == null ? '' : text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Los links "compartir" de Drive son páginas HTML, no imágenes; un <img> no
// puede pintarlos. Se convierten al endpoint de imagen de Drive al renderizar.
function normalizeThumbUrl(url) {
  if (!url) return url;
  const m = String(url).match(/drive\.google\.com\/(?:file\/d\/([\w-]{20,})|open\?id=([\w-]{20,})|uc\?[^"' ]*id=([\w-]{20,}))/);
  const id = m && (m[1] || m[2] || m[3]);
  return id ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1600' : url;
}

// ---- DOM ELEMENTS ----
const navBurger = document.getElementById('navBurger');
const menu = document.getElementById('menu');
const menuLinks = document.querySelectorAll('.menu__link');
const galleryGrid = document.getElementById('galleryGrid');
const categoryFilters = document.getElementById('categoryFilters');
const yearFilters = document.getElementById('yearFilters');
const projectCount = document.getElementById('projectCount');
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

// ============================================
// MOTION · Sistema "Mesa de Revisión"
// Un solo IntersectionObserver: añade .in y dispara
// contadores, luego unobserve. Las coreografías viven
// en CSS con delays; JS solo reparte .in.
// ============================================
function fmtCount(v, dec, group) {
  if (dec) return v.toFixed(dec);
  const n = Math.round(v);
  return group ? n.toLocaleString('en-US') : String(n);
}

function runCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
  const group = el.getAttribute('data-group') === '1';
  if (reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = fmtCount(target, dec, group);
    return;
  }
  const dur = 1400;
  let t0 = null;
  function step(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 5); // easeOutQuint
    el.textContent = fmtCount(target * e, dec, group);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = fmtCount(target, dec, group);
  }
  requestAnimationFrame(step);
}

let mesaIO = null;

function revealNow(el) {
  el.classList.add('in');
  el.querySelectorAll('[data-count]').forEach(runCounter);
}

function ioObserve(el) {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealNow(el);
    return;
  }
  if (!mesaIO) {
    mesaIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        revealNow(en.target);
        mesaIO.unobserve(en.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
  }
  mesaIO.observe(el);
}

function initMotion() {
  document.querySelectorAll('[data-io]').forEach(ioObserve);
}

// ============================================
// MOTION · CAPA 3 (GSAP) · contrato v2 de DESIGN.md
// ScrollSmoother + SplitText + scrubs de delineante +
// pin IMCO + Flip en galería + DrawSVG + ScrambleText.
// El módulo IO de arriba queda como fallback (capa 2).
// ============================================
function initGsapMotion() {
  gsap.registerPlugin(ScrollTrigger);
  [window.ScrollSmoother, window.SplitText, window.DrawSVGPlugin, window.Flip, window.ScrambleTextPlugin]
    .forEach((p) => { if (p) gsap.registerPlugin(p); });

  const mm = gsap.matchMedia();
  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)'
  }, (ctx) => {
    if (ctx.conditions.reduce) {
      // Reduced motion: cero animación GSAP, estado final directo
      gsapCardBinder = null;
      gsapFlipCapture = null;
      gsapFlipPlay = null;
      document.querySelectorAll('[data-io]').forEach(revealNow);
      document.querySelectorAll('.thesis-card').forEach(revealNow);
      const hb = document.querySelector('.hero-body');
      if (hb) hb.classList.add('in');
      return;
    }
    return buildMesaGsap(ctx);
  });
}

function buildMesaGsap(ctx) {
  const EASE = 'quint.out';
  const root = document.documentElement;
  // pointer coarse => sin pins, sin smoother, reveals one-shot (coreografía CSS)
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const cleanups = [];
  let alive = true;

  root.classList.add('ts-gsap');
  cleanups.push(() => root.classList.remove('ts-gsap'));

  // ---------- ScrollSmoother (solo pointer fine) ----------
  let smoother = null;
  const topline = document.getElementById('nav');
  const topH = () => (topline ? topline.offsetHeight : 52);

  if (finePointer && window.ScrollSmoother) {
    const setToplineH = () => root.style.setProperty('--topline-h', topH() + 'px');
    setToplineH();
    root.classList.add('ts-smooth');
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: true
    });
    const onSmoothResize = () => setToplineH();
    window.addEventListener('resize', onSmoothResize);
    cleanups.push(() => {
      window.removeEventListener('resize', onSmoothResize);
      if (smoother) smoother.kill();
      root.classList.remove('ts-smooth');
      root.style.removeProperty('--topline-h');
    });

    // Anclas y deep-links con offset del topline
    const anchorScroll = (target, smooth) => {
      const y = Math.max(0, smoother.offset(target, 'top top') - topH() - 12);
      smoother.scrollTo(y, smooth);
    };
    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      let target = null;
      try { target = document.querySelector(href); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      anchorScroll(target, true);
      if (history.pushState) history.pushState(null, '', href);
    };
    document.addEventListener('click', onAnchorClick);
    cleanups.push(() => document.removeEventListener('click', onAnchorClick));

    // Hash al cargar: también vía smoother
    const applyHash = () => {
      if (!location.hash) return;
      let target = null;
      try { target = document.querySelector(location.hash); } catch (err) { return; }
      if (target) anchorScroll(target, false);
    };

    // Al abrir cualquier modal/gate/menú: smoother.paused(true); al cerrar: false
    const overlayIds = ['pefGate', 'pefTalks', 'pefTable', 'pefAdminGate', 'pefRegister',
      'pefFeedback', 'menu', 'modal', 'adminPanel', 'adminProjectForm',
      'adminAwardForm', 'adminGate', 'pdfViewer'];
    const overlays = overlayIds.map((id) => document.getElementById(id)).filter(Boolean);
    const syncPaused = () => {
      if (smoother) smoother.paused(overlays.some((el) => el.classList.contains('open')));
    };
    const overlayMo = new MutationObserver(syncPaused);
    overlays.forEach((el) => overlayMo.observe(el, { attributes: true, attributeFilter: ['class'] }));
    syncPaused();
    cleanups.push(() => overlayMo.disconnect());

    // Refresh al cargar todo (imágenes) + hash inicial
    const onLoaded = () => { ScrollTrigger.refresh(); applyHash(); };
    if (document.readyState === 'complete') {
      requestAnimationFrame(onLoaded);
    } else {
      window.addEventListener('load', onLoaded);
      cleanups.push(() => window.removeEventListener('load', onLoaded));
    }
  }

  // ---------- Barra de control: chips CMYK + cruz de registro + leyenda ----------
  const ruler = document.querySelector('.ruler');
  if (ruler) {
    const chips = ruler.querySelectorAll('.ink');
    const regParts = ruler.querySelectorAll('.reg circle, .reg path');
    const tlRuler = gsap.timeline({ defaults: { ease: EASE } });
    if (chips.length) tlRuler.from(chips, { opacity: 0, y: 5, duration: .45, stagger: .07 }, .1);
    if (regParts.length && window.DrawSVGPlugin) {
      tlRuler.from(regParts, { drawSVG: 0, duration: .6, stagger: .12 }, .3);
    }
    // ScrambleText SOLO en la leyenda, ≤0.8s
    const leg = ruler.querySelector('.leg');
    if (leg && window.ScrambleTextPlugin && leg.firstChild && leg.firstChild.nodeType === 3) {
      const legSpan = document.createElement('span');
      const legText = leg.firstChild.textContent;
      legSpan.textContent = legText;
      leg.replaceChild(legSpan, leg.firstChild);
      tlRuler.to(legSpan, { duration: .8, scrambleText: { text: legText, chars: 'upperCase', speed: .4 } }, .15);
    }
  }

  // ---------- Hero: H1 SplitText por chars (una sola vez, al cargar) ----------
  const h1 = document.querySelector('#hero h1');
  const heroBody = document.querySelector('.hero-body');
  let splitH1 = null;
  const splitHeads = [];
  const useSplit = !!window.SplitText;
  // SplitText siempre tras document.fonts.ready
  const fontsReady = (document.fonts && document.fonts.ready)
    ? document.fonts.ready
    : Promise.resolve();

  if (h1 && useSplit) {
    fontsReady.then(() => {
      if (!alive) return;
      ctx.add(() => {
        splitH1 = new SplitText(h1, { type: 'chars', charsClass: 'h1-char' });
        gsap.set(splitH1.chars, { yPercent: 112 });
        gsap.set(h1.querySelectorAll('.ln i'), { y: 0, transition: 'none' });
        const tlH1 = gsap.timeline({ defaults: { ease: EASE } });
        tlH1.to(splitH1.chars, { yPercent: 0, duration: .9, stagger: .02 }, .1);
        const hl = h1.querySelector('.hl');
        if (hl) {
          // la banda .hl anima su background-size después del split
          tlH1.fromTo(hl, { backgroundSize: '0% .84em' },
            { backgroundSize: '100% .84em', duration: .7 }, '-=.35');
        }
        ScrollTrigger.refresh();
      });
    });
  } else if (heroBody) {
    heroBody.classList.add('in'); // sin SplitText: coreografía CSS
  }

  // ---------- h2 de secciones: SplitText por líneas con mask al entrar ----------
  if (useSplit) {
    fontsReady.then(() => {
      if (!alive) return;
      ctx.add(() => {
        document.querySelectorAll('.sec-head').forEach((head) => {
          const h2 = head.querySelector('h2');
          if (!h2) return;
          gsap.set(head, { opacity: 1, y: 0, transition: 'none' });
          head.classList.add('in');
          const split = new SplitText(h2, { type: 'lines', mask: 'lines', linesClass: 'h2-line' });
          splitHeads.push(split);
          gsap.set(split.lines, { yPercent: 110 });
          const chip = head.querySelector('.sec-no');
          const tlHead = gsap.timeline({
            defaults: { ease: EASE },
            scrollTrigger: { trigger: head, start: 'top 85%', once: true }
          });
          if (chip) tlHead.from(chip, { opacity: 0, y: 10, duration: .5 }, 0);
          tlHead.to(split.lines, { yPercent: 0, duration: .8, stagger: .1 }, .05);
        });
        ScrollTrigger.refresh();
      });
    });
  }

  // ---------- Sello VoBo del cajetín: estampado -6deg con settle ----------
  const vobo = document.querySelector('#hero .rev-stamp');
  if (vobo) {
    gsap.set(vobo, { transition: 'none' });
    gsap.fromTo(vobo,
      { opacity: 0, scale: 1.16, rotation: -1 },
      { opacity: 1, scale: 1, rotation: -6, duration: .5, ease: EASE, delay: .95 });
  }

  // ---------- Cota del hero: scrub de delineante (fine) ----------
  const cota = document.querySelector('#hero .cota');
  if (cota && finePointer) {
    const cLine = cota.querySelector('.c-line');
    const cTicks = cota.querySelectorAll('.c-tick');
    const cLbl = cota.querySelector('.lbl');
    gsap.set([cLine, cLbl], { transition: 'none' });
    gsap.set(cTicks, { transition: 'none' });
    const tlCota = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=420', scrub: 1 }
    });
    tlCota.fromTo(cLine, { scaleX: 0 }, { scaleX: 1, duration: .7 }, 0)
      .fromTo(cTicks, { scaleY: 0 }, { scaleY: 1, duration: .14, stagger: .05 }, .66)
      .fromTo(cLbl, { opacity: 0 }, { opacity: 1, duration: .18 }, .82);
  }

  // ---------- drawx: trazo con scrub (fine); los de #datos van en el pin ----------
  const datos = document.getElementById('datos');
  if (finePointer) {
    document.querySelectorAll('.drawx').forEach((dx) => {
      if (datos && datos.contains(dx)) return;
      gsap.set(dx, { transition: 'none' });
      gsap.fromTo(dx, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: dx, start: 'top 88%', end: 'top 55%', scrub: 1 }
      });
    });
  }

  // ---------- PIN IMCO: #datos anclado, filas que se trazan y cuentan ----------
  if (datos && finePointer) {
    const rows = Array.from(datos.querySelectorAll('.data-row'));
    const lines = Array.from(datos.querySelectorAll('.drawx'));
    const sub = datos.querySelector('.sec-sub');
    const note = datos.querySelector('.data-note p');

    if (sub) gsap.set(sub, { opacity: 0, y: 14, transition: 'none' });
    if (note) gsap.set(note, { opacity: 0, y: 14, transition: 'none' });
    gsap.set(rows, { opacity: 0, y: 18, transition: 'none' });
    gsap.set(lines, { scaleX: 0, transition: 'none' });

    const tlPin = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: datos,
        start: 'top top',
        end: '+=1400',
        pin: true,
        scrub: 1
      }
    });

    if (sub) tlPin.to(sub, { opacity: 1, y: 0, duration: .3 }, 0);
    if (lines[0]) tlPin.to(lines[0], { scaleX: 1, duration: .5 }, .05);

    rows.forEach((row, i) => {
      const at = .7 + i * 1.05;
      tlPin.to(row, { opacity: 1, y: 0, duration: .45 }, at);
      const cEl = row.querySelector('[data-count]');
      if (cEl) {
        const target = parseFloat(cEl.getAttribute('data-count'));
        const dec = parseInt(cEl.getAttribute('data-dec') || '0', 10);
        const group = cEl.getAttribute('data-group') === '1';
        const proxy = { v: 0 };
        tlPin.to(proxy, {
          v: target,
          duration: .8,
          onUpdate: () => { cEl.textContent = fmtCount(proxy.v, dec, group); },
          // el contador cierra SIEMPRE en el valor exacto
          onComplete: () => { cEl.textContent = fmtCount(target, dec, group); }
        }, at + .15);
      }
      if (lines[i + 1]) tlPin.to(lines[i + 1], { scaleX: 1, duration: .4 }, at + .55);
    });
    if (note) tlPin.to(note, { opacity: 1, y: 0, duration: .4 }, '>-.2');
  }

  // ---------- Fichas de galería: marco trazado con scrub (fine) / one-shot (coarse) ----------
  let cardAnims = [];
  const killCardAnims = () => {
    cardAnims.forEach((a) => {
      if (a.scrollTrigger) a.scrollTrigger.kill();
      a.kill();
    });
    cardAnims = [];
  };

  const bindCards = (cards) => {
    killCardAnims();
    cards.forEach((card) => {
      if (finePointer) {
        const ft = card.querySelector('.f-t');
        const fr = card.querySelector('.f-r');
        const fb = card.querySelector('.f-b');
        const fl = card.querySelector('.f-l');
        const corners = card.querySelectorAll('.corner');
        const inner = card.querySelector('.inner');
        if (!ft || !fr || !fb || !fl || !inner) return;
        gsap.set([ft, fr, fb, fl, inner], { transition: 'none' });
        gsap.set(corners, { transition: 'none' });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 45%', scrub: 1 }
        });
        tl.fromTo(ft, { scaleX: 0 }, { scaleX: 1, duration: .22 }, 0)
          .fromTo(fr, { scaleY: 0 }, { scaleY: 1, duration: .22 }, .18)
          .fromTo(fb, { scaleX: 0 }, { scaleX: 1, duration: .22 }, .36)
          .fromTo(fl, { scaleY: 0 }, { scaleY: 1, duration: .22 }, .54)
          .fromTo(corners, { opacity: 0 }, { opacity: 1, duration: .12 }, .7)
          .fromTo(inner, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .28, ease: EASE }, .66);
        cardAnims.push(tl);
      } else {
        // coarse: one-shot con la coreografía CSS del sistema
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          once: true,
          onEnter: () => revealNow(card)
        });
        cardAnims.push(st);
      }
    });
  };
  gsapCardBinder = bindCards;
  bindCards(galleryGrid.querySelectorAll('.thesis-card'));
  cleanups.push(() => { gsapCardBinder = null; killCardAnims(); });

  // ---------- Flip en galería (filtros y paginación) ----------
  if (window.Flip) {
    gsapFlipCapture = () => Flip.getState(galleryGrid.querySelectorAll('.thesis-card'));
    gsapFlipPlay = (state) => {
      if (!state || !state.targets || !state.targets.length) {
        ScrollTrigger.refresh();
        return;
      }
      Flip.from(state, {
        targets: galleryGrid.querySelectorAll('.thesis-card'),
        duration: .6,
        ease: EASE,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: EASE }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: .3, ease: EASE }),
        onComplete: () => ScrollTrigger.refresh()
      });
    };
    cleanups.push(() => { gsapFlipCapture = null; gsapFlipPlay = null; });
  }

  // ---------- Sello del premio: DrawSVG del aro + estampado 1.15→1 ----------
  const prizeStamp = document.querySelector('.vitrina .stamp');
  if (prizeStamp) {
    const rings = prizeStamp.querySelectorAll('circle');
    const texts = prizeStamp.querySelectorAll('text');
    gsap.set(prizeStamp, { transition: 'none' });
    const tlStamp = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: prizeStamp, start: 'top 85%', once: true }
    });
    tlStamp.fromTo(prizeStamp,
      { opacity: 0, scale: 1.15, rotation: -8 },
      { opacity: 1, scale: 1, rotation: -8, duration: .42 }, 0);
    if (rings.length && window.DrawSVGPlugin) {
      tlStamp.from(rings, { drawSVG: 0, duration: .7, stagger: .12 }, .12);
    }
    if (texts.length) tlStamp.from(texts, { opacity: 0, duration: .4 }, .5);
  }

  // ---------- Magnetic sutil ±6px: solo el CTA principal a trayectoria ----------
  if (finePointer) {
    const ctaBtn = document.querySelector('#trayectoriaCta .btn');
    if (ctaBtn) {
      const prevTransition = ctaBtn.style.transition;
      ctaBtn.style.transition = 'box-shadow .15s var(--ease)';
      const xTo = gsap.quickTo(ctaBtn, 'x', { duration: .4, ease: EASE });
      const yTo = gsap.quickTo(ctaBtn, 'y', { duration: .4, ease: EASE });
      const onMove = (e) => {
        const r = ctaBtn.getBoundingClientRect();
        const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 6;
        const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 6;
        xTo(Math.max(-6, Math.min(6, dx)));
        yTo(Math.max(-6, Math.min(6, dy)));
      };
      const onLeave = () => { xTo(0); yTo(0); };
      ctaBtn.addEventListener('pointermove', onMove);
      ctaBtn.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        ctaBtn.removeEventListener('pointermove', onMove);
        ctaBtn.removeEventListener('pointerleave', onLeave);
        ctaBtn.style.transition = prevTransition;
      });
    }
  }

  // ---------- Reveals genéricos: la coreografía CSS del sistema, vía ScrollTrigger ----------
  const special = new Set();
  if (heroBody) special.add(heroBody);
  if (vobo) special.add(vobo);
  if (prizeStamp) special.add(prizeStamp);
  if (cota && finePointer) special.add(cota);
  if (useSplit) document.querySelectorAll('.sec-head[data-io]').forEach((el) => special.add(el));
  if (finePointer) {
    document.querySelectorAll('.drawx[data-io]').forEach((el) => special.add(el));
    if (datos) {
      datos.querySelectorAll('[data-io]').forEach((el) => {
        if (!el.classList.contains('sec-head')) special.add(el);
      });
    }
  }
  document.querySelectorAll('[data-io]').forEach((el) => {
    if (special.has(el) || el.classList.contains('thesis-card')) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => revealNow(el)
    });
  });

  // refresh general cuando carga todo (también sin smoother)
  if (!smoother) {
    const onLoadedPlain = () => ScrollTrigger.refresh();
    if (document.readyState !== 'complete') {
      window.addEventListener('load', onLoadedPlain);
      cleanups.push(() => window.removeEventListener('load', onLoadedPlain));
    }
  }

  // ---------- limpieza del contexto (gsap.matchMedia revierte sus tweens) ----------
  return () => {
    alive = false;
    if (splitH1) { splitH1.revert(); splitH1 = null; }
    splitHeads.forEach((s) => s.revert());
    splitHeads.length = 0;
    cleanups.forEach((fn) => fn());
  };
}

// ============================================
// LÁMINA AUDIOVISUAL · Vimeo bajo demanda
// (poster como fallback; el video solo carga y suena
// tras la acción del usuario; sin autoplay con sonido)
// ============================================
function initVideoLamina() {
  const poster = document.getElementById('videoPoster');
  const frame = document.getElementById('videoLamina');
  if (!poster || !frame) return;
  poster.addEventListener('click', (e) => {
    e.preventDefault();
    const iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/1160882204?autoplay=1&badge=0&app_id=58479';
    iframe.className = 'lamina__video';
    iframe.title = 'BioDiseño x Sofía Porto · PEF session Otoño 2025';
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    frame.innerHTML = '';
    frame.appendChild(iframe);
  });
}


// ---- NAVIGATION ----
function syncBurgerExpanded() {
  navBurger.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
}

navBurger.addEventListener('click', () => {
  navBurger.classList.toggle('active');
  menu.classList.toggle('open');
  document.body.classList.toggle('menu-open');
  syncBurgerExpanded();
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('active');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    syncBurgerExpanded();
  });
});

// ---- RENDER GALLERY ----
function getFilteredTheses() {
  return theses.filter(t => {
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    const yearMatch = activeYear === 'all' || t.year === parseInt(activeYear);
    return catMatch && yearMatch;
  });
}

function getTotalPages(filtered) {
  return Math.ceil(filtered.length / getItemsPerPage());
}

function renderGallery(animate = true) {
  // Capa GSAP · Flip: captura el estado del layout antes del re-render
  const flipState = (!suppressFlip && gsapFlipCapture) ? gsapFlipCapture() : null;

  const filtered = getFilteredTheses();
  const totalPages = getTotalPages(filtered);

  // Clamp current page
  if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);

  const start = currentPage * getItemsPerPage();
  const pageItems = filtered.slice(start, start + getItemsPerPage());

  galleryGrid.innerHTML = '';

  pageItems.forEach((thesis, i) => {
    const card = document.createElement('div');
    card.className = 'thesis-card';
    card.dataset.flipId = 'tesis-' + thesis.id;
    if (animate) {
      card.style.animationDelay = `${i * 0.1}s`;
    } else {
      card.style.animation = 'none';
      card.style.opacity = '1';
      card.style.transform = 'none';
    }

    card.innerHTML = `
      <span class="frame" aria-hidden="true"><i class="f-t"></i><i class="f-r"></i><i class="f-b"></i><i class="f-l"></i></span>
      <i class="corner c-tl" aria-hidden="true"></i><i class="corner c-br" aria-hidden="true"></i>
      <div class="inner">
        <div class="fhead">
          <span class="fno">Ficha Nº ${String(start + i + 1).padStart(2, '0')}</span>
          <span class="fcat">${escapeHtml(thesis.categoryLabel)}</span>
          <span class="fyr">${escapeHtml(thesis.year)}</span>
        </div>
        <div class="fbody">
          <figure class="thesis-card__image">
            <img src="${escapeAttr(normalizeThumbUrl(thesis.thumbnail))}" alt="" class="thesis-card__thumbnail" loading="lazy">
          </figure>
          <div class="thesis-card__info">
            <h3 class="thesis-card__title">${escapeHtml(thesis.title)}</h3>
            <dl class="fmeta">
              <dt>Estudiantes</dt><dd>${escapeHtml(thesis.student)}</dd>
              <dt>Tutor</dt><dd class="soft">${escapeHtml(thesis.tutor)}</dd>
            </dl>
            <span class="fopen mono" aria-hidden="true">Ver ficha &rarr;</span>
          </div>
        </div>
      </div>
    `;

    // Acceso por teclado: la tarjeta actúa como botón
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver proyecto: ${thesis.title}`);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(thesis, card);
      }
    });

    card.addEventListener('click', () => openModal(thesis, card));
    galleryGrid.appendChild(card);
  });

  // Update counters and arrows
  projectCount.textContent = `${filtered.length} PROYECTO${filtered.length !== 1 ? 'S' : ''}`;
  const pageIndicator = document.getElementById('pageIndicator');
  if (pageIndicator) pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;

  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  if (prevBtn) prevBtn.disabled = currentPage === 0;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;

  // Motion del sistema: el marco de cada ficha se traza al entrar en viewport.
  // Capa GSAP si está activa; si no, el IO de la capa 2.
  const cards = galleryGrid.querySelectorAll('.thesis-card');
  if (gsapCardBinder) gsapCardBinder(cards);
  else cards.forEach(ioObserve);

  // Capa GSAP · Flip: anima del estado previo al nuevo layout
  if (flipState && gsapFlipPlay) gsapFlipPlay(flipState);
}

function slideGallery(direction) {
  const filtered = getFilteredTheses();
  const totalPages = getTotalPages(filtered);
  const newPage = currentPage + direction;

  if (newPage < 0 || newPage >= totalPages) return;

  // Capa GSAP: el cambio de página lo anima Flip dentro de renderGallery
  if (gsapFlipCapture && gsapFlipPlay) {
    currentPage = newPage;
    renderGallery(false);
    return;
  }

  // Slide out
  galleryGrid.classList.add('sliding-out');

  setTimeout(() => {
    currentPage = newPage;
    renderGallery(false);
    galleryGrid.classList.remove('sliding-out');
    galleryGrid.classList.add('sliding-in');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        galleryGrid.classList.remove('sliding-in');
      });
    });
  }, 300);
}

// ---- FILTERS ----
categoryFilters.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  categoryFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeCategory = e.target.dataset.filter;
  currentPage = 0;
  renderGallery();
});

yearFilters.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  yearFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeYear = e.target.dataset.year;
  currentPage = 0;
  renderGallery();
});

// ---- GALLERY ARROWS ----
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  if (prevBtn) prevBtn.addEventListener('click', () => slideGallery(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => slideGallery(1));

  // Re-render gallery on resize to adapt items per page
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      suppressFlip = true;
      renderGallery(false);
      suppressFlip = false;
    }, 200);
  });
});

// ---- MODAL ----
// Elemento (tarjeta) que abrió el modal, para devolverle el foco al cerrar
let modalOriginEl = null;

function openModal(thesis, originEl) {
  document.getElementById('modalCover').innerHTML = `<img src="${escapeAttr(normalizeThumbUrl(thesis.thumbnail))}" alt="${escapeAttr(thesis.title)}" style="width:100%;height:100%;object-fit:cover;">`;
  document.getElementById('modalCategory').textContent = thesis.categoryLabel;
  document.getElementById('modalTitle').textContent = thesis.title;
  document.getElementById('modalStudent').textContent = thesis.student;
  document.getElementById('modalTutor').textContent = thesis.tutor;
  document.getElementById('modalYear').textContent = thesis.year;
  const modalSemester = document.getElementById('modalSemester');
  if (modalSemester) modalSemester.textContent = thesis.semester || thesis.year;
  document.getElementById('modalAbstract').textContent = thesis.abstract;
  modal.setAttribute('aria-label', thesis.title);

  // Clear gallery section
  const galleryEl = document.getElementById('modalGallery');
  galleryEl.innerHTML = '';

  // PDF download functionality
  const modalDownload = document.getElementById('modalDownload');
  if (modalDownload) {
    modalDownload.onclick = () => {
      const link = document.createElement('a');
      link.href = thesis.pdfUrl;
      link.download = '';
      link.click();
      // Feedback al usuario mientras el navegador abre el PDF
      const label = modalDownload.querySelector('span:first-child');
      if (label) {
        label.textContent = 'ABRIENDO…';
        setTimeout(() => { label.textContent = 'DESCARGAR PDF'; }, 1500);
      }
    };
  }

  modalOriginEl = originEl || null;
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  if (modalOriginEl && document.contains(modalOriginEl)) {
    modalOriginEl.focus();
  }
  modalOriginEl = null;
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Trampa de foco simple dentro del modal
modal.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab' || !modal.classList.contains('open')) return;
  const focusables = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    if (menu.classList.contains('open')) {
      navBurger.classList.remove('active');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      syncBurgerExpanded();
    }
  }
});

// ============================================
// ADMIN AUTH · Firebase Authentication
// La autorización real vive en las reglas del RTDB (database.rules.json):
// solo los UID listados en /admins pueden escribir. Este módulo solo
// gestiona la sesión y el estado de UI.
// ============================================
const fbAuth = firebase.auth();
let isAdminUser = false;
const adminStateListeners = [];

function onAdminStateChange(fn) { adminStateListeners.push(fn); }

fbAuth.onAuthStateChanged(async (user) => {
  let admin = false;
  if (user && !user.isAnonymous) {
    try {
      const snap = await db.ref('admins/' + user.uid).get();
      admin = snap.val() === true;
    } catch (err) {
      admin = false;
    }
  }
  isAdminUser = admin;
  adminStateListeners.forEach(fn => fn(admin));
});

async function adminSignIn(email, password) {
  const cred = await fbAuth.signInWithEmailAndPassword(email.trim(), password);
  const snap = await db.ref('admins/' + cred.user.uid).get();
  if (snap.val() !== true) {
    await fbAuth.signOut();
    const err = new Error('Cuenta sin permisos de administrador');
    err.code = 'app/not-admin';
    throw err;
  }
  isAdminUser = true;
  return cred.user;
}

function adminAuthErrorMessage(err) {
  switch (err && err.code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return '⚠ Correo o contraseña incorrectos';
    case 'auth/invalid-email':
      return '⚠ Correo inválido';
    case 'auth/too-many-requests':
      return '⚠ Demasiados intentos. Espera unos minutos';
    case 'auth/configuration-not-found':
    case 'auth/operation-not-allowed':
      return '⚠ Firebase Auth no está habilitado en el proyecto (ver SEGURIDAD-FIREBASE.md)';
    case 'app/not-admin':
      return '⚠ Esta cuenta no tiene permisos de administrador';
    default:
      return '⚠ No se pudo iniciar sesión. Revisa tu conexión';
  }
}

// Sesión anónima para que los formularios públicos (feedback) puedan
// escribir bajo las reglas que exigen auth != null. Si Auth aún no está
// habilitado en el proyecto, seguimos sin sesión: la escritura queda en
// manos de las reglas vigentes (permite publicar código y reglas en
// cualquier orden sin romper el formulario).
async function ensureAnonSession() {
  if (fbAuth.currentUser) return;
  try {
    await fbAuth.signInAnonymously();
  } catch (err) {
    console.warn('Sesión anónima no disponible:', err && err.code);
  }
}

// ============================================
// PEF TALKS · Full System
// ============================================
function initPefTalks() {
  // ---- DOM Elements ----
  const pefBtn = document.getElementById('pefBtn');
  const menuPefLink = document.getElementById('menuPefLink');
  // Email gate
  const pefGate = document.getElementById('pefGate');
  const pefGateBackdrop = document.getElementById('pefGateBackdrop');
  const pefGateClose = document.getElementById('pefGateClose');
  const pefGateForm = document.getElementById('pefGateForm');
  const pefEmail = document.getElementById('pefEmail');
  const pefError = document.getElementById('pefError');
  // PEF Talks main
  const pefTalks = document.getElementById('pefTalks');
  const pefTalksBackdrop = document.getElementById('pefTalksBackdrop');
  const pefTalksClose = document.getElementById('pefTalksClose');
  const pefProjectsGrid = document.getElementById('pefProjectsGrid');
  const pefEmpty = document.getElementById('pefEmpty');
  const pefAddBtn = document.getElementById('pefAddBtn');
  // Admin gate
  const pefAdminGate = document.getElementById('pefAdminGate');
  const pefAdminGateBackdrop = document.getElementById('pefAdminGateBackdrop');
  const pefAdminGateClose = document.getElementById('pefAdminGateClose');
  const pefAdminForm = document.getElementById('pefAdminForm');
  const pefAdminEmail = document.getElementById('pefAdminEmail');
  const pefAdminPass = document.getElementById('pefAdminPass');
  const pefAdminError = document.getElementById('pefAdminError');
  // Register form
  const pefRegister = document.getElementById('pefRegister');
  const pefRegisterBackdrop = document.getElementById('pefRegisterBackdrop');
  const pefRegisterClose = document.getElementById('pefRegisterClose');
  const pefRegisterForm = document.getElementById('pefRegisterForm');
  const pefRegisterError = document.getElementById('pefRegisterError');
  // Feedback form
  const pefFeedback = document.getElementById('pefFeedback');
  const pefFeedbackBackdrop = document.getElementById('pefFeedbackBackdrop');
  const pefFeedbackClose = document.getElementById('pefFeedbackClose');
  const pefFeedbackForm = document.getElementById('pefFeedbackForm');
  const pefFeedbackTitle = document.getElementById('pefFeedbackTitle');
  const pefFbProjectId = document.getElementById('pefFbProjectId');
  // Toast
  const pefToast = document.getElementById('pefToast');

  let pefAuthenticated = sessionStorage.getItem('pefAuth') === 'true';
  let editingProjectId = null;
  // Acción admin pendiente: se ejecuta tras iniciar sesión en el gate
  let pendingAdminAction = null;

  // ---- Firebase helpers ----
  let pefProjectsCache = [];

  function getPefProjects() {
    return pefProjectsCache;
  }

  function savePefProjects(projects) {
    pefProjectsCache = projects;
    db.ref('pefProjects').set(projects).catch((err) => {
      console.error(err);
      showToast('⚠ SIN PERMISOS PARA GUARDAR. INICIA SESIÓN COMO ADMIN');
    });
  }

  function requirePefAdmin(action) {
    if (isAdminUser) { action(); return; }
    pendingAdminAction = action;
    openAdminGate();
  }

  function deletePefProject(projectId) {
    const projects = getPefProjects().filter(p => p.id !== projectId);
    savePefProjects(projects);
    renderPefProjects();
    showToast('✓ PROYECTO BORRADO');
  }

  // Listen for real-time updates
  db.ref('pefProjects').on('value', (snapshot) => {
    pefProjectsCache = snapshot.val() || [];
    if (pefTalks.classList.contains('open')) {
      renderPefProjects();
    }
  });

  // ---- Toast notification ----
  function showToast(message) {
    pefToast.textContent = message;
    pefToast.classList.add('show');
    setTimeout(() => pefToast.classList.remove('show'), 3000);
  }

  // ---- Validate UDEM email ----
  function validateUdemEmail(email) {
    const trimmed = email.trim().toLowerCase();
    return trimmed.endsWith('@udem.edu') || trimmed.endsWith('@udem.edu.mx');
  }

  // ---- Render PEF Projects ----
  function renderPefProjects() {
    const projects = getPefProjects();
    pefProjectsGrid.innerHTML = '';

    if (projects.length === 0) {
      pefEmpty.classList.remove('hidden');
      return;
    }

    pefEmpty.classList.add('hidden');

    projects.forEach((proj, i) => {
      const card = document.createElement('div');
      card.className = 'pef-talks__card';
      const posterBtn = proj.pdfUrl
        ? `<button class="pef-talks__card-poster-btn" data-pdf-url="${escapeAttr(proj.pdfUrl)}">VER POSTER</button>`
        : '';
      card.innerHTML = `
        <div class="pef-talks__card-accent"></div>
        <span class="mono-sm">PEF ${String(i + 1).padStart(2, '0')}</span>
        <button class="pef-talks__card-edit-btn" data-project-id="${escapeAttr(proj.id)}" title="Editar">&#9998;</button>
        <button class="pef-talks__card-delete-btn" data-project-id="${escapeAttr(proj.id)}" title="Borrar">&times;</button>
        <h3 class="pef-talks__card-title">${escapeHtml(proj.name)}</h3>
        <span class="pef-talks__card-members">${escapeHtml(proj.members)}</span>
        <p class="pef-talks__card-desc">${escapeHtml(proj.summary)}</p>
        <p class="pef-talks__card-problem"><strong>Problemática:</strong> ${escapeHtml(proj.problem)}</p>
        <div class="pef-talks__card-actions">
          ${posterBtn}
          <button class="pef-talks__card-feedback-btn" data-project-id="${escapeAttr(proj.id)}">DAR FEEDBACK &rarr;</button>
        </div>
      `;
      pefProjectsGrid.appendChild(card);
    });

    // Bind poster buttons
    pefProjectsGrid.querySelectorAll('.pef-talks__card-poster-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPdfViewer(e.currentTarget.dataset.pdfUrl);
      });
    });

    // Bind feedback buttons
    pefProjectsGrid.querySelectorAll('.pef-talks__card-feedback-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projectId = e.target.dataset.projectId;
        openFeedbackForm(projectId);
      });
    });

    // Bind edit buttons (requiere sesión de admin)
    pefProjectsGrid.querySelectorAll('.pef-talks__card-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = e.currentTarget.dataset.projectId;
        editingProjectId = projectId;
        requirePefAdmin(openRegisterForm);
      });
    });

    // Bind delete buttons (requiere sesión de admin + confirm)
    pefProjectsGrid.querySelectorAll('.pef-talks__card-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = e.currentTarget.dataset.projectId;
        const projects = getPefProjects();
        const proj = projects.find(p => p.id === projectId);
        if (!proj) return;
        if (!confirm(`¿Borrar "${proj.name}"? Esta acción no se puede deshacer.`)) return;
        requirePefAdmin(() => deletePefProject(projectId));
      });
    });
  }

  // ---- Poster Image Upload (compress to base64) ----
  const pefPosterInput = document.getElementById('pefProjPoster');
  const pefPosterLabel = document.getElementById('pefProjPosterLabel');
  const pefPosterClear = document.getElementById('pefProjPosterClear');
  const pefPosterPreview = document.getElementById('pefProjPosterPreview');
  const pefPosterHidden = document.getElementById('pefProjPdf');

  function setPosterPreview(dataUrl) {
    if (!pefPosterPreview) return;
    if (dataUrl) {
      pefPosterPreview.innerHTML = `<img src="${dataUrl}" alt="Preview">`;
      if (pefPosterClear) pefPosterClear.style.display = '';
    } else {
      pefPosterPreview.innerHTML = '';
      if (pefPosterClear) pefPosterClear.style.display = 'none';
    }
  }

  async function compressImage(file, maxWidth = 1600, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  if (pefPosterInput) {
    pefPosterInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (pefPosterLabel) pefPosterLabel.textContent = 'Procesando…';
      try {
        const dataUrl = await compressImage(file);
        if (pefPosterHidden) pefPosterHidden.value = dataUrl;
        setPosterPreview(dataUrl);
        if (pefPosterLabel) pefPosterLabel.textContent = file.name;
      } catch (err) {
        if (pefPosterLabel) pefPosterLabel.textContent = 'Error al procesar. Intenta otra imagen.';
        console.error(err);
      }
    });
  }

  if (pefPosterClear) {
    pefPosterClear.addEventListener('click', () => {
      if (pefPosterInput) pefPosterInput.value = '';
      if (pefPosterHidden) pefPosterHidden.value = '';
      if (pefPosterLabel) pefPosterLabel.textContent = 'Seleccionar imagen…';
      setPosterPreview('');
    });
  }

  // ---- Poster Image Viewer ----
  const pdfViewer = document.getElementById('pdfViewer');
  const pdfViewerBackdrop = document.getElementById('pdfViewerBackdrop');
  const pdfViewerClose = document.getElementById('pdfViewerClose');
  const pdfViewerImg = document.getElementById('pdfViewerImg');

  function openPdfViewer(url) {
    if (!url || !pdfViewer || !pdfViewerImg) return;
    // If base64 data URL, use as-is. If Google Drive URL, convert. Else use as-is.
    let imgUrl = url;
    if (!url.startsWith('data:')) {
      const driveMatch = url.match(/\/file\/d\/([^\/]+)/) || url.match(/[?&]id=([^&]+)/);
      if (driveMatch) {
        imgUrl = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
      }
    }
    pdfViewerImg.src = imgUrl;
    pdfViewer.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closePdfViewer() {
    if (!pdfViewer) return;
    pdfViewer.classList.remove('open');
    if (pdfViewerImg) pdfViewerImg.src = '';
    document.body.classList.remove('modal-open');
  }

  if (pdfViewerClose) pdfViewerClose.addEventListener('click', closePdfViewer);
  if (pdfViewerBackdrop) pdfViewerBackdrop.addEventListener('click', closePdfViewer);

  // ---- Open/Close functions ----
  function openPefGate() {
    if (pefAuthenticated) {
      openPefTalks();
      return;
    }
    pefGate.classList.add('open');
    document.body.classList.add('modal-open');
    pefEmail.focus();
  }

  function closePefGate() {
    pefGate.classList.remove('open');
    document.body.classList.remove('modal-open');
    pefError.textContent = '';
    pefEmail.value = '';
  }

  function openPefTalks() {
    closePefGate();
    renderPefProjects();
    pefTalks.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closePefTalks() {
    pefTalks.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function openAdminGate() {
    pefAdminGate.classList.add('open');
    pefAdminEmail.focus();
  }

  function closeAdminGate() {
    pefAdminGate.classList.remove('open');
    pefAdminError.textContent = '';
    pefAdminEmail.value = '';
    pefAdminPass.value = '';
    pendingAdminAction = null;
  }

  function openRegisterForm() {
    closeAdminGate();
    pefRegister.classList.add('open');

    // Update form title + button based on mode
    const titleEl = pefRegister.querySelector('.pef-register__title') || pefRegister.querySelector('h2');
    const submitBtn = pefRegister.querySelector('button[type="submit"]');

    if (editingProjectId) {
      const projects = getPefProjects();
      const proj = projects.find(p => p.id === editingProjectId);
      if (proj) {
        document.getElementById('pefProjName').value = proj.name || '';
        document.getElementById('pefProjMembers').value = proj.members || '';
        document.getElementById('pefProjSummary').value = proj.summary || '';
        document.getElementById('pefProjProblem').value = proj.problem || '';
        document.getElementById('pefProjEmail').value = proj.email || '';
        if (pefPosterHidden) pefPosterHidden.value = proj.pdfUrl || '';
        if (proj.pdfUrl) {
          setPosterPreview(proj.pdfUrl);
          if (pefPosterLabel) pefPosterLabel.textContent = 'Imagen actual · reemplazar';
        } else {
          setPosterPreview('');
          if (pefPosterLabel) pefPosterLabel.textContent = 'Seleccionar imagen…';
        }
      }
      if (titleEl) titleEl.textContent = 'EDITAR PROYECTO PEF';
      if (submitBtn) {
        const span = submitBtn.querySelector('span:first-child');
        if (span) span.textContent = 'GUARDAR CAMBIOS';
      }
    } else {
      pefRegisterForm.reset();
      if (pefPosterHidden) pefPosterHidden.value = '';
      setPosterPreview('');
      if (pefPosterLabel) pefPosterLabel.textContent = 'Seleccionar imagen…';
      if (titleEl) titleEl.textContent = 'DAR DE ALTA PROYECTO PEF';
      if (submitBtn) {
        const span = submitBtn.querySelector('span:first-child');
        if (span) span.textContent = 'REGISTRAR PROYECTO';
      }
    }
  }

  function closeRegisterForm() {
    pefRegister.classList.remove('open');
    pefRegisterForm.reset();
    if (pefPosterHidden) pefPosterHidden.value = '';
    setPosterPreview('');
    if (pefPosterLabel) pefPosterLabel.textContent = 'Seleccionar imagen…';
    pefRegisterError.textContent = '';
    editingProjectId = null;
  }

  function openFeedbackForm(projectId) {
    const projects = getPefProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    pefFeedbackTitle.textContent = project.name;
    pefFbProjectId.value = projectId;
    pefFeedbackForm.reset();
    pefFeedback.classList.add('open');
  }

  function closeFeedbackForm() {
    pefFeedback.classList.remove('open');
    pefFeedbackForm.reset();
  }

  // ---- Event Listeners ----

  // Nav button & menu link
  pefBtn.addEventListener('click', openPefGate);
  menuPefLink.addEventListener('click', (e) => {
    e.preventDefault();
    navBurger.classList.remove('active');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    syncBurgerExpanded();
    setTimeout(openPefGate, 300);
  });

  // Email gate
  pefGateClose.addEventListener('click', closePefGate);
  pefGateBackdrop.addEventListener('click', closePefGate);

  pefGateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = pefEmail.value;
    if (!validateUdemEmail(email)) {
      pefError.textContent = '⚠ Solo se permiten correos @udem.edu o @udem.edu.mx';
      pefEmail.style.borderBottomColor = 'var(--verm)';
      setTimeout(() => { pefEmail.style.borderBottomColor = ''; }, 2000);
      return;
    }
    pefAuthenticated = true;
    sessionStorage.setItem('pefAuth', 'true');
    openPefTalks();
  });

  // PEF Talks panel
  pefTalksClose.addEventListener('click', closePefTalks);
  pefTalksBackdrop.addEventListener('click', closePefTalks);

  // Add PEF button -> requiere sesión de admin
  pefAddBtn.addEventListener('click', () => {
    editingProjectId = null;
    requirePefAdmin(openRegisterForm);
  });

  // Admin gate
  pefAdminGateClose.addEventListener('click', closeAdminGate);
  pefAdminGateBackdrop.addEventListener('click', closeAdminGate);

  pefAdminForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = pefAdminForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    pefAdminError.textContent = '';
    try {
      await adminSignIn(pefAdminEmail.value, pefAdminPass.value);
      const action = pendingAdminAction;
      closeAdminGate();
      if (action) action();
    } catch (err) {
      pefAdminError.textContent = adminAuthErrorMessage(err);
      pefAdminPass.style.borderBottomColor = 'var(--verm)';
      setTimeout(() => { pefAdminPass.style.borderBottomColor = ''; }, 2000);
    } finally {
      submitBtn.disabled = false;
    }
  });

  // Register form
  pefRegisterClose.addEventListener('click', closeRegisterForm);
  pefRegisterBackdrop.addEventListener('click', closeRegisterForm);

  pefRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pefProjName').value.trim();
    const members = document.getElementById('pefProjMembers').value.trim();
    const summary = document.getElementById('pefProjSummary').value.trim();
    const problem = document.getElementById('pefProjProblem').value.trim();
    const email = document.getElementById('pefProjEmail').value.trim();
    const pdfUrl = (document.getElementById('pefProjPdf')?.value || '').trim();

    if (!validateUdemEmail(email)) {
      pefRegisterError.textContent = '⚠ El correo debe ser @udem.edu o @udem.edu.mx';
      return;
    }

    if (!name || !members || !summary || !problem) {
      pefRegisterError.textContent = '⚠ Todos los campos son obligatorios';
      return;
    }

    const projects = getPefProjects();

    if (editingProjectId) {
      // Edit mode: update existing project
      const idx = projects.findIndex(p => p.id === editingProjectId);
      if (idx !== -1) {
        projects[idx] = {
          ...projects[idx],
          name, members, summary, problem, email, pdfUrl
        };
        savePefProjects(projects);
        closeRegisterForm();
        renderPefProjects();
        showToast('✓ PROYECTO ACTUALIZADO');
        return;
      }
    }

    // Create mode
    const newProject = {
      id: 'pef_' + Date.now(),
      name,
      members,
      summary,
      problem,
      email,
      pdfUrl,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    savePefProjects(projects);

    closeRegisterForm();
    renderPefProjects();
    showToast('✓ PROYECTO PEF REGISTRADO EXITOSAMENTE');
  });

  // ---- Feedback Table ----
  const pefTableBtn = document.getElementById('pefTableBtn');
  const pefTable = document.getElementById('pefTable');
  const pefTableBackdrop = document.getElementById('pefTableBackdrop');
  const pefTableClose = document.getElementById('pefTableClose');
  const pefTableBody = document.getElementById('pefTableBody');

  let feedbackCache = [];
  let feedbackListenerAttached = false;

  // Las reglas restringen la lectura de pefFeedback a admins; el listener
  // solo se suscribe cuando hay sesión de admin para evitar permission_denied.
  function attachFeedbackListener() {
    if (feedbackListenerAttached) return;
    feedbackListenerAttached = true;
    db.ref('pefFeedback').on('value', (snapshot) => {
      const val = snapshot.val() || {};
      feedbackCache = Array.isArray(val) ? val.filter(Boolean) : Object.values(val);
      if (pefTable.classList.contains('open')) renderTable();
    });
  }

  onAdminStateChange((admin) => { if (admin) attachFeedbackListener(); });

  function openTable() {
    renderTable();
    pefTable.classList.add('open');
  }

  function closeTable() {
    pefTable.classList.remove('open');
  }

  function renderTable() {
    const projects = getPefProjects();
    const feedback = feedbackCache;

    if (feedback.length === 0 || projects.length === 0) {
      pefTableBody.innerHTML = '<div class="pef-table__empty">NO HAY FEEDBACK REGISTRADO AÚN</div>';
      return;
    }

    // Group feedback by professor
    const profMap = {};
    feedback.forEach(fb => {
      if (!profMap[fb.profName]) profMap[fb.profName] = {};
      profMap[fb.profName][fb.projectId] = fb.interest;
    });

    let html = '<table class="pef-table__grid"><thead><tr>';
    html += '<th>PROFESOR</th>';
    projects.forEach(p => {
      html += `<th>${escapeHtml(p.name)}</th>`;
    });
    html += '</tr></thead><tbody>';

    Object.keys(profMap).forEach(prof => {
      html += '<tr>';
      html += `<td>${escapeHtml(prof)}</td>`;
      projects.forEach(p => {
        const val = profMap[prof][p.id];
        if (val === 'si') {
          html += '<td class="pef-table__cell--si">✓ SÍ</td>';
        } else if (val === 'sinodal') {
          html += '<td class="pef-table__cell--sinodal">◆ SINODAL</td>';
        } else if (val === 'no') {
          html += '<td class="pef-table__cell--no">✗ NO</td>';
        } else {
          html += '<td>·</td>';
        }
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    pefTableBody.innerHTML = html;
  }

  pefTableBtn.addEventListener('click', () => {
    requirePefAdmin(openTable);
  });
  pefTableClose.addEventListener('click', closeTable);
  pefTableBackdrop.addEventListener('click', closeTable);

  // Feedback form
  pefFeedbackClose.addEventListener('click', closeFeedbackForm);
  pefFeedbackBackdrop.addEventListener('click', closeFeedbackForm);

  pefFeedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const profName = document.getElementById('pefFbProfName').value.trim();
    const fbText = document.getElementById('pefFbText').value.trim();
    const interest = document.querySelector('input[name="pefInterest"]:checked');
    const projectId = pefFbProjectId.value;

    if (!profName || !fbText || !interest) return;

    const projects = getPefProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Save feedback to Firebase (push: las reglas solo permiten crear
    // entradas nuevas, nunca modificar o borrar las existentes)
    const newFeedback = {
      id: 'fb_' + Date.now(),
      projectId,
      profName,
      feedback: fbText,
      interest: interest.value,
      createdAt: new Date().toISOString()
    };
    try {
      await ensureAnonSession();
      await db.ref('pefFeedback').push(newFeedback);
    } catch (err) {
      console.error(err);
      showToast('⚠ NO SE PUDO GUARDAR EL FEEDBACK. INTENTA DE NUEVO');
      return;
    }

    // Build mailto link with feedback
    const interestLabel = interest.value === 'si' ? 'Si, me interesa asesorar'
      : interest.value === 'sinodal' ? 'Como sinodal'
      : 'No';

    const subject = encodeURIComponent(`Feedback PEF: ${project.name}`);
    const body = encodeURIComponent(
      `Profesor: ${profName}\n\n` +
      `Feedback:\n${fbText}\n\n` +
      `¿Interesado en asesorar?: ${interestLabel}\n\n` +
      `---\nProyecto: ${project.name}\nIntegrantes: ${project.members}`
    );

    // Open mailto
    window.open(`mailto:${project.email}?subject=${subject}&body=${body}`, '_blank');

    closeFeedbackForm();
    showToast('✓ FEEDBACK REGISTRADO Y ENVIADO POR CORREO');
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pdfViewer && pdfViewer.classList.contains('open')) closePdfViewer();
      else if (pefTable.classList.contains('open')) closeTable();
      else if (pefFeedback.classList.contains('open')) closeFeedbackForm();
      else if (pefRegister.classList.contains('open')) closeRegisterForm();
      else if (pefAdminGate.classList.contains('open')) closeAdminGate();
      else if (pefGate.classList.contains('open')) closePefGate();
      else if (pefTalks.classList.contains('open')) closePefTalks();
    }
  });
}

// ---- NAV SCROLL STYLE ----
let lastScroll = 0;
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const nav = document.getElementById('nav');
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        nav.classList.add('nav--scrolled');
        // Hide on fast scroll down, show on scroll up
        if (scrollY > lastScroll && scrollY > 300) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }
      } else {
        nav.classList.remove('nav--scrolled');
        nav.classList.remove('nav--hidden');
      }

      lastScroll = scrollY;
      ticking = false;
    });
    ticking = true;
  }
});

// ============================================
// ADMIN SYSTEM · Projects & Awards Management
// ============================================
function initAdmin() {
  // ---- DOM ----
  const adminBtn = document.getElementById('adminBtn');
  const adminGate = document.getElementById('adminGate');
  const adminGateBackdrop = document.getElementById('adminGateBackdrop');
  const adminGateClose = document.getElementById('adminGateClose');
  const adminGateForm = document.getElementById('adminGateForm');
  const adminGateEmail = document.getElementById('adminGateEmail');
  const adminGatePass = document.getElementById('adminGatePass');
  const adminGateError = document.getElementById('adminGateError');
  const adminPanel = document.getElementById('adminPanel');
  const adminPanelBackdrop = document.getElementById('adminPanelBackdrop');
  const adminPanelClose = document.getElementById('adminPanelClose');
  const adminProjectForm = document.getElementById('adminProjectForm');
  const adminProjectFormBackdrop = document.getElementById('adminProjectFormBackdrop');
  const adminProjectFormClose = document.getElementById('adminProjectFormClose');
  const adminProjectFormEl = document.getElementById('adminProjectFormEl');
  const adminAwardForm = document.getElementById('adminAwardForm');
  const adminAwardFormBackdrop = document.getElementById('adminAwardFormBackdrop');
  const adminAwardFormClose = document.getElementById('adminAwardFormClose');
  const adminAwardFormEl = document.getElementById('adminAwardFormEl');

  // ---- Firebase helpers ----
  let dynamicProjectsCache = [];
  let dynamicAwardsCache = [];

  function getDynamicProjects() { return dynamicProjectsCache; }
  function saveDynamicProjects(p) {
    dynamicProjectsCache = p;
    db.ref('ldgProjects').set(p).catch((err) => {
      console.error(err);
      showToast('⚠ SIN PERMISOS PARA GUARDAR. INICIA SESIÓN COMO ADMIN');
    });
  }

  function getDynamicAwards() { return dynamicAwardsCache; }
  function saveDynamicAwards(a) {
    dynamicAwardsCache = a;
    db.ref('ldgAwards').set(a).catch((err) => {
      console.error(err);
      showToast('⚠ SIN PERMISOS PARA GUARDAR. INICIA SESIÓN COMO ADMIN');
    });
  }

  // Listen for real-time updates
  db.ref('ldgProjects').on('value', (snapshot) => {
    dynamicProjectsCache = snapshot.val() || [];
    // Reload dynamic projects into theses array
    theses = theses.filter(t => typeof t.id !== 'string' || !t.id.startsWith('dyn_'));
    loadDynamicProjects();
    renderGallery(false);
  });

  db.ref('ldgAwards').on('value', (snapshot) => {
    dynamicAwardsCache = snapshot.val() || [];
    renderDynamicAwards();
  });

  // ---- Merge dynamic projects into theses array ----
  function loadDynamicProjects() {
    const dynamic = getDynamicProjects();
    const categoryLabels = { branding: 'BRANDING', editorial: 'EDITORIAL', packaging: 'PACKAGING', motion: 'MOTION', uiux: 'UI/UX', identidad: 'IDENTIDAD' };
    dynamic.forEach(dp => {
      // Avoid duplicates
      if (!theses.find(t => t.id === dp.id)) {
        theses.push({
          id: dp.id,
          title: dp.title,
          student: dp.student,
          tutor: dp.tutor,
          year: parseInt(dp.year),
          semester: dp.semester,
          category: dp.category,
          categoryLabel: categoryLabels[dp.category] || dp.category.toUpperCase(),
          thumbnail: dp.thumbnail,
          pdfUrl: dp.pdfUrl,
          abstract: dp.abstract
        });
      }
    });
  }

  // ---- Render dynamic awards into the awards section ----
  function renderDynamicAwards() {
    const awards = getDynamicAwards();
    const awardsList = document.querySelector('.awards__list');
    if (!awardsList) return;

    // Remove previously injected dynamic awards
    awardsList.querySelectorAll('.awards__item--dynamic').forEach(el => el.remove());

    awards.forEach(award => {
      const item = document.createElement('div');
      item.className = 'awards__item awards__item--featured awards__item--dynamic';
      item.innerHTML = `
        <div class="awards__item-image">
          <img src="${escapeAttr(award.image)}" alt="${escapeAttr(award.name)}" loading="lazy">
        </div>
        <div class="awards__item-content">
          <div class="awards__tags">
            <span class="awards__tag">${escapeHtml(award.prize)}</span>
            <span class="awards__tag awards__tag--accent">${escapeHtml(award.badge)}</span>
          </div>
          <h3 class="awards__name">${escapeHtml(award.name)}</h3>
          <div class="awards__meta-grid">
            <div class="awards__meta-item">
              <span class="mono-sm">ALUMNAS</span>
              <span>${escapeHtml(award.students)}</span>
            </div>
            <div class="awards__meta-item">
              <span class="mono-sm">ASESOR</span>
              <span>${escapeHtml(award.advisor)}</span>
            </div>
            <div class="awards__meta-item">
              <span class="mono-sm">PROYECTO</span>
              <span>${escapeHtml(award.description)}</span>
            </div>
          </div>
        </div>
      `;
      awardsList.appendChild(item);
    });
  }

  // ---- Admin Panel List Renderers ----
  function renderAdminProjectsList() {
    const list = document.getElementById('adminProjectsList');
    const dynamic = getDynamicProjects();

    if (dynamic.length === 0) {
      list.innerHTML = '<div class="admin-panel__empty">NO HAY PROYECTOS DINÁMICOS.<br>Los 17 proyectos base están en el código.</div>';
      return;
    }

    list.innerHTML = dynamic.map(p => `
      <div class="admin-panel__list-item">
        <div class="admin-panel__list-item-info">
          <span class="admin-panel__list-item-title">${escapeHtml(p.title)}</span>
          <span class="admin-panel__list-item-meta">${escapeHtml(p.student)} · ${escapeHtml(p.semester)}</span>
        </div>
        <button class="admin-panel__list-item-delete" data-id="${escapeAttr(p.id)}" data-type="project">ELIMINAR</button>
      </div>
    `).join('');

    list.querySelectorAll('.admin-panel__list-item-delete[data-type="project"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('¿Eliminar este proyecto?')) return;
        const id = btn.dataset.id;
        const projects = getDynamicProjects().filter(p => p.id !== id);
        saveDynamicProjects(projects);
        // Remove from theses array
        const idx = theses.findIndex(t => t.id === id);
        if (idx !== -1) theses.splice(idx, 1);
        renderAdminProjectsList();
        renderGallery();
        showToast('✓ PROYECTO ELIMINADO');
      });
    });
  }

  function renderAdminAwardsList() {
    const list = document.getElementById('adminAwardsList');
    const dynamic = getDynamicAwards();

    if (dynamic.length === 0) {
      list.innerHTML = '<div class="admin-panel__empty">NO HAY RECONOCIMIENTOS DINÁMICOS.<br>Roble & Maca está en el código base.</div>';
      return;
    }

    list.innerHTML = dynamic.map(a => `
      <div class="admin-panel__list-item">
        <div class="admin-panel__list-item-info">
          <span class="admin-panel__list-item-title">${escapeHtml(a.name)}</span>
          <span class="admin-panel__list-item-meta">${escapeHtml(a.prize)} · ${escapeHtml(a.badge)}</span>
        </div>
        <button class="admin-panel__list-item-delete" data-id="${escapeAttr(a.id)}" data-type="award">ELIMINAR</button>
      </div>
    `).join('');

    list.querySelectorAll('.admin-panel__list-item-delete[data-type="award"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('¿Eliminar este reconocimiento?')) return;
        const id = btn.dataset.id;
        const awards = getDynamicAwards().filter(a => a.id !== id);
        saveDynamicAwards(awards);
        renderAdminAwardsList();
        renderDynamicAwards();
        showToast('✓ RECONOCIMIENTO ELIMINADO');
      });
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('pefToast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ---- Open/Close ----
  function openAdminGate() {
    if (isAdminUser) { openAdminPanel(); return; }
    adminGate.classList.add('open');
    document.body.classList.add('modal-open');
    adminGateEmail.focus();
  }

  function closeAdminGate() {
    adminGate.classList.remove('open');
    document.body.classList.remove('modal-open');
    adminGateError.textContent = '';
    adminGateEmail.value = '';
    adminGatePass.value = '';
  }

  function openAdminPanel() {
    closeAdminGate();
    renderAdminProjectsList();
    renderAdminAwardsList();
    adminPanel.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeAdminPanel() {
    adminPanel.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  // ---- Events ----
  adminBtn.addEventListener('click', openAdminGate);

  adminGateClose.addEventListener('click', closeAdminGate);
  adminGateBackdrop.addEventListener('click', closeAdminGate);

  adminGateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = adminGateForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    adminGateError.textContent = '';
    try {
      await adminSignIn(adminGateEmail.value, adminGatePass.value);
      openAdminPanel();
    } catch (err) {
      adminGateError.textContent = adminAuthErrorMessage(err);
    } finally {
      submitBtn.disabled = false;
    }
  });

  adminPanelClose.addEventListener('click', closeAdminPanel);
  adminPanelBackdrop.addEventListener('click', closeAdminPanel);

  document.getElementById('adminLogoutBtn').addEventListener('click', async () => {
    await fbAuth.signOut();
    closeAdminPanel();
    showToast('SESIÓN CERRADA');
  });

  // Tabs
  document.querySelectorAll('.admin-panel__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-panel__tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel__tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab === 'projects' ? 'adminTabProjects' : 'adminTabAwards').classList.add('active');
    });
  });

  // Add Project
  document.getElementById('adminAddProject').addEventListener('click', () => {
    adminPanel.classList.remove('open');
    adminProjectForm.classList.add('open');
  });

  function closeProjectForm() {
    adminProjectForm.classList.remove('open');
    adminProjectFormEl.reset();
    openAdminPanel();
  }
  adminProjectFormClose.addEventListener('click', closeProjectForm);
  adminProjectFormBackdrop.addEventListener('click', closeProjectForm);

  adminProjectFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const project = {
      id: 'dyn_' + Date.now(),
      title: document.getElementById('adminProjTitle').value.trim(),
      student: document.getElementById('adminProjStudent').value.trim(),
      tutor: document.getElementById('adminProjTutor').value.trim(),
      semester: document.getElementById('adminProjSemester').value.trim(),
      year: document.getElementById('adminProjYear').value.trim(),
      category: document.getElementById('adminProjCategory').value,
      thumbnail: document.getElementById('adminProjThumbnail').value.trim(),
      pdfUrl: document.getElementById('adminProjPdf').value.trim(),
      abstract: document.getElementById('adminProjAbstract').value.trim()
    };

    const projects = getDynamicProjects();
    projects.push(project);
    saveDynamicProjects(projects);
    // El listener de ldgProjects ya re-mete el proyecto a theses y re-renderiza;
    // empujarlo aquí también lo duplicaba en la galería.

    adminProjectForm.classList.remove('open');
    adminProjectFormEl.reset();
    openAdminPanel();
    showToast('✓ PROYECTO REGISTRADO');
  });

  // Add Award
  document.getElementById('adminAddAward').addEventListener('click', () => {
    adminPanel.classList.remove('open');
    adminAwardForm.classList.add('open');
  });

  function closeAwardForm() {
    adminAwardForm.classList.remove('open');
    adminAwardFormEl.reset();
    openAdminPanel();
  }
  adminAwardFormClose.addEventListener('click', closeAwardForm);
  adminAwardFormBackdrop.addEventListener('click', closeAwardForm);

  adminAwardFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const award = {
      id: 'award_' + Date.now(),
      name: document.getElementById('adminAwardName').value.trim(),
      prize: document.getElementById('adminAwardPrize').value.trim(),
      badge: document.getElementById('adminAwardBadge').value.trim(),
      students: document.getElementById('adminAwardStudents').value.trim(),
      advisor: document.getElementById('adminAwardAdvisor').value.trim(),
      image: document.getElementById('adminAwardImage').value.trim(),
      description: document.getElementById('adminAwardDesc').value.trim()
    };

    const awards = getDynamicAwards();
    awards.push(award);
    saveDynamicAwards(awards);

    adminAwardForm.classList.remove('open');
    adminAwardFormEl.reset();
    openAdminPanel();
    renderDynamicAwards();
    showToast('✓ RECONOCIMIENTO REGISTRADO');
  });

  // ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (adminProjectForm.classList.contains('open')) { closeProjectForm(); }
      else if (adminAwardForm.classList.contains('open')) { closeAwardForm(); }
      else if (adminPanel.classList.contains('open')) closeAdminPanel();
      else if (adminGate.classList.contains('open')) closeAdminGate();
    }
  });

  // ---- Load on init ----
  // Firebase listeners handle loading automatically
}

document.addEventListener('DOMContentLoaded', () => {
  initAdmin(); // Load dynamic data first

  // Capa 3 (GSAP) si cargó y no hay reduced-motion; si falla, capa 2 (IO).
  let usedGsap = false;
  if (MESA_GSAP) {
    try {
      initGsapMotion();
      usedGsap = true;
    } catch (err) {
      console.warn('Capa GSAP no disponible; fallback al módulo IO:', err);
    }
  }

  renderGallery();
  if (!usedGsap) initMotion();
  initVideoLamina();
  initPefTalks();
});
