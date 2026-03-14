/* ============================================
   PORTFOLIO LDG — Script
   ============================================ */

// ---- THESIS DATA ----
const theses = [
  {
    id: 1,
    title: "Identidad Visual para Cerveceria Artesanal",
    student: "Valeria Montoya",
    tutor: "Mtro. Ricardo Fuentes",
    year: 2026,
    category: "branding",
    categoryLabel: "BRANDING",
    gradient: "linear-gradient(135deg, #FF2200 0%, #FF6B35 50%, #FFB347 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #FF2200, #cc4400)",
      "linear-gradient(135deg, #FF6B35, #FF2200)",
      "linear-gradient(135deg, #FFB347, #FF6B35)",
      "linear-gradient(45deg, #cc1100, #FF2200)",
      "linear-gradient(180deg, #FF2200, #FFB347)",
      "linear-gradient(135deg, #FF6B35, #cc4400)"
    ],
    abstract: "Este proyecto desarrolla un sistema de identidad visual integral para una cerveceria artesanal ubicada en Oaxaca. La propuesta abarca desde la arquitectura de marca hasta el diseno de etiquetas, buscando comunicar la esencia del proceso artesanal y la riqueza cultural de la region. Se exploran conceptos de autenticidad, tradicion e innovacion a traves de un lenguaje grafico contemporaneo."
  },
  {
    id: 2,
    title: "Sistema de Marca para Festival de Cine Independiente",
    student: "Andres Quiroga",
    tutor: "Mtra. Laura Espinoza",
    year: 2025,
    category: "identidad",
    categoryLabel: "IDENTIDAD",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #555555 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #1a1a1a, #444)",
      "linear-gradient(135deg, #333, #666)",
      "linear-gradient(135deg, #222, #555)",
      "linear-gradient(45deg, #111, #333)",
      "linear-gradient(180deg, #2a2a2a, #4a4a4a)",
      "linear-gradient(135deg, #1a1a1a, #3a3a3a)"
    ],
    abstract: "Propuesta de sistema de identidad flexible para un festival de cine independiente que se reinventa cada ano. El proyecto investiga como crear coherencia visual dentro de un marco que permite la evolucion y adaptacion. Se disena un toolkit de marca que incluye logotipo generativo, paleta cromatica dinamica, tipografia editorial y aplicaciones en medios impresos y digitales."
  },
  {
    id: 3,
    title: "Diseno Editorial: Revista de Arquitectura Contemporanea",
    student: "Sofia Delgado",
    tutor: "Mtro. Carlos Vega",
    year: 2025,
    category: "editorial",
    categoryLabel: "EDITORIAL",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #3498DB 50%, #85C1E9 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #2C3E50, #4A6FA5)",
      "linear-gradient(135deg, #3498DB, #2C3E50)",
      "linear-gradient(135deg, #85C1E9, #3498DB)",
      "linear-gradient(45deg, #1a2530, #3498DB)",
      "linear-gradient(180deg, #2C3E50, #85C1E9)",
      "linear-gradient(135deg, #3498DB, #1a2530)"
    ],
    abstract: "Investigacion y desarrollo de un proyecto editorial que reimagina la publicacion de arquitectura contemporanea. Se propone un formato hibrido impreso-digital que integra fotografia, infografia y narrativa visual para comunicar proyectos arquitectonicos de manera inmersiva. El diseno busca romper con las convenciones del genero editorial arquitectonico."
  },
  {
    id: 4,
    title: "Packaging Sustentable para Productos Organicos",
    student: "Diego Navarro",
    tutor: "Mtra. Ana Belen Torres",
    year: 2024,
    category: "packaging",
    categoryLabel: "PACKAGING",
    gradient: "linear-gradient(135deg, #27AE60 0%, #2ECC71 50%, #82E0AA 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #27AE60, #1E8449)",
      "linear-gradient(135deg, #2ECC71, #27AE60)",
      "linear-gradient(135deg, #82E0AA, #2ECC71)",
      "linear-gradient(45deg, #196F3D, #27AE60)",
      "linear-gradient(180deg, #27AE60, #82E0AA)",
      "linear-gradient(135deg, #2ECC71, #196F3D)"
    ],
    abstract: "Este proyecto aborda el diseno de packaging sustentable para una linea de productos organicos. Se investigan materiales biodegradables y tecnicas de impresion ecologica para desarrollar un sistema de empaque que minimice el impacto ambiental sin sacrificar la calidad estetica. La propuesta incluye diseno estructural, grafico y estrategia de comunicacion visual en punto de venta."
  },
  {
    id: 5,
    title: "Motion Graphics para Campana de Concientizacion Social",
    student: "Mariana Reyes",
    tutor: "Mtro. Eduardo Sanchez",
    year: 2024,
    category: "motion",
    categoryLabel: "MOTION",
    gradient: "linear-gradient(135deg, #8E44AD 0%, #BB6BD9 50%, #D7BDE2 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #8E44AD, #6C3483)",
      "linear-gradient(135deg, #BB6BD9, #8E44AD)",
      "linear-gradient(135deg, #D7BDE2, #BB6BD9)",
      "linear-gradient(45deg, #5B2C6F, #8E44AD)",
      "linear-gradient(180deg, #8E44AD, #D7BDE2)",
      "linear-gradient(135deg, #BB6BD9, #5B2C6F)"
    ],
    abstract: "Desarrollo de una serie de piezas de motion graphics para una campana de concientizacion sobre salud mental en jovenes. El proyecto explora el poder del movimiento y la narrativa visual animada para transmitir mensajes complejos de manera accesible y emocionalmente resonante. Se producen cinco piezas animadas para redes sociales y una pieza principal de 90 segundos."
  },
  {
    id: 6,
    title: "Interfaz Digital para Museo de Arte Moderno",
    student: "Roberto Jimenez",
    tutor: "Mtra. Patricia Lozano",
    year: 2023,
    category: "uiux",
    categoryLabel: "UI/UX",
    gradient: "linear-gradient(135deg, #E74C3C 0%, #F39C12 50%, #F7DC6F 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #E74C3C, #C0392B)",
      "linear-gradient(135deg, #F39C12, #E74C3C)",
      "linear-gradient(135deg, #F7DC6F, #F39C12)",
      "linear-gradient(45deg, #922B21, #E74C3C)",
      "linear-gradient(180deg, #E74C3C, #F7DC6F)",
      "linear-gradient(135deg, #F39C12, #922B21)"
    ],
    abstract: "Diseno de experiencia de usuario e interfaz digital para el sitio web y aplicacion movil de un museo de arte moderno. El proyecto investiga como la tecnologia puede enriquecer la experiencia museografica, proponiendo herramientas interactivas de exploracion de colecciones, recorridos virtuales personalizados y funcionalidades de accesibilidad universal."
  },
  {
    id: 7,
    title: "Branding Integral para Estudio de Yoga y Bienestar",
    student: "Camila Ortega",
    tutor: "Mtro. Ricardo Fuentes",
    year: 2023,
    category: "branding",
    categoryLabel: "BRANDING",
    gradient: "linear-gradient(135deg, #D4A574 0%, #C8956C 50%, #E8C9A0 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #D4A574, #A67C52)",
      "linear-gradient(135deg, #C8956C, #D4A574)",
      "linear-gradient(135deg, #E8C9A0, #C8956C)",
      "linear-gradient(45deg, #8B6914, #D4A574)",
      "linear-gradient(180deg, #D4A574, #E8C9A0)",
      "linear-gradient(135deg, #C8956C, #8B6914)"
    ],
    abstract: "Creacion de un sistema de branding integral para un estudio de yoga y bienestar. La investigacion parte de la filosofia del yoga y su estetica para desarrollar una identidad que comunique serenidad, equilibrio y conexion. El proyecto abarca logotipo, papeleria, senaletica interior, presencia digital y merchandising, todo bajo un concepto unificado de diseno consciente."
  },
  {
    id: 8,
    title: "Rediseno de Identidad para Mercado Publico Tradicional",
    student: "Fernando Castillo",
    tutor: "Mtra. Laura Espinoza",
    year: 2022,
    category: "identidad",
    categoryLabel: "IDENTIDAD",
    gradient: "linear-gradient(135deg, #FF6348 0%, #FF4757 50%, #FF7979 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #FF6348, #CC4F3A)",
      "linear-gradient(135deg, #FF4757, #FF6348)",
      "linear-gradient(135deg, #FF7979, #FF4757)",
      "linear-gradient(45deg, #B33939, #FF6348)",
      "linear-gradient(180deg, #FF6348, #FF7979)",
      "linear-gradient(135deg, #FF4757, #B33939)"
    ],
    abstract: "Proyecto de rediseno de identidad visual para un mercado publico tradicional en la Ciudad de Mexico. La propuesta busca revitalizar la imagen del espacio comercial respetando su esencia cultural y patrimonial. Se desarrolla un sistema de wayfinding, identidad grafica, comunicacion visual y presencia digital que posicione al mercado como destino gastronomico y cultural contemporaneo."
  }
];

