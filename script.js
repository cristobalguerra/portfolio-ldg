/* ============================================
   PORTFOLIO LDG — Script
   Valiente-inspired interactions
   ============================================ */

// ---- THESIS DATA ----
const theses = [
  {
    id: 1,
    title: "Identidad Visual para Cervecería Artesanal",
    student: "Valeria Montoya",
    tutor: "Mtro. Ricardo Fuentes",
    year: 2026,
    category: "branding",
    categoryLabel: "BRANDING",
    gradient: "linear-gradient(135deg, #D4FF00 0%, #8B6DB5 50%, #FF5030 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #D4FF00, #B8E000)",
      "linear-gradient(135deg, #8B6DB5, #D4FF00)",
      "linear-gradient(135deg, #FF5030, #8B6DB5)",
      "linear-gradient(45deg, #D4FF00, #FF5030)",
      "linear-gradient(180deg, #8B6DB5, #D4FF00)",
      "linear-gradient(135deg, #FF5030, #D4FF00)"
    ],
    abstract: "Este proyecto desarrolla un sistema de identidad visual integral para una cervecería artesanal ubicada en Oaxaca. La propuesta abarca desde la arquitectura de marca hasta el diseño de etiquetas, buscando comunicar la esencia del proceso artesanal y la riqueza cultural de la región. Se exploran conceptos de autenticidad, tradición e innovación a través de un lenguaje gráfico contemporáneo."
  },
  {
    id: 2,
    title: "Sistema de Marca para Festival de Cine Independiente",
    student: "Andrés Quiroga",
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
    abstract: "Propuesta de sistema de identidad flexible para un festival de cine independiente que se reinventa cada año. El proyecto investiga cómo crear coherencia visual dentro de un marco que permite la evolución y adaptación. Se diseña un toolkit de marca que incluye logotipo generativo, paleta cromática dinámica, tipografía editorial y aplicaciones en medios impresos y digitales."
  },
  {
    id: 3,
    title: "Diseño Editorial: Revista de Arquitectura Contemporánea",
    student: "Sofía Delgado",
    tutor: "Mtro. Carlos Vega",
    year: 2025,
    category: "editorial",
    categoryLabel: "EDITORIAL",
    gradient: "linear-gradient(135deg, #8B6DB5 0%, #A88CCE 50%, #D4B8E8 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #8B6DB5, #6B4F96)",
      "linear-gradient(135deg, #A88CCE, #8B6DB5)",
      "linear-gradient(135deg, #D4B8E8, #A88CCE)",
      "linear-gradient(45deg, #6B4F96, #8B6DB5)",
      "linear-gradient(180deg, #8B6DB5, #D4B8E8)",
      "linear-gradient(135deg, #A88CCE, #6B4F96)"
    ],
    abstract: "Investigación y desarrollo de un proyecto editorial que reimagina la publicación de arquitectura contemporánea. Se propone un formato híbrido impreso-digital que integra fotografía, infografía y narrativa visual para comunicar proyectos arquitectónicos de manera inmersiva. El diseño busca romper con las convenciones del género editorial arquitectónico."
  },
  {
    id: 4,
    title: "Packaging Sustentable para Productos Orgánicos",
    student: "Diego Navarro",
    tutor: "Mtra. Ana Belén Torres",
    year: 2024,
    category: "packaging",
    categoryLabel: "PACKAGING",
    gradient: "linear-gradient(135deg, #FF5030 0%, #FF7A60 50%, #FFB09A 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #FF5030, #CC3D24)",
      "linear-gradient(135deg, #FF7A60, #FF5030)",
      "linear-gradient(135deg, #FFB09A, #FF7A60)",
      "linear-gradient(45deg, #CC3D24, #FF5030)",
      "linear-gradient(180deg, #FF5030, #FFB09A)",
      "linear-gradient(135deg, #FF7A60, #CC3D24)"
    ],
    abstract: "Este proyecto aborda el diseño de packaging sustentable para una línea de productos orgánicos. Se investigan materiales biodegradables y técnicas de impresión ecológica para desarrollar un sistema de empaque que minimice el impacto ambiental sin sacrificar la calidad estética. La propuesta incluye diseño estructural, gráfico y estrategia de comunicación visual en punto de venta."
  },
  {
    id: 5,
    title: "Motion Graphics para Campaña de Concientización Social",
    student: "Mariana Reyes",
    tutor: "Mtro. Eduardo Sánchez",
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
    abstract: "Desarrollo de una serie de piezas de motion graphics para una campaña de concientización sobre salud mental en jóvenes. El proyecto explora el poder del movimiento y la narrativa visual animada para transmitir mensajes complejos de manera accesible y emocionalmente resonante. Se producen cinco piezas animadas para redes sociales y una pieza principal de 90 segundos."
  },
  {
    id: 6,
    title: "Interfaz Digital para Museo de Arte Moderno",
    student: "Roberto Jiménez",
    tutor: "Mtra. Patricia Lozano",
    year: 2023,
    category: "uiux",
    categoryLabel: "UI/UX",
    gradient: "linear-gradient(135deg, #D4FF00 0%, #2D2D2D 50%, #8B6DB5 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #D4FF00, #2D2D2D)",
      "linear-gradient(135deg, #2D2D2D, #8B6DB5)",
      "linear-gradient(135deg, #8B6DB5, #D4FF00)",
      "linear-gradient(45deg, #2D2D2D, #D4FF00)",
      "linear-gradient(180deg, #D4FF00, #8B6DB5)",
      "linear-gradient(135deg, #2D2D2D, #FF5030)"
    ],
    abstract: "Diseño de experiencia de usuario e interfaz digital para el sitio web y aplicación móvil de un museo de arte moderno. El proyecto investiga cómo la tecnología puede enriquecer la experiencia museográfica, proponiendo herramientas interactivas de exploración de colecciones, recorridos virtuales personalizados y funcionalidades de accesibilidad universal."
  },
  {
    id: 7,
    title: "Branding Integral para Estudio de Yoga y Bienestar",
    student: "Camila Ortega",
    tutor: "Mtro. Ricardo Fuentes",
    year: 2023,
    category: "branding",
    categoryLabel: "BRANDING",
    gradient: "linear-gradient(135deg, #FF5030 0%, #D4FF00 50%, #2D2D2D 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #FF5030, #D4FF00)",
      "linear-gradient(135deg, #D4FF00, #2D2D2D)",
      "linear-gradient(135deg, #2D2D2D, #FF5030)",
      "linear-gradient(45deg, #FF5030, #2D2D2D)",
      "linear-gradient(180deg, #D4FF00, #FF5030)",
      "linear-gradient(135deg, #FF5030, #8B6DB5)"
    ],
    abstract: "Creación de un sistema de branding integral para un estudio de yoga y bienestar. La investigación parte de la filosofía del yoga y su estética para desarrollar una identidad que comunique serenidad, equilibrio y conexión. El proyecto abarca logotipo, papelería, señalética interior, presencia digital y merchandising, todo bajo un concepto unificado de diseño consciente."
  },
  {
    id: 8,
    title: "Rediseño de Identidad para Mercado Público Tradicional",
    student: "Fernando Castillo",
    tutor: "Mtra. Laura Espinoza",
    year: 2022,
    category: "identidad",
    categoryLabel: "IDENTIDAD",
    gradient: "linear-gradient(135deg, #8B6DB5 0%, #FF5030 50%, #D4FF00 100%)",
    galleryGradients: [
      "linear-gradient(135deg, #8B6DB5, #FF5030)",
      "linear-gradient(135deg, #FF5030, #D4FF00)",
      "linear-gradient(135deg, #D4FF00, #8B6DB5)",
      "linear-gradient(45deg, #6B4F96, #FF5030)",
      "linear-gradient(180deg, #8B6DB5, #D4FF00)",
      "linear-gradient(135deg, #FF5030, #6B4F96)"
    ],
    abstract: "Proyecto de rediseño de identidad visual para un mercado público tradicional en la Ciudad de México. La propuesta busca revitalizar la imagen del espacio comercial respetando su esencia cultural y patrimonial. Se desarrolla un sistema de wayfinding, identidad gráfica, comunicación visual y presencia digital que posicione al mercado como destino gastronómico y cultural contemporáneo."
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

// ============================================
// CUSTOM CURSOR (Valiente-style)
// ============================================
const cursor = document.getElementById('cursor');
const cursorDot = cursor.querySelector('.cursor__dot');
const cursorCircle = cursor.querySelector('.cursor__circle');
let cursorX = 0, cursorY = 0;
let circleX = 0, circleY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
});

