/* Hero · arranca el video de Vimeo en el segundo START y hace LOOP desde ahí,
   para no mostrar el frame gris del inicio (ni al cargar ni en cada repetición).
   Usa el Player API de Vimeo (player.js). Si el SDK no carga, el #t=2s del src
   al menos lo arranca en 2 la primera vez. */
(function () {
  var ifr = document.getElementById('heVideo');
  if (!ifr || typeof Vimeo === 'undefined') return;

  var START = 2;      // segundo donde empieza el contenido (después del gris)
  var DUR = 0, busy = false;

  function done() { busy = false; }
  function seekStart() { busy = true; ifr && p.setCurrentTime(START).then(done, done); }

  var p;
  try { p = new Vimeo.Player(ifr); } catch (e) { return; }
  window.__heroPlayer = p; // para depurar

  p.ready()
    .then(function () { return p.getDuration(); })
    .then(function (d) { DUR = d || 0; return p.setCurrentTime(START); })
    .catch(function () {});

  p.on('timeupdate', function (d) {
    if (busy) return;
    // salta a START justo antes del final → el loop nunca toca el gris del inicio
    if (DUR && d.seconds >= DUR - 0.3) seekStart();
    // respaldo: si el loop nativo lo regresó a 0, vuelve a START
    else if (d.seconds < START - 0.1) seekStart();
  });

  p.on('ended', function () { p.setCurrentTime(START).then(function () { p.play(); }, function () {}); });
})();