// ---- STATE ----
let activeCategory = 'all';
let activeYear = 'all';

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

// ---- NAVIGATION ----
navBurger.addEventListener('click', () => {
  navBurger.classList.toggle('active');
  menu.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('active');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

// ---- RENDER GALLERY ----
function renderGallery(animate = true) {
  const filtered = theses.filter(t => {
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    const yearMatch = activeYear === 'all' || t.year === parseInt(activeYear);
    return catMatch && yearMatch;
  });

  galleryGrid.innerHTML = '';

  filtered.forEach((thesis, i) => {
    const card = document.createElement('div');
    card.className = 'thesis-card';
    if (animate) {
      card.style.animationDelay = `${i * 0.1}s`;
    } else {
      card.style.animation = 'none';
      card.style.opacity = '1';
      card.style.transform = 'none';
    }

    card.innerHTML = `
      <div class="thesis-card__image">
        <div class="thesis-card__gradient" style="background: ${thesis.gradient}"></div>
        <div class="thesis-card__overlay">
          <span>VER PROYECTO &rarr;</span>
        </div>
      </div>
      <div class="thesis-card__info">
        <span class="mono-sm thesis-card__category">${thesis.categoryLabel}</span>
        <h3 class="thesis-card__title">${thesis.title}</h3>
        <div class="thesis-card__meta">
          <span class="thesis-card__student">${thesis.student}</span>
          <span class="thesis-card__year">${thesis.year}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openModal(thesis));
    galleryGrid.appendChild(card);
  });

  projectCount.textContent = `${filtered.length} PROYECTO${filtered.length !== 1 ? 'S' : ''}`;
}

// ---- FILTERS ----
categoryFilters.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  categoryFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeCategory = e.target.dataset.filter;
  renderGallery();
});

yearFilters.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  yearFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeYear = e.target.dataset.year;
  renderGallery();
});

// ---- MODAL ----
function openModal(thesis) {
  document.getElementById('modalCover').style.background = thesis.gradient;
  document.getElementById('modalCategory').textContent = thesis.categoryLabel;
  document.getElementById('modalTitle').textContent = thesis.title;
  document.getElementById('modalStudent').textContent = thesis.student;
  document.getElementById('modalTutor').textContent = thesis.tutor;
  document.getElementById('modalYear').textContent = thesis.year;
  document.getElementById('modalAbstract').textContent = thesis.abstract;

  // Gallery images
  const galleryEl = document.getElementById('modalGallery');
  galleryEl.innerHTML = '';
  thesis.galleryGradients.forEach(grad => {
    const div = document.createElement('div');
    div.className = 'modal__gallery-item';
    div.style.background = grad;
    galleryEl.appendChild(div);
  });

  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    if (menu.classList.contains('open')) {
      navBurger.classList.remove('active');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }
});

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const reveals = document.querySelectorAll('.about__heading, .about__text, .about__stats, .about__strip-item, .gallery__title');
  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ---- NAV SCROLL STYLE ----
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    nav.style.mixBlendMode = 'normal';
  } else {
    nav.style.mixBlendMode = 'exclusion';
  }

  lastScroll = scrollY;
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initScrollReveal();
});
