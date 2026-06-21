/* Carrusel horizontal del Equipo Alto Desempeño. Una sola fila: avanza solo
   (ping-pong, sin saltos), se pausa al pasar el cursor / tocar / enfocar, y
   tiene flechas + swipe nativo. Respeta prefers-reduced-motion. */
(function () {
  var track = document.querySelector('[data-equipo-track]');
  if (!track) return;
  var rail = track.closest('.equipo-rail');
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  function step() {
    var card = track.querySelector('.equipo-card');
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 14) || 14;
    return (card ? card.offsetWidth : 200) + gap;
  }

  // Flechas (manual)
  if (rail) {
    rail.querySelectorAll('.equipo-nav').forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: (b.classList.contains('next') ? 1 : -1) * step(), behavior: 'smooth' });
      });
    });
  }

  if (reduce) return; // sin auto-avance: queda como tira deslizable

  // Auto-avance ping-pong
  var paused = false, dir = 1;
  ['pointerenter', 'pointerdown', 'focusin'].forEach(function (e) { rail.addEventListener(e, function () { paused = true; }); });
  ['pointerleave', 'focusout'].forEach(function (e) { rail.addEventListener(e, function () { paused = false; }); });
  // al hacer scroll manual (swipe), pausa breve y respeta la dirección del usuario
  var resumeT;
  track.addEventListener('scroll', function () {
    paused = true; clearTimeout(resumeT);
    resumeT = setTimeout(function () { paused = false; }, 2600);
  }, { passive: true });

  setInterval(function () {
    if (paused) return;
    var max = track.scrollWidth - track.clientWidth;
    if (max <= 1) return;
    if (dir > 0 && track.scrollLeft >= max - 2) dir = -1;
    else if (dir < 0 && track.scrollLeft <= 2) dir = 1;
    track.scrollBy({ left: dir * step(), behavior: 'smooth' });
  }, 2800);
})();
