# DESIGN.md · Sistema "Mesa de Revisión" (antes "Plano de Taller")

Sistema visual unificado de portfolioldg.com (home, trayectoria, guía PEF). Origen: dirección C confirmada por el director (2026-06-11); referencia viva en `/Volumes/Lexar/ldg-direcciones/direccion-c.html`. Concepto: el programa que evalúa con rúbricas y especificaciones se presenta como carpeta de revisión técnica **del taller de diseño/imprenta**. Registro: brand. Voz: UDEM hablando de su programa, nunca un estudio creativo.

## Lexicón (corrección 2026-06-11: el vocabulario es de DISEÑO GRÁFICO, no de arquitectura)

El director detectó que el léxico arquitectónico desviaba la lectura ("esto es de arquitectura"). El sistema visual se queda; las palabras cambian a las del taller de diseño e imprenta:

PROHIBIDO en copy visible: "plano", "escala"/"ESC 1:1", "ancho útil", y cualquier término de obra/construcción.
EN SU LUGAR: lámina, pliego, formato, specs reales de imprenta (74×120 cm · 300 dpi, CMYK, marcas de registro, sangrado), tiro/retiro, VoBo.

- H1 canónico de la home: "TESIS DE / DISEÑO GRÁFICO" (banda .hl sobre "DISEÑO GRÁFICO").
- Eyebrows: "LÁMINA 01 · ..." (nunca "PLANO 01").
- Etiquetas de cota (el componente visual se conserva): specs reales, p.ej. "FORMATO 74×120 CM · 300 DPI" (la spec real del entregable PEF) o conteos reales ("6 CAMINOS · 1 LICENCIATURA").
- Sellos: "VoBo · DIRECCIÓN · 2026", "ED. 01" (editoriales/académicos, nunca de obra).
- Cajetín: claves tipo PROYECTO/PROGRAMA/PERIODO/FORMATO/LÁMINA (nunca ESCALA/HOJA DE OBRA).

## Tokens (copiar literal)

```css
:root{
  --paper:#F1ECDF;     /* superficie papel crema */
  --paper-2:#E7E1D0;   /* papel sombreado, celdas alternas */
  --ink:#1B1612;       /* tinta casi-negra cálida: texto y líneas de plano */
  --ink-soft:#5C564A;  /* tinta secundaria */
  --yellow:#FFE000;    /* marcador UDEM: bandas hl, chips de sección, atención */
  --verm:#B23818;      /* vermilion: cotas, sellos, datos críticos (AA 4.5:1 sobre paper en texto pequeño) */
  --line:rgba(27,22,18,.16);   /* retícula */
  --line-2:rgba(27,22,18,.34); /* divisiones de cajetín */

  --disp:"Anton","Arial Narrow",sans-serif;             /* display, SIEMPRE weight 400 (Anton no tiene más) */
  --sans:"Atkinson Hyperlegible",system-ui,sans-serif;  /* prosa */
  --mono:"JetBrains Mono",ui-monospace,monospace;       /* specs, cotas, labels */
  --serif:"Spectral",Georgia,serif;                     /* itálica dosificada dentro de bandas hl */

  --t-hero:clamp(3.1rem,10.5vw,9.2rem);
  --t-h2:clamp(1.9rem,4.4vw,3.3rem);
  --t-num:clamp(2.6rem,6vw,4.6rem);
  --t-mono:.72rem;       /* piso absoluto de mono; nada menor */

  --ease:cubic-bezier(.22,1,.36,1);  /* ease-out-quint; único easing del sitio */
  --gut:clamp(18px,4.5vw,64px);
}
```

Nota #D2401E: el probe usa `#D2401E` para el vermilion; en producción el token es `#B23818` (contraste AA verificado 5.13:1 sobre paper). `#D2401E` solo se permite en trazos gruesos no textuales (bordes de sello ≥3px, ticks de cota) si se quiere más viveza.

## Reglas duras

- Nunca `#000`/`#fff` puros; nunca em dashes en copy (convención: `·`).
- Anton siempre `font-weight:400`; jamás faux-bold.
- Mono ≥ `--t-mono` (0.72rem). Prosa ≤ 75ch (ledes ≤ 46ch).
- Cero: gradient text, glassmorphism, mesh animado, grain animado, cursor custom, marquees infinitos, neón sobre negro, DM Sans/Inter/Space Grotesk, cards icono+título+texto idénticas, hero-metric SaaS (los datos van en cajetines/cotas, no en big-number-cards).
- Las animaciones nunca son infinitas; todo motion es de entrada/scroll, una sola vez (`io.unobserve` tras disparar).

