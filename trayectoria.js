// ============================================
// TRAYECTORIA — GSAP EDITORIAL
// ============================================

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- DOWNLOAD PDF GUIDE ----
// Builds a branded A4 document from the live track content and exports it as a
// PDF file that downloads immediately (no browser print dialog).
(function initPdfGuide() {
  const buttons = document.querySelectorAll('#downloadPdfBtn, #downloadPdfBtn2');
  if (!buttons.length) return;

  const overlay = document.getElementById('pdfOverlay');
  const guideDoc = document.getElementById('guideDoc');

  function esc(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Pull structured data from a single .ts-track-item in the DOM
  function readItem(item) {
    const labelFull = item.querySelector('.ts-track-link__label')?.textContent.trim() || '';
    const m = labelFull.match(/^(\d+)\s*\/\s*(.+)$/);
    const num = m ? m[1] : '';
    const path = m ? m[2] : labelFull;

    const name = item.querySelector('.ts-track-detail__name')?.textContent.trim() || '';
    const role = item.querySelector('.ts-track-detail__role')?.textContent.trim() || '';
    const photo = item.querySelector('.ts-track-detail__photo img')?.getAttribute('src') || '';

    // Blocks: read each detail block, keep its label + inner HTML (preserve <em>)
    const blocks = [];
    item.querySelectorAll('.ts-track-detail__block').forEach(b => {
      const label = b.querySelector('.ts-eyebrow')?.textContent.trim() || '';
      const paras = [...b.querySelectorAll('p')].map(p => p.innerHTML);
      const skills = [...b.querySelectorAll('.ts-list li')].map(li => li.textContent.trim());
      blocks.push({ label, paras, skills });
    });

    const stats = [...item.querySelectorAll('.ts-track-detail__stat')].map(s => ({
      label: s.querySelector('.mono-sm')?.textContent.trim() || '',
      value: s.querySelector('.ts-track-detail__stat-value')?.textContent.trim() || ''
    }));

    return { num, path, name, role, photo, blocks, stats };
  }

  // Convert .ts <em> highlight markup to guide markup
  function convertEm(html) {
    return html.replace(/<em>/g, '<span class="guide-mark">').replace(/<\/em>/g, '</span>');
  }

  function buildProfilePage(d) {
    const blocksHtml = d.blocks.map(b => {
      if (b.skills.length) {
        return `<div class="guide-block">
          <span class="guide-block__label">${esc(b.label)}</span>
          <ul class="guide-skills">${b.skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>`;
      }
      const paras = b.paras.map(p => `<p>${convertEm(p)}</p>`).join('');
      return `<div class="guide-block">
        <span class="guide-block__label">${esc(b.label)}</span>
        ${paras}
      </div>`;
    }).join('');

    const statsHtml = d.stats.length ? `<div class="guide-stats">${d.stats.map(s => `
      <div class="guide-stat">
        <span class="guide-stat__label">${esc(s.label)}</span>
        <span class="guide-stat__value">${esc(s.value)}</span>
      </div>`).join('')}</div>` : '';

    const photoHtml = d.photo ? `<div class="guide-profile__photo" style="background-image:url('${d.photo}')" role="img" aria-label="${esc(d.name)}"></div>` : '';

    // Reorder: PERFIL block(s) first, then stats, then the rest (habilidades, clientes)
    return `<section class="guide-page guide-profile">
      <p class="guide-profile__num">${esc(d.num)}</p>
      <span class="guide-profile__path">${esc(d.path)}</span>
      <div class="guide-profile__head">
        ${photoHtml}
        <div class="guide-profile__id">
          <h2 class="guide-profile__name">${esc(d.name)}</h2>
          <p class="guide-profile__role">${esc(d.role)}</p>
        </div>
      </div>
      ${d.blocks.filter(b => /PERFIL/i.test(b.label)).map(b => `<div class="guide-block"><span class="guide-block__label">${esc(b.label)}</span>${b.paras.map(p => `<p>${convertEm(p)}</p>`).join('')}</div>`).join('')}
      ${statsHtml}
      ${d.blocks.filter(b => !/PERFIL/i.test(b.label)).map(b => {
        if (b.skills.length) {
          return `<div class="guide-block"><span class="guide-block__label">${esc(b.label)}</span><ul class="guide-skills">${b.skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`;
        }
        return `<div class="guide-block"><span class="guide-block__label">${esc(b.label)}</span>${b.paras.map(p => `<p>${convertEm(p)}</p>`).join('')}</div>`;
      }).join('')}
      <div class="guide-profile__footer">
        <span>Trayectoria Profesional · LDG UDEM</span>
        <span>portfolioldg.com</span>
      </div>
    </section>`;
  }

  function buildGuide() {
    const items = [...document.querySelectorAll('.ts-track-item')].filter(
      it => !it.classList.contains('ts-track-item--pending')
    );
    const count = items.length;

    const cover = `<section class="guide-page guide-cover">
      <div class="guide-cover__top">
        <span>Guía para padres / alumnos / dirección</span>
        <span>[ 2026 — Edición 01 ]</span>
      </div>
      <div>
        <h1 class="guide-cover__title">Trayectoria profesional del <span class="guide-mark">LDG</span>.</h1>
        <p class="guide-cover__lead">${count} caminos reales que recorren nuestros egresados al terminar la Licenciatura en Diseño Gráfico de la Universidad de Monterrey.</p>
      </div>
      <div class="guide-cover__meta">
        <span>Licenciatura en Diseño Gráfico</span>
        <span>Universidad de Monterrey</span>
        <span>portfolioldg.com</span>
      </div>
    </section>`;

    const profiles = items.map(it => buildProfilePage(readItem(it))).join('');

    const closing = `<section class="guide-page guide-closing">
      <span class="guide-eyebrow">Una carrera, ${count} destinos</span>
      <p class="guide-closing__statement">LDG no forma <span class="guide-mark">un solo perfil profesional</span>: forma diseñadores capaces de moverse entre la creación visual, la <span class="guide-mark">estrategia</span>, la <span class="guide-mark">dirección</span> y la gestión de proyectos para distintos contextos de la industria creativa.</p>
      <span class="guide-closing__cta">Más trayectorias en <a href="https://portfolioldg.com">portfolioldg.com</a></span>
    </section>`;

    guideDoc.innerHTML = cover + profiles + closing;
  }

  // Inline photos as data URIs before rasterizing. This makes the guide
  // self-contained for html2canvas and avoids tainted-canvas / CORS failures
  // (which break canvas.toDataURL and abort the whole export).
  async function inlinePhotos() {
    const els = [...guideDoc.querySelectorAll('.guide-profile__photo')];
    await Promise.all(els.map(async el => {
      const m = el.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (!m) return;
      const src = m[1];
      if (src.startsWith('data:')) return;
      try {
        const resp = await fetch(src);
        const blob = await resp.blob();
        const dataUri = await new Promise((res, rej) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result);
          fr.onerror = rej;
          fr.readAsDataURL(blob);
        });
        el.style.backgroundImage = `url('${dataUri}')`;
      } catch (e) {
        // Leave the original URL; html2canvas will still try to load it
        console.warn('No se pudo incrustar la foto', src, e);
      }
    }));
  }

  function showOverlayMessage(msg) {
    const textEl = overlay.querySelector('.pdf-overlay__text');
    const spinner = overlay.querySelector('.pdf-overlay__spinner');
    if (textEl) textEl.textContent = msg;
    if (spinner) spinner.style.display = 'none';
    overlay.hidden = false;
    window.setTimeout(() => {
      overlay.hidden = true;
      if (textEl) textEl.textContent = 'GENERANDO GUÍA PDF…';
      if (spinner) spinner.style.display = '';
    }, 3500);
  }

  async function downloadPdf() {
    // No window.print() fallback anywhere — the print dialog must never open.
    if (typeof html2canvas === 'undefined' || !window.jspdf) {
      showOverlayMessage('NO SE PUDO CARGAR EL GENERADOR DE PDF. REVISA TU CONEXIÓN.');
      return;
    }
    overlay.hidden = false;
    window.scrollTo(0, 0);
    buildGuide();
    guideDoc.classList.add('is-exporting');

    await inlinePhotos();
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pages = [...guideDoc.querySelectorAll('.guide-page')];
      const A4_W = 210, A4_H = 297;
      const pageAspect = A4_W / A4_H;

      for (let i = 0; i < pages.length; i++) {
        // Capture each page at its NATURAL height (no fixed height clip) so long
        // profiles are never cut off.
        const el = pages[i];
        const naturalH = el.scrollHeight;
        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: '#050505',
          useCORS: true,
          logging: false,
          width: 794,
          height: naturalH,
          windowWidth: 794,
          windowHeight: naturalH
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        if (i > 0) pdf.addPage();

        // Dark page background so contain-fit margins blend with the design
        pdf.setFillColor(5, 5, 5);
        pdf.rect(0, 0, A4_W, A4_H, 'F');

        // Contain-fit: scale the page image to fit fully inside A4, centered
        const imgAspect = canvas.width / canvas.height;
        let w, h;
        if (imgAspect > pageAspect) { w = A4_W; h = A4_W / imgAspect; }
        else { h = A4_H; w = A4_H * imgAspect; }
        const x = (A4_W - w) / 2;
        const y = (A4_H - h) / 2;
        pdf.addImage(imgData, 'JPEG', x, y, w, h);
      }

      pdf.save('Trayectoria-Profesional-LDG.pdf');
      guideDoc.classList.remove('is-exporting');
      guideDoc.innerHTML = '';
      overlay.hidden = true;
    } catch (err) {
      console.error('PDF export failed', err);
      guideDoc.classList.remove('is-exporting');
      guideDoc.innerHTML = '';
      const detail = (err && (err.message || err.name)) ? String(err.message || err.name) : 'error desconocido';
      showOverlayMessage('PDF ERROR: ' + detail.slice(0, 120));
    }
  }

  buttons.forEach(btn => btn.addEventListener('click', downloadPdf));
})();