function animateCursor() {
  circleX += (cursorX - circleX) * 0.15;
  circleY += (cursorY - circleY) * 0.15;
  cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover detection for cursor scale
const hoverTargets = () => document.querySelectorAll('a, button, .thesis-card, .filter-btn, .about__strip-item');
function bindCursorHover() {
  hoverTargets().forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

// ============================================
// HERO ANIMATIONS (on load)
// ============================================
window.addEventListener('load', () => {
  document.querySelectorAll('.hero__line').forEach(el => el.classList.add('animated'));
});

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

    // Tilt effect on mouse move (Valiente-style)
    const image = card.querySelector('.thesis-card__image');
    card.addEventListener('mousemove', (e) => {
      const rect = image.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      image.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      image.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
      image.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { image.style.transition = ''; }, 500);
    });

    card.addEventListener('click', () => openModal(thesis));
    galleryGrid.appendChild(card);
  });

  projectCount.textContent = `${filtered.length} PROYECTO${filtered.length !== 1 ? 'S' : ''}`;
  bindCursorHover();
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

// ============================================
// SCROLL REVEAL (enhanced stagger)
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.about__heading, .about__text, .about__stats');
  reveals.forEach(el => el.classList.add('reveal'));

  const revealLefts = document.querySelectorAll('.about__label, .gallery__title, .awards__title');
  revealLefts.forEach(el => el.classList.add('reveal-left'));

  // Awards items stagger
  document.querySelectorAll('.awards__item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  const revealScales = document.querySelectorAll('.about__strip-item');
  revealScales.forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  const allReveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  allReveals.forEach(el => observer.observe(el));
}

