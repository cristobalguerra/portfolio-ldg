/* ============================================
   PORTFOLIO LDG — Script
   Valiente-inspired interactions
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
    if (animate) {
      card.style.animationDelay = `${i * 0.1}s`;
    } else {
      card.style.animation = 'none';
      card.style.opacity = '1';
      card.style.transform = 'none';
    }

    card.innerHTML = `
      <div class="thesis-card__image">
        <img src="${thesis.thumbnail}" alt="${thesis.title}" class="thesis-card__thumbnail" loading="lazy">
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

  // Update counters and arrows
  projectCount.textContent = `${filtered.length} PROYECTO${filtered.length !== 1 ? 'S' : ''}`;
  const pageIndicator = document.getElementById('pageIndicator');
  if (pageIndicator) pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;

  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  if (prevBtn) prevBtn.disabled = currentPage === 0;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;

  bindCursorHover();
}

function slideGallery(direction) {
  const filtered = getFilteredTheses();
  const totalPages = getTotalPages(filtered);
  const newPage = currentPage + direction;

  if (newPage < 0 || newPage >= totalPages) return;

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
      renderGallery(false);
    }, 200);
  });
});

// ---- MODAL ----
function openModal(thesis) {
  document.getElementById('modalCover').innerHTML = `<img src="${thesis.thumbnail}" alt="${thesis.title}" style="width:100%;height:100%;object-fit:cover;">`;
  document.getElementById('modalCategory').textContent = thesis.categoryLabel;
  document.getElementById('modalTitle').textContent = thesis.title;
  document.getElementById('modalStudent').textContent = thesis.student;
  document.getElementById('modalTutor').textContent = thesis.tutor;
  document.getElementById('modalYear').textContent = thesis.year;
  document.getElementById('modalAbstract').textContent = thesis.abstract;

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
    };
  }

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
  const heroWrap = document.querySelector('.hero__title-wrap');
  const footerBig = document.querySelector('.footer__big-text');
  const marquee = document.querySelector('.hero__marquee');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Hero parallax
    if (heroWrap && scrollY < window.innerHeight) {
      heroWrap.style.transform = `translateY(${scrollY * 0.15}px)`;
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

  // ---- Firebase helpers ----
  let pefProjectsCache = [];

  function getPefProjects() {
    return pefProjectsCache;
  }

  function savePefProjects(projects) {
    pefProjectsCache = projects;
    db.ref('pefProjects').set(projects);
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

  // ---- Feedback Table ----
  const pefTableBtn = document.getElementById('pefTableBtn');
  const pefTable = document.getElementById('pefTable');
  const pefTableBackdrop = document.getElementById('pefTableBackdrop');
  const pefTableClose = document.getElementById('pefTableClose');
  const pefTableBody = document.getElementById('pefTableBody');

  let feedbackCache = [];

  db.ref('pefFeedback').on('value', (snapshot) => {
    feedbackCache = snapshot.val() || [];
  });

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
          html += '<td>—</td>';
        }
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    pefTableBody.innerHTML = html;
  }

  pefTableBtn.addEventListener('click', openTable);
  pefTableClose.addEventListener('click', closeTable);
  pefTableBackdrop.addEventListener('click', closeTable);

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

    // Save feedback to Firebase
    const newFeedback = {
      id: 'fb_' + Date.now(),
      projectId,
      profName,
      feedback: fbText,
      interest: interest.value,
      createdAt: new Date().toISOString()
    };
    const allFeedback = [...feedbackCache, newFeedback];
    db.ref('pefFeedback').set(allFeedback);

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
      if (pefTable.classList.contains('open')) closeTable();
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

// ---- INIT ----
// ---- THESIS REEL ----
function initThesisReel() {
  const reel = document.getElementById('thesisReel');
  if (!reel) return;
  const items = theses.map(t =>
    `<div class="about__strip-item"><img src="${t.thumbnail}" alt="${t.title}" loading="lazy"></div>`
  ).join('');
  // Duplicate for seamless loop
  reel.innerHTML = items + items;
}

// ============================================
// ADMIN SYSTEM — Projects & Awards Management
// ============================================
function initAdmin() {
  const ADMIN_PASSWORD = 'pefpr26';

  // ---- DOM ----
  const adminBtn = document.getElementById('adminBtn');
  const adminGate = document.getElementById('adminGate');
  const adminGateBackdrop = document.getElementById('adminGateBackdrop');
  const adminGateClose = document.getElementById('adminGateClose');
  const adminGateForm = document.getElementById('adminGateForm');
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

  let adminAuthenticated = sessionStorage.getItem('adminAuth') === 'true';

  // ---- Firebase helpers ----
  let dynamicProjectsCache = [];
  let dynamicAwardsCache = [];

  function getDynamicProjects() { return dynamicProjectsCache; }
  function saveDynamicProjects(p) {
    dynamicProjectsCache = p;
    db.ref('ldgProjects').set(p);
  }

  function getDynamicAwards() { return dynamicAwardsCache; }
  function saveDynamicAwards(a) {
    dynamicAwardsCache = a;
    db.ref('ldgAwards').set(a);
  }

  // Listen for real-time updates
  db.ref('ldgProjects').on('value', (snapshot) => {
    dynamicProjectsCache = snapshot.val() || [];
    // Reload dynamic projects into theses array
    theses = theses.filter(t => !t.id || !t.id.startsWith('dyn_'));
    loadDynamicProjects();
    renderGallery(false);
    initThesisReel();
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

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
          <span class="admin-panel__list-item-meta">${escapeHtml(p.student)} · ${p.semester}</span>
        </div>
        <button class="admin-panel__list-item-delete" data-id="${p.id}" data-type="project">ELIMINAR</button>
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
        initThesisReel();
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
        <button class="admin-panel__list-item-delete" data-id="${a.id}" data-type="award">ELIMINAR</button>
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
    if (adminAuthenticated) { openAdminPanel(); return; }
    adminGate.classList.add('open');
    document.body.classList.add('modal-open');
    adminGatePass.focus();
  }

  function closeAdminGate() {
    adminGate.classList.remove('open');
    document.body.classList.remove('modal-open');
    adminGateError.textContent = '';
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

  adminGateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (adminGatePass.value !== ADMIN_PASSWORD) {
      adminGateError.textContent = '⚠ Contraseña incorrecta';
      return;
    }
    adminAuthenticated = true;
    sessionStorage.setItem('adminAuth', 'true');
    openAdminPanel();
  });

  adminPanelClose.addEventListener('click', closeAdminPanel);
  adminPanelBackdrop.addEventListener('click', closeAdminPanel);

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

    // Add to live theses array
    const categoryLabels = { branding: 'BRANDING', editorial: 'EDITORIAL', packaging: 'PACKAGING', motion: 'MOTION', uiux: 'UI/UX', identidad: 'IDENTIDAD' };
    theses.push({
      ...project,
      year: parseInt(project.year),
      categoryLabel: categoryLabels[project.category] || project.category.toUpperCase()
    });

    adminProjectForm.classList.remove('open');
    adminProjectFormEl.reset();
    openAdminPanel();
    renderGallery();
    initThesisReel();
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
  renderGallery();
  initThesisReel();
  initScrollReveal();
  initParallax();
  initMagnetic();
  bindCursorHover();
  initFontCycling();
  initPefTalks();
});
