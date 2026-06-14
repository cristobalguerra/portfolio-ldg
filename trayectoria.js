// ============================================
// TRAYECTORIA · MESA DE REVISIÓN
// ============================================
// El accordion y el generador de PDF se inicializan SIEMPRE.
// Motion (contrato v2 de DESIGN.md), 3 capas:
//   1. Sin JS: todo visible (estados gateados por .ts-js).
//   2. JS sin GSAP (carga fallida): el modulo IO de abajo (.in + contadores).
//   3. GSAP presente: capa rica (ScrollSmoother + ScrollTrigger + SplitText +
//      DrawSVG) y el IO no arranca. Cero loops infinitos.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Estado compartido entre modulos (la capa GSAP lo llena si inicializa)
const TS = { smoother: null, onToggle: null };

// Scroll a un elemento librando el topline. Dentro de ScrollSmoother el
// scroll-margin-top deja de aplicar: el offset se calcula aqui con el alto
// real del topline; sin smoother se conserva el scrollIntoView de siempre.
function tsScrollToEl(el) {
  if (TS.smoother) {
    const bar = document.querySelector('.site-bar');
    const off = ((bar && bar.offsetHeight) || 60) + 14;
    TS.smoother.scrollTo(TS.smoother.offset(el, 'top ' + off + 'px'), !prefersReducedMotion);
  } else {
    // .ts-track-item / .ts-sec tienen scroll-margin-top para librar la barra fija
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }
}

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
    // Con ScrollSmoother el offset del topline lo pone tsScrollToEl;
    // sin smoother sigue siendo scrollIntoView + scroll-margin-top.
    tsScrollToEl(item);
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
      // Abrir/cerrar cambia la altura del documento: la capa GSAP refresca
      // sus ScrollTriggers cuando termina la transicion del panel.
      if (TS.onToggle) TS.onToggle();
    });
  });

  // Deep link: arriving with #id opens that track and scrolls to it
  const hashId = decodeURIComponent(window.location.hash.slice(1));
  const target = hashId ? document.getElementById(hashId) : null;
  if (target && target.classList.contains('ts-track-item')) {
    setOpen(target, true);
    window.setTimeout(() => scrollToItem(target), 150);
    // La capa GSAP (si existe) aun no corrio en este punto del script:
    // diferir el aviso de cambio de altura al siguiente tick.
    window.setTimeout(() => { if (TS.onToggle) TS.onToggle(); }, 0);
  }
})();