// ============================================
// PARALLAX on scroll
// ============================================
function initParallax() {
  const heroTitle = document.querySelector('.hero__title');
  const footerBig = document.querySelector('.footer__big-text');
  const marquee = document.querySelector('.hero__marquee');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Hero parallax
    if (heroTitle && scrollY < window.innerHeight) {
      heroTitle.style.transform = `translateY(${scrollY * 0.3}px)`;
    }

    // Marquee speed boost on scroll
    if (marquee && scrollY < window.innerHeight) {
      marquee.style.transform = `translateX(${-scrollY * 0.1}px)`;
    }

    // Footer big text parallax
    if (footerBig) {
      const footerRect = footerBig.closest('.footer').getBoundingClientRect();
      if (footerRect.top < window.innerHeight) {
        const progress = (window.innerHeight - footerRect.top) / (window.innerHeight + footerRect.height);
        footerBig.style.transform = `translateX(${progress * 50}px)`;
      }
    }
  });
}

// ============================================
// MAGNETIC BUTTONS (Valiente-style)
// ============================================
function initMagnetic() {
  const magneticEls = document.querySelectorAll('.nav__burger, .nav__logo, .modal__close');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}

// ============================================
// FONT CYCLING on "PORTFOLIO" (random every 2s)
// ============================================
const cycleVariants = [
  { weight: '100', style: 'normal', stretch: 'normal' },
  { weight: '100', style: 'italic', stretch: 'normal' },
  { weight: '200', style: 'normal', stretch: 'normal' },
  { weight: '300', style: 'normal', stretch: 'normal' },
  { weight: '300', style: 'italic', stretch: 'normal' },
  { weight: '400', style: 'normal', stretch: 'normal' },
  { weight: '400', style: 'italic', stretch: 'normal' },
  { weight: '500', style: 'normal', stretch: 'normal' },
  { weight: '700', style: 'normal', stretch: 'normal' },
  { weight: '700', style: 'italic', stretch: 'normal' },
  { weight: '800', style: 'normal', stretch: 'normal' },
  { weight: '900', style: 'normal', stretch: 'normal' },
  { weight: '100', style: 'normal', stretch: 'condensed' },
  { weight: '700', style: 'normal', stretch: 'condensed' },
  { weight: '900', style: 'normal', stretch: 'condensed' },
];
let lastVariantIndex = -1;

// Language cycle: every 2 font changes, switch language
const languageCycle = [
  'PORTFOLIO',    // español/inglés
  'ポートフォリオ',  // japonés
  'PORTFOLIO',    // normal
  'PORTEFEUILLE', // francés
  'PORTFOLIO',    // normal
  'PORTAFOGLIO',  // italiano
  'PORTFOLIO',    // normal
  '作品集',        // chino
  'PORTFOLIO',    // normal
  'PORTFÓLIO',   // portugués
];
let cycleTickCount = 0;
let currentLangIndex = 0;

function initFontCycling() {
  const el = document.getElementById('heroPortfolio');
  if (!el) return;

  setInterval(() => {
    cycleTickCount++;

    // Every 2 ticks, advance to next language
    if (cycleTickCount % 2 === 0) {
      currentLangIndex = (currentLangIndex + 1) % languageCycle.length;
    }

    let idx;
    do {
      idx = Math.floor(Math.random() * cycleVariants.length);
    } while (idx === lastVariantIndex);
    lastVariantIndex = idx;

    const v = cycleVariants[idx];
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => {
      el.textContent = languageCycle[currentLangIndex];
      el.style.fontWeight = v.weight;
      el.style.fontStyle = v.style;
      el.style.fontStretch = v.stretch;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);
  }, 500);
}