## Componentes canónicos (implementación de referencia en direccion-c.html)

- **Retícula de plano**: `body::before` fijo con grid 56px de `--line`, opacity .5. Marco de hoja: `.sheet-in` con `border-left/right:2px solid var(--ink)`.
- **Topline**: barra documento con `LDG [UDEM]` (chip amarillo), rótulo `DOC · ...` mono, fecha. Border-bottom 2px ink.
- **Barra de control** (sustituye a la regla A·F de coordenadas, que era de plano arquitectónico): tira de control de imprenta bajo el topline de cada "hoja": chips de proceso CMYK de ~10px (C #00AEEF · M #EC008C · Y var(--yellow) · K var(--ink)), una cruz de registro (circulito + cruz en --ink, ~14px) y leyenda mono (p.ej. "FORMATO 74×120 CM · 300 DPI · CMYK"). Los tonos cian/magenta SOLO existen dentro de este artefacto (son tinta de proceso, no paleta de UI); tamaño chip ≤12px, una barra por hoja.
- **Banda marcadora `.hl`**: background-image linear-gradient amarillo, `background-size:0% .84em → 100%` con transición; `box-decoration-break:clone`.
- **Cota**: línea vermilion `scaleX(0→1)` origen left + ticks `scaleY` + etiqueta mono centrada sobre fondo paper (`ANCHO ÚTIL 100% · ESC 1:1`). Usar para subrayar datos y separar actos.
- **Cajetín**: grid de celdas `k` (mono soft) / `v` (sans 700 o Anton `.big`), bordes `--line-2`, border-top 2px ink. Es el contenedor de metadata por excelencia (hero, fichas de proyecto, footer).
- **Sello (`.rev-stamp`)**: borde 3px vermilion, mono 700 tracking .18em, `rotate(-6deg)`, fondo paper translúcido. Se estampa: `scale(1.15)→1` + opacity. Usos: REV/premios/distinciones.
- **Ficha** (card de tesis/proyecto): el marco SE TRAZA primero (4 `<i>` del `.frame`: top scaleX-left → right scaleY-top → bottom scaleX-right → left scaleY-bottom, delays escalonados ~.15s), corners vermilion aparecen, luego `.inner` sube con fade (delay .75s). Layout asimétrico en grid de 12 (1/8, 6/13, 2/10...), nunca grid uniforme.
- **Sec-no**: número de sección en chip amarillo mono + h2 Anton.
- **Contadores**: `data-count` + `data-dec` + `data-group`, easeOutQuint 1400ms, formato final exacto.

## Motion: contrato

Un solo `IntersectionObserver` (`threshold:.25, rootMargin:"0px 0px -8% 0px"`) que añade `.in` y dispara contadores; `unobserve` tras entrar. Todas las coreografías viven en CSS con delays; JS solo reparte `.in`.

`@media(prefers-reduced-motion:reduce)`: TODO termina en su estado final (bandas pintadas, marcos trazados, contadores en valor final, sellos estampados). Copiar el bloque del probe.

## Por página

- **index**: hero = portada de plano (eyebrow con cuadrito vermilion, H1 con `.hl`, cota, lede a la derecha, cajetín con sello). Galería de tesis = fichas técnicas (mantener filtros/paginación/modal/teclado existentes; el modal se convierte en lámina de detalle con cajetín). Franja de datos IMCO con contadores y fuente citada. Premio Roble & Maca como sello + vitrina. Video Vimeo como "lámina" enmarcada con poster de respaldo.
- **trayectoria**: migra de oscuro a paper (muere `#050505` y `#caff00`). Los 6 caminos = accordion existente revestido de fichas/planos; AÑADIR bloque de ingresos IMCO (ver PRODUCT/notas: $18,768 promedio mensual, 95.1% ocupación, 25.4% informalidad, +83% con posgrado ≈ $34,400; fuente "IMCO Compara Carreras 2025 · ENOE 2T2024-1T2025" enlazada). Conservar: deep-links, PDF/IMPRIMIR/CANCELAR, scroll-margin, guardia GSAP (o retirar GSAP y quedarse con el IO del sistema).
- **pef**: ya habla este idioma; alinear tokens (--ink/--paper de aquí), retícula/ruler/cajetín donde sume, sellos para fechas críticas. No romper checklist/menú móvil/scrollspy recién instalados.

## Accesibilidad heredada (no regresionar)

Teclado completo en galería y modal (role=dialog, foco gestionado), `:focus-visible` visible en todo interactivo (outline 2px, aquí en `--verm`), reduced-motion total, contrastes AA en texto, headings sin saltos.
