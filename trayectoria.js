// ============================================
// TRAYECTORIA · MESA DE REVISIÓN
// ============================================
// El accordion y el generador de PDF se inicializan SIEMPRE.
// Motion: un solo IntersectionObserver (contrato DESIGN.md) que reparte .in
// y dispara contadores; las coreografias viven en CSS. Sin GSAP ni
// ScrollTrigger: menos dependencias y cero animaciones infinitas.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- DOWNLOAD PDF GUIDE ----
// Builds a branded A4 document from the live track content and exports it as a
// PDF file that downloads immediately (no browser print dialog).
// html2canvas + jsPDF (~600KB) are NOT loaded with the page: they are injected
// on the first click so they never block initial load.
(function initPdfGuide() {
  const buttons = document.querySelectorAll('#downloadPdfBtn, #downloadPdfBtn2');
  if (!buttons.length) return;

  const overlay = document.getElementById('pdfOverlay');
  const guideDoc = document.getElementById('guideDoc');
  const overlayText = overlay.querySelector('.pdf-overlay__text');
  const overlaySpinner = overlay.querySelector('.pdf-overlay__spinner');
  const cancelBtn = document.getElementById('pdfCancelBtn');

  // Increments on every export/cancel; an in-flight export aborts silently
  // when its token goes stale.
  let exportToken = 0;
  let libsPromise = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('No se pudo cargar ' + src));
      document.head.appendChild(s);
    });
  }

  // Lazy-load html2canvas + jsPDF on first use; cached after the first success,
  // retryable after a failure.
  function loadPdfLibs() {
    if (typeof html2canvas !== 'undefined' && window.jspdf) return Promise.resolve();
    if (!libsPromise) {
      libsPromise = Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      ]).catch(err => {
        libsPromise = null;
        throw err;
      });
    }
    return libsPromise;
  }

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
        <span>[ 2026 · Edición 01 ]</span>
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

  function setOverlayText(msg) {
    if (overlayText) overlayText.textContent = msg;
  }

  function resetOverlay() {
    overlay.hidden = true;
    if (overlayText) overlayText.textContent = 'GENERANDO GUÍA PDF…';
    if (overlaySpinner) overlaySpinner.style.display = '';
  }

  // Error messages persist until the user dismisses them (CANCELAR);
  // only non-error messages auto-dismiss after 3.5s.
  function showOverlayMessage(msg, isError) {
    setOverlayText(msg);
    if (overlaySpinner) overlaySpinner.style.display = 'none';
    overlay.hidden = false;
    if (!isError) {
      window.setTimeout(resetOverlay, 3500);
    }
  }

  function cleanupExport() {
    guideDoc.classList.remove('is-exporting');
    guideDoc.innerHTML = '';
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      exportToken++; // any export in flight becomes stale and aborts
      cleanupExport();
      resetOverlay();
    });
  }

  async function downloadPdf() {
    const token = ++exportToken;
    overlay.hidden = false;

    // No window.print() fallback anywhere; the print dialog must never open
    // from this flow (the IMPRIMIR button is the explicit print path).
    if (typeof html2canvas === 'undefined' || !window.jspdf) {
      setOverlayText('CARGANDO GENERADOR…');
      try {
        await loadPdfLibs();
      } catch (err) {
        console.error('PDF libs failed to load', err);
        if (token !== exportToken) return;
        showOverlayMessage('NO SE PUDO CARGAR EL GENERADOR DE PDF. REVISA TU CONEXIÓN.', true);
        return;
      }
      if (token !== exportToken) return;
      setOverlayText('GENERANDO GUÍA PDF…');
    }

    window.scrollTo(0, 0);
    buildGuide();
    guideDoc.classList.add('is-exporting');

    await inlinePhotos();
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (token !== exportToken) return; // cancelled while preparing

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pages = [...guideDoc.querySelectorAll('.guide-page')];
      const A4_W = 210, A4_H = 297;
      const pageAspect = A4_W / A4_H;

      for (let i = 0; i < pages.length; i++) {
        if (token !== exportToken) return; // cancelled mid-generation
        // Capture each page at its NATURAL height (no fixed height clip) so long
        // profiles are never cut off.
        const el = pages[i];
        const naturalH = el.scrollHeight;
        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: '#F1ECDF',
          useCORS: true,
          logging: false,
          width: 794,
          height: naturalH,
          windowWidth: 794,
          windowHeight: naturalH
        });
        if (token !== exportToken) return;
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        if (i > 0) pdf.addPage();

        // Fondo papel para que los margenes del contain-fit se fundan con la hoja
        pdf.setFillColor(241, 236, 223);
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

      if (token !== exportToken) return;
      pdf.save('Trayectoria-Profesional-LDG.pdf');
      cleanupExport();
      resetOverlay();
    } catch (err) {
      // Technical detail goes to the console only; the UI shows a clear message
      console.error('PDF export failed', err);
      if (token !== exportToken) return; // cancelled: the cancel handler already cleaned up
      cleanupExport();
      showOverlayMessage('NO SE PUDO GENERAR EL PDF. INTENTA DE NUEVO O USA EL BOTÓN IMPRIMIR.', true);
    }
  }

  buttons.forEach(btn => btn.addEventListener('click', downloadPdf));
})();