// ---- CAPA GSAP (Motion: contrato v2 de DESIGN.md) ----
// Si GSAP no llego (CDN-less, carga fallida), este modulo no arranca y el
// modulo IO de abajo es la rama else. gsap.matchMedia: reduced-motion = cero
// animacion GSAP (estado final directo); pointer coarse = sin smoother y los
// scrubs se simplifican a reveals one-shot (DESIGN.md: "En coarse/mobile:
// sin pin, reveals one-shot"). Sin pins en esta pagina: el pin IMCO vive en
// la home y el truco no se repite.
(function initGsapLayer() {
  if (!(window.gsap && window.ScrollTrigger)) return;
  const hasSmoother = !!window.ScrollSmoother;
  const hasSplit = !!window.SplitText;
  const hasDraw = !!window.DrawSVGPlugin;
  let mm = null;

  function fmt(v, dec, group) {
    if (dec) return v.toFixed(dec);
    const n = Math.round(v);
    return group ? n.toLocaleString('en-US') : String(n);
  }

  // Valor final EXACTO en todos los contadores ($18,768 · 95.1 · 25.4 · 83)
  function settleCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const v = parseFloat(el.getAttribute('data-count'));
      if (Number.isNaN(v)) return;
      el.textContent = fmt(v, parseInt(el.getAttribute('data-dec') || '0', 10), el.getAttribute('data-group') === '1');
    });
  }

  try {
    gsap.registerPlugin(ScrollTrigger);
    if (hasSmoother) gsap.registerPlugin(ScrollSmoother);
    if (hasSplit) gsap.registerPlugin(SplitText);
    if (hasDraw) gsap.registerPlugin(DrawSVGPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.defaults({ ease: 'quint.out', duration: 0.7 });

    // El stylesheet cede los estados iniciales a GSAP (ver bloque .ts-gsap)
    document.body.classList.add('ts-gsap');

    // SplitText y el hero esperan a las fuentes; con red lenta no se retiene
    // el contenido mas de 900ms (se anima con la fuente de fallback).
    const fontsReady = Promise.race([
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
      new Promise(r => { window.setTimeout(r, 900); })
    ]);

    // Delay heredado de las clases ts-d1..ts-d4 del fallback CSS
    const dlyOf = el => {
      const m = (el.getAttribute('class') || '').match(/ts-d(\d)/);
      return m ? parseInt(m[1], 10) * 0.08 : 0;
    };
    // .ts-gs marca todo lo que GSAP oculta inline: print y reduced-motion lo
    // fuerzan a estado final via CSS aunque el inline style diga opacity 0.
    const mark = el => { if (el) el.classList.add('ts-gs'); return el; };

    mm = gsap.matchMedia();
    mm.add({
      base: 'all',
      reduce: '(prefers-reduced-motion: reduce)',
      coarse: '(pointer: coarse)'
    }, (ctx) => {
      const { reduce, coarse } = ctx.conditions;

      // Reduced motion: cero animacion GSAP. La CSS de .ts-gsap ya entrega
      // todo en estado final y los contadores conservan su valor del HTML.
      if (reduce) return;

      let alive = true;
      let ro = null;
      const splits = [];

      // ---------- ScrollSmoother: solo pointer fine ----------
      if (hasSmoother && !coarse) {
        const topline = document.querySelector('.ts-topline');
        const setToplineH = () => {
          document.body.style.setProperty('--ts-topline-h', ((topline && topline.offsetHeight) || 54) + 'px');
        };
        setToplineH();
        document.body.classList.add('ts-smooth');
        TS.smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1,
          effects: true,
          smoothTouch: 0
        });
        if (topline && 'ResizeObserver' in window) {
          ro = new ResizeObserver(setToplineH);
          ro.observe(topline);
        }
      }

      // ---------- HOJA 01 · entrada del hero (one-shot) ----------
      const hero = document.querySelector('.ts-hero');
      if (hero) {
        const eyebrow = mark(hero.querySelector('.ts-eyebrow--mark'));
        const h1Lines = gsap.utils.toArray('.ts-h1 .ts-ln i');
        const h1Hl = gsap.utils.toArray('.ts-h1 .ts-hl');
        const ldg = hero.querySelector('.ts-h1 em');
        const cotaLine = document.querySelector('.ts-cota__line');
        const cotaTicks = gsap.utils.toArray('.ts-cota__tick');
        const tickStrokes = gsap.utils.toArray('.ts-cota__tick line');
        const cotaLbl = mark(document.querySelector('.ts-cota__lbl'));
        const lede = mark(document.querySelector('.ts-lede'));
        const actions = mark(document.querySelector('.ts-hero__actions'));
        const stamp = mark(document.querySelector('.ts-stamp'));
        const regStrokes = gsap.utils.toArray('.ts-ctrlbar__reg circle, .ts-ctrlbar__reg line');
        const chips = gsap.utils.toArray('.ts-ctrlbar__chip');

        // Estados iniciales en el mismo tick de script: sin flash posible
        const fade = [eyebrow, lede, actions].filter(Boolean);
        if (fade.length) gsap.set(fade, { autoAlpha: 0, y: 16 });
        if (h1Lines.length) gsap.set(h1Lines, { yPercent: 110 });
        if (h1Hl.length) gsap.set(h1Hl, { backgroundSize: '0% .84em' });
        if (cotaLine) gsap.set(cotaLine, { scaleX: 0, transformOrigin: 'left center' });
        if (hasDraw && tickStrokes.length) gsap.set(tickStrokes, { drawSVG: '50% 50%' });
        else if (cotaTicks.length) gsap.set(cotaTicks, { scaleY: 0, transformOrigin: 'top center' });
        if (cotaLbl) gsap.set(cotaLbl, { autoAlpha: 0 });
        if (stamp) gsap.set(stamp, { autoAlpha: 0, scale: 1.15 });
        if (chips.length) gsap.set(chips, { autoAlpha: 0 });
        if (hasDraw && regStrokes.length) gsap.set(regStrokes, { drawSVG: '0%' });

        fontsReady.then(() => {
          if (!alive) return;
          ctx.add(() => {
            const tl = gsap.timeline({ defaults: { ease: 'quint.out' } });
            if (chips.length) tl.to(chips, { autoAlpha: 1, duration: .3, stagger: .06 }, 0);
            if (hasDraw && regStrokes.length) tl.to(regStrokes, { drawSVG: '0% 100%', duration: .6, stagger: .12 }, .05);
            if (eyebrow) tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: .6 }, .1);
            if (h1Lines.length) tl.to(h1Lines, { yPercent: 0, duration: .9, stagger: .1 }, .2);
            if (h1Hl.length) tl.to(h1Hl, { backgroundSize: '100% .84em', duration: .7 }, .75);
            // El "LDG." en Spectral italica asienta solo, tras subir su linea
            if (ldg) tl.from(ldg, { yPercent: 26, rotation: 2.4, transformOrigin: 'left bottom', duration: .7 }, .62);
            if (cotaLine) tl.to(cotaLine, { scaleX: 1, duration: .8 }, .85);
            if (hasDraw && tickStrokes.length) tl.to(tickStrokes, { drawSVG: '0% 100%', duration: .35 }, 1.5);
            else if (cotaTicks.length) tl.to(cotaTicks, { scaleY: 1, duration: .35 }, 1.5);
            if (cotaLbl) tl.to(cotaLbl, { autoAlpha: 1, duration: .4 }, 1.6);
            if (lede) tl.to(lede, { autoAlpha: 1, y: 0, duration: .7 }, .8);
            if (actions) tl.to(actions, { autoAlpha: 1, y: 0, duration: .7 }, .95);
            if (stamp) tl.to(stamp, { autoAlpha: 1, scale: 1, duration: .45 }, 1.1);
          });
        }).catch(() => {});
      }

      // ---------- H2 por lineas con mascara (SplitText tras fonts.ready) ----------
      const heads = gsap.utils.toArray('.ts-sec-head');
      if (heads.length) {
        fontsReady.then(() => {
          if (!alive) return;
          ctx.add(() => {
            heads.forEach(head => {
              const no = mark(head.querySelector('.ts-sec-no'));
              const h2 = head.querySelector('.ts-h2');
              const tlh = gsap.timeline({
                scrollTrigger: { trigger: head, start: 'clamp(top 86%)', once: true }
              });
              if (no) tlh.from(no, { autoAlpha: 0, x: -12, duration: .5 }, 0);
              let splitOk = false;
              if (h2 && hasSplit) {
                try {
                  const split = SplitText.create(h2, { type: 'lines', mask: 'lines', linesClass: 'ts-split-ln' });
                  splits.push(split);
                  tlh.from(split.lines, {
                    yPercent: 110, duration: .8, stagger: .1,
                    onComplete: () => {
                      // DOM limpio tras animar: el texto vuelve a ser uno solo
                      split.revert();
                      const i = splits.indexOf(split);
                      if (i > -1) splits.splice(i, 1);
                    }
                  }, .08);
                  splitOk = true;
                } catch (e) { /* fallback abajo */ }
              }
              if (h2 && !splitOk) {
                mark(h2);
                tlh.from(h2, { autoAlpha: 0, y: 18, duration: .7 }, .08);
              }
            });
          });
        }).catch(() => {});
      }

      // ---------- Reveals genericos (.ts-rv) con el stagger de ts-dN ----------
      gsap.utils.toArray('.ts-rv').forEach(el => {
        if (el.classList.contains('ts-sec-head')) return; // lo lleva SplitText
        mark(el);
        gsap.from(el, {
          autoAlpha: 0, y: 16, duration: .7, delay: dlyOf(el),
          scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true }
        });
      });

      // ---------- HOJA 02 · statement con banda marcadora ----------
      const stTitle = document.querySelector('.ts-statement__title');
      if (stTitle) {
        mark(stTitle);
        const bands = gsap.utils.toArray('.ts-statement__title .ts-hl');
        if (bands.length) gsap.set(bands, { backgroundSize: '0% .84em' });
        const tls = gsap.timeline({
          scrollTrigger: { trigger: stTitle, start: 'clamp(top 84%)', once: true }
        });
        tls.from(stTitle, { autoAlpha: 0, y: 24, duration: .8 }, 0);
        if (bands.length) tls.to(bands, { backgroundSize: '100% .84em', duration: .7 }, .45);
      }

      // ---------- Reglas y cotas: trazo de delineante ----------
      // fine: scrub 1 (avanzas y se dibuja, regresas y se desdibuja);
      // coarse: one-shot. clamp() evita extremos sin recorrido.
      gsap.utils.toArray('.ts-drawx').forEach(line => {
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        if (coarse) {
          gsap.to(line, {
            scaleX: 1, duration: .9, ease: 'quint.out',
            scrollTrigger: { trigger: line, start: 'clamp(top 90%)', once: true }
          });
        } else {
          gsap.to(line, {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: line, start: 'clamp(top 85%)', end: 'clamp(top 45%)', scrub: 1 }
          });
        }
      });

      // ---------- HOJA 04 · marcos de ficha trazados en secuencia ----------
      gsap.utils.toArray('.ts-track-item').forEach(item => {
        const ft = item.querySelector('.ts-f-t');
        const fr = item.querySelector('.ts-f-r');
        const fb = item.querySelector('.ts-f-b');
        const fl = item.querySelector('.ts-f-l');
        const corners = gsap.utils.toArray(item.querySelectorAll('.ts-corner'));
        const link = mark(item.querySelector('.ts-track-link'));

        if (ft) gsap.set(ft, { scaleX: 0, transformOrigin: 'left center' });
        if (fr) gsap.set(fr, { scaleY: 0, transformOrigin: 'top center' });
        if (fb) gsap.set(fb, { scaleX: 0, transformOrigin: 'right center' });
        if (fl) gsap.set(fl, { scaleY: 0, transformOrigin: 'bottom center' });
        if (corners.length) gsap.set(corners, { autoAlpha: 0 });
        if (link) gsap.set(link, { autoAlpha: 0, y: 10 });

        const tlf = gsap.timeline({
          defaults: { ease: coarse ? 'quint.out' : 'none' },
          scrollTrigger: coarse
            ? { trigger: item, start: 'clamp(top 88%)', once: true }
            : { trigger: item, start: 'clamp(top 88%)', end: 'clamp(top 45%)', scrub: 1 }
        });
        if (ft) tlf.to(ft, { scaleX: 1, duration: .32 }, 0);
        if (fr) tlf.to(fr, { scaleY: 1, duration: .32 }, .26);
        if (fb) tlf.to(fb, { scaleX: 1, duration: .32 }, .52);
        if (fl) tlf.to(fl, { scaleY: 1, duration: .32 }, .78);
        if (link) tlf.to(link, { autoAlpha: 1, y: 0, duration: .55 }, .8);
        if (corners.length) tlf.to(corners, { autoAlpha: 1, duration: .25 }, 1.0);
      });

      // ---------- Fotos de egresados: mascara de revelado desde abajo ----------
      gsap.utils.toArray('.ts-track-detail__photo img').forEach(img => {
        mark(img);
        const photoBox = img.closest('.ts-track-detail__photo');
        gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' });
        if (coarse) {
          gsap.to(img, {
            clipPath: 'inset(0% 0% 0% 0%)', duration: .9, ease: 'quint.out',
            scrollTrigger: { trigger: photoBox, start: 'clamp(top 92%)', once: true }
          });
        } else {
          gsap.to(img, {
            clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
            scrollTrigger: { trigger: photoBox, start: 'clamp(top 94%)', end: 'clamp(top 72%)', scrub: 1 }
          });
        }
      });

      // ---------- HOJA 03 · contadores IMCO one-shot exactos (SIN pin) ----------
      gsap.utils.toArray('.ts-data-row').forEach(row => {
        const counters = gsap.utils.toArray(row.querySelectorAll('[data-count]'));
        if (!counters.length) return;
        ScrollTrigger.create({
          trigger: row, start: 'clamp(top 85%)', once: true,
          onEnter: () => counters.forEach(el => {
            const target = parseFloat(el.getAttribute('data-count'));
            if (Number.isNaN(target)) return;
            const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
            const group = el.getAttribute('data-group') === '1';
            const state = { v: 0 };
            gsap.to(state, {
              v: target, duration: 1.4, ease: 'quint.out',
              onUpdate: () => { el.textContent = fmt(state.v, dec, group); },
              onComplete: () => { el.textContent = fmt(target, dec, group); }
            });
          })
        });
      });

      // Limpieza del contexto (cambio de condicion de media query)
      return () => {
        alive = false;
        if (ro) ro.disconnect();
        TS.smoother = null;
        document.body.classList.remove('ts-smooth');
        document.body.style.removeProperty('--ts-topline-h');
        splits.forEach(s => { try { s.revert(); } catch (e) { /* noop */ } });
        splits.length = 0;
        settleCounters();
      };
    });

    // ---- Integraciones fuera de matchMedia (validas en todo contexto) ----

    // Abrir/cerrar fichas cambia la altura del documento: refresh diferido
    // hasta que la transicion de grid-template-rows (.45s) termina.
    let refreshT = 0;
    TS.onToggle = function () {
      window.clearTimeout(refreshT);
      refreshT = window.setTimeout(() => { ScrollTrigger.refresh(); }, 520);
    };

    // Overlay PDF: al mostrarse se pausa el smoother; al ocultarse, vuelve.
    const overlay = document.getElementById('pdfOverlay');
    if (overlay && 'MutationObserver' in window) {
      new MutationObserver(() => {
        if (TS.smoother) TS.smoother.paused(!overlay.hidden);
      }).observe(overlay, { attributes: true, attributeFilter: ['hidden'] });
    }

    // Hash al cargar: las fichas las atiende el accordion (tsScrollToEl);
    // cualquier otra ancla se reubica con el offset del topline tras refresh.
    const hashId = decodeURIComponent((window.location.hash || '').slice(1));
    if (hashId) {
      const hashTarget = document.getElementById(hashId);
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        if (hashTarget && !hashTarget.classList.contains('ts-track-item')) tsScrollToEl(hashTarget);
      }, 700);
    }

    // El swap de fuentes mueve la metrica: recalibrar triggers.
    fontsReady.then(() => { ScrollTrigger.refresh(); }).catch(() => {});

    window.__TS_GSAP_OK = true;
  } catch (err) {
    // Produccion: cualquier fallo revierte la capa y deja arrancar al IO.
    window.__TS_GSAP_OK = false;
    if (mm) { try { mm.revert(); } catch (e) { /* noop */ } }
    document.body.classList.remove('ts-gsap', 'ts-smooth');
    document.body.style.removeProperty('--ts-topline-h');
    settleCounters();
    if (window.console && console.error) console.error('Capa GSAP desactivada; fallback IO:', err);
  }
})();

// ---- MOTION: IO unico + contadores (patron DESIGN.md) ----
// Un solo IntersectionObserver agrega .in (las coreografias viven en CSS con
// delays) y dispara los contadores data-count; unobserve tras entrar.
// Rama else del contrato v2: solo arranca si la capa GSAP no inicializo.
(function initMotion() {
  if (window.__TS_GSAP_OK) return;
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