// ---- CUSTOM CURSOR — disabled on trayectoria.html ----
// Per design-taste-frontend rule "NO Custom Mouse Cursors".
// The shared cursor element is hidden via CSS scoped to .trayectoria-page.
// We skip JS init entirely so no listeners are wired up here.

// ---- HELPERS ----
function setReveal(selector, options = {}) {
  const els = document.querySelectorAll(selector);
  els.forEach(el => {
    const inners = el.querySelectorAll('.line-inner, .word-inner');
    if (inners.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(inners, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(inners, { yPercent: 110, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: options.start || 'top 85%',
      onEnter: () => {
        gsap.to(inners, {
          yPercent: 0,
          opacity: 1,
          duration: options.duration || 0.65,
          stagger: options.stagger || 0.04,
          ease: options.ease || 'expo.out'
        });
      },
      once: true
    });
  });
}

// ---- HERO ENTRANCE ----
function runHeroIntro() {
  if (prefersReducedMotion) {
    gsap.set('.ts-hero__top, .ts-hero__bottom', { opacity: 1, y: 0 });
    gsap.set('.ts-hero__title .ts-line__inner', { yPercent: 0 });
    gsap.set('.ts-hero__lead .word-inner', { yPercent: 0, opacity: 1 });
    return;
  }

  gsap.set('.ts-hero__top, .ts-hero__bottom', { opacity: 0, y: 12 });
  gsap.set('.ts-hero__title .ts-line__inner', { yPercent: 110 });
  gsap.set('.ts-hero__lead .word-inner', { yPercent: 110, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.to('.ts-hero__top', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });

  tl.to('.ts-hero__title .ts-line__inner', {
    yPercent: 0,
    duration: 1.0,
    stagger: 0.09,
    ease: 'expo.out'
  }, '-=0.3');

  tl.to('.ts-hero__lead .word-inner', {
    yPercent: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.03,
    ease: 'expo.out'
  }, '-=0.55');

  tl.to('.ts-hero__bottom', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
  }, '-=0.45');
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  runHeroIntro();
} else {
  document.addEventListener('DOMContentLoaded', runHeroIntro);
}

// ---- STATEMENT ----
setReveal('.ts-statement__title', { stagger: 0.05, duration: 0.7 });
if (prefersReducedMotion) {
  gsap.set('.ts-statement__sub', { opacity: 1, y: 0 });
} else {
  gsap.set('.ts-statement__sub', { opacity: 0, y: 20 });
  ScrollTrigger.create({
    trigger: '.ts-statement',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to('.ts-statement__sub', {
        opacity: 1, y: 0, duration: 0.65, delay: 0.3, ease: 'power3.out'
      });
    }
  });
}

// ---- TRACKS INTRO ----
setReveal('.ts-tracks-intro__title', { stagger: 0.08, duration: 0.75 });
if (prefersReducedMotion) {
  gsap.set('.ts-track-link', { opacity: 1, y: 0 });
} else {
  gsap.set('.ts-track-link', { opacity: 0, y: 12 });
  ScrollTrigger.create({
    trigger: '.ts-tracks-intro__list',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to('.ts-track-link', {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'expo.out', delay: 0.15
      });
    }
  });
}