// ---- PRINT BUTTONS ----
// window.print() uses the @media print stylesheet in trayectoria.css
// (accordions abiertos, hoja en papel).
(function initPrintButtons() {
  document.querySelectorAll('#printBtn, #printBtn2').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });
})();

// ---- ACCORDION (track items expand inline) ----
// Single-open behavior: opening one closes any other. Click again to close.
// Each item has a stable id (e.g. #freelance) so profiles can be deep-linked
// from presentations; the hash stays in sync via history.replaceState.
(function initTrackAccordion() {
  const items = document.querySelectorAll('.ts-track-item');
  if (!items.length) return;

  function setOpen(item, open) {
    item.dataset.state = open ? 'open' : 'closed';
    const btn = item.querySelector('.ts-track-link');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function scrollToItem(item) {
    // .ts-track-item has scroll-margin-top so the header clears the sticky topline
    item.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
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
        if (item.id) history.replaceState(null, '', '#' + item.id);
        // Smooth scroll the header into view after the panel starts opening
        window.setTimeout(() => scrollToItem(item), 80);
      } else if (item.id && window.location.hash === '#' + item.id) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  // Deep link: arriving with #id opens that track and scrolls to it
  const hashId = decodeURIComponent(window.location.hash.slice(1));
  const target = hashId ? document.getElementById(hashId) : null;
  if (target && target.classList.contains('ts-track-item')) {
    setOpen(target, true);
    window.setTimeout(() => scrollToItem(target), 150);
  }
})();

// ---- MOTION: IO unico + contadores (patron DESIGN.md) ----
// Un solo IntersectionObserver agrega .in (las coreografias viven en CSS con
// delays) y dispara los contadores data-count; unobserve tras entrar.
(function initMotion() {
  function fmt(v, dec, group) {
    if (dec) return v.toFixed(dec);
    const n = Math.round(v);
    return group ? n.toLocaleString('en-US') : String(n);
  }

  function runCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    const group = el.getAttribute('data-group') === '1';
    if (Number.isNaN(target)) return;
    if (prefersReducedMotion) { el.textContent = fmt(target, dec, group); return; }
    const dur = 1400;
    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 5); // easeOutQuint
      el.textContent = fmt(target * e, dec, group);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target, dec, group);
    }
    requestAnimationFrame(step);
  }

  const targets = document.querySelectorAll('[data-io]');
  if (!targets.length) return;

  // Reduced motion (o entorno sin IntersectionObserver): todo en estado
  // final, contadores en su valor exacto.
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => {
      el.classList.add('in');
      el.querySelectorAll('[data-count]').forEach(el2 => {
        const v = parseFloat(el2.getAttribute('data-count'));
        const dec = parseInt(el2.getAttribute('data-dec') || '0', 10);
        const group = el2.getAttribute('data-group') === '1';
        if (!Number.isNaN(v)) el2.textContent = fmt(v, dec, group);
      });
    });
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('[data-count]').forEach(runCounter);
      io.unobserve(en.target);
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => io.observe(el));
})();
