/* Fondo compartido: base oscura + resplandor radial + retícula + grano animado.
   Se inyecta detrás de todo (z-index:-1). Cárgalo en cada página. */
(function () {
  if (document.getElementById('bgfx')) return;

  const bg = document.createElement('div');
  bg.id = 'bgfx';
  bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML =
    '<div class="bgfx-glow"></div>' +
    '<div class="bgfx-grid"></div>' +
    '<canvas class="bgfx-noise"></canvas>';
  document.body.appendChild(bg);

  const canvas = bg.querySelector('.bgfx-noise');
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const S = 1024;
  canvas.width = S; canvas.height = S;
  const ALPHA = 10, INTERVAL = 4;   /* regenera el grano cada 4 frames (~15fps): mitad de CPU, look intacto */

  function draw() {
    const img = ctx.createImageData(S, S);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = ALPHA;
    }
    ctx.putImageData(img, 0, 0);
  }

  // Movimiento reducido / pestaña oculta: un solo cuadro estático de grano.
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) { draw(); return; }

  let frame = 0, id = 0;
  function loop() {
    if (frame % INTERVAL === 0) draw();
    frame++;
    id = requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(id); }
    else { id = requestAnimationFrame(loop); }
  });
})();