// ---- ACCORDION (track items expand inline) ----
// Single-open behavior: opening one closes any other. Click again to close.
(function initTrackAccordion() {
  const items = document.querySelectorAll('.ts-track-item');
  if (!items.length) return;

  function setOpen(item, open) {
    item.dataset.state = open ? 'open' : 'closed';
    const btn = item.querySelector('.ts-track-link');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  items.forEach(item => {
    const btn = item.querySelector('.ts-track-link');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.dataset.state === 'open';
      // Close all
      items.forEach(other => setOpen(other, false));
      // Open this if it was closed
      if (!isOpen) {
        setOpen(item, true);
        // Smooth scroll the header into view after the panel starts opening
        window.setTimeout(() => {
          btn.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        }, 80);
      }
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  });
})();

// ---- MARQUEE INFINITE ----
const marqueeTrack = document.querySelector('.ts-marquee__track');
if (marqueeTrack && !prefersReducedMotion) {
  gsap.to(marqueeTrack, {
    xPercent: -50,
    duration: 40,
    ease: 'none',
    repeat: -1
  });
}

// ---- CTA ----
setReveal('.ts-cta__title', { stagger: 0.08, duration: 0.75 });
if (prefersReducedMotion) {
  gsap.set('.ts-cta__desc, .ts-cta .ts-btn', { opacity: 1, y: 0 });
} else {
  gsap.set('.ts-cta__desc, .ts-cta .ts-btn', { opacity: 0, y: 20 });
  ScrollTrigger.create({
    trigger: '.ts-cta',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to('.ts-cta__desc', {
        opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: 'power3.out'
      });
      gsap.to('.ts-cta .ts-btn', {
        opacity: 1, y: 0, duration: 0.55, delay: 0.5, ease: 'power3.out'
      });
    }
  });
}

// ---- BUTTON MAGNETIC HOVER ----
if (!prefersReducedMotion) {
  document.querySelectorAll('.ts-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