// ============================================
// PEF TALKS — Full System
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

  const ADMIN_PASSWORD = 'pefpr26';
  let pefAuthenticated = sessionStorage.getItem('pefAuth') === 'true';

  // ---- LocalStorage helpers ----
  function getPefProjects() {
    try {
      return JSON.parse(localStorage.getItem('pefProjects') || '[]');
    } catch { return []; }
  }

  function savePefProjects(projects) {
    localStorage.setItem('pefProjects', JSON.stringify(projects));
  }

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
      card.innerHTML = `
        <div class="pef-talks__card-accent"></div>
        <span class="mono-sm">PEF ${String(i + 1).padStart(2, '0')}</span>
        <h3 class="pef-talks__card-title">${escapeHtml(proj.name)}</h3>
        <span class="pef-talks__card-members">${escapeHtml(proj.members)}</span>
        <p class="pef-talks__card-desc">${escapeHtml(proj.summary)}</p>
        <p class="pef-talks__card-problem"><strong>Problemática:</strong> ${escapeHtml(proj.problem)}</p>
        <button class="pef-talks__card-feedback-btn" data-project-id="${proj.id}">DAR FEEDBACK &rarr;</button>
      `;
      pefProjectsGrid.appendChild(card);
    });

    // Bind feedback buttons
    pefProjectsGrid.querySelectorAll('.pef-talks__card-feedback-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projectId = e.target.dataset.projectId;
        openFeedbackForm(projectId);
      });
    });

    bindCursorHover();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

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
    pefAdminPass.focus();
  }

  function closeAdminGate() {
    pefAdminGate.classList.remove('open');
    pefAdminError.textContent = '';
    pefAdminPass.value = '';
  }

  function openRegisterForm() {
    closeAdminGate();
    pefRegister.classList.add('open');
  }

  function closeRegisterForm() {
    pefRegister.classList.remove('open');
    pefRegisterForm.reset();
    pefRegisterError.textContent = '';
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
      pefEmail.style.borderBottomColor = 'var(--orange)';
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

  // Add PEF button -> admin password
  pefAddBtn.addEventListener('click', openAdminGate);

  // Admin gate
  pefAdminGateClose.addEventListener('click', closeAdminGate);
  pefAdminGateBackdrop.addEventListener('click', closeAdminGate);

  pefAdminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pefAdminPass.value !== ADMIN_PASSWORD) {
      pefAdminError.textContent = '⚠ Contrasena incorrecta';
      pefAdminPass.style.borderBottomColor = 'var(--orange)';
      setTimeout(() => { pefAdminPass.style.borderBottomColor = ''; }, 2000);
      return;
    }
    openRegisterForm();
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

    if (!validateUdemEmail(email)) {
      pefRegisterError.textContent = '⚠ El correo debe ser @udem.edu o @udem.edu.mx';
      return;
    }

    if (!name || !members || !summary || !problem) {
      pefRegisterError.textContent = '⚠ Todos los campos son obligatorios';
      return;
    }

    const projects = getPefProjects();
    const newProject = {
      id: 'pef_' + Date.now(),
      name,
      members,
      summary,
      problem,
      email,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    savePefProjects(projects);

    closeRegisterForm();
    renderPefProjects();
    showToast('✓ PROYECTO PEF REGISTRADO EXITOSAMENTE');
  });

  // Feedback form
  pefFeedbackClose.addEventListener('click', closeFeedbackForm);
  pefFeedbackBackdrop.addEventListener('click', closeFeedbackForm);

  pefFeedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const profName = document.getElementById('pefFbProfName').value.trim();
    const fbText = document.getElementById('pefFbText').value.trim();
    const interest = document.querySelector('input[name="pefInterest"]:checked');
    const projectId = pefFbProjectId.value;

    if (!profName || !fbText || !interest) return;

    const projects = getPefProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

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
    showToast('✓ FEEDBACK ENVIADO — SE ABRIO TU CLIENTE DE CORREO');
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pefFeedback.classList.contains('open')) closeFeedbackForm();
      else if (pefRegister.classList.contains('open')) closeRegisterForm();
      else if (pefAdminGate.classList.contains('open')) closeAdminGate();
      else if (pefGate.classList.contains('open')) closePefGate();
      else if (pefTalks.classList.contains('open')) closePefTalks();
    }
  });
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
  initParallax();
  initMagnetic();
  bindCursorHover();
  initFontCycling();
  initPefTalks();
});
