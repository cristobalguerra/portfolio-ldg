/* ============================================================
   FOOTER común «Cuarto Oscuro» — inyectado en todas las páginas
   Port a vainilla del componente footer-section (21st.dev / shadcn).
   Uso:  <script defer src="assets/footer.js?v=..."></script>
   Estilos: .site-footer* en assets/dark.css
   ============================================================ */
(function () {
  if (document.querySelector('.site-footer')) return; // evita doble footer

  var YEAR = 2026;

  // Navegación (espeja el dock). [etiqueta, href]
  var nav = [
    ['Inicio', 'index.html'],
    ['Showcase', 'showcase.html'],
    ['Trayecto', 'trayecto.html'],
    ['Oportunidades', 'oportunidades.html'],
    ['Mi Avance', 'avance.html'],
    ['Guía PEF', 'pef.html']
  ];

  // Redes [etiqueta, href (REEMPLAZAR), glifo de marca (simple-icons)]
  var social = [
    ['Instagram', '#', 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'],
    ['Behance', '#', 'M22 7h-7V5h7zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.221 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3zm0 3.016h3.341c3.055 0 2.868-3.016.05-3.016H3z'],
    ['LinkedIn', '#', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'],
    ['YouTube', '#', 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z']
  ];

  var links = nav.map(function (n) {
    return '<a href="' + n[1] + '">' + n[0] + '</a>';
  }).join('');

  var socialBtns = social.map(function (s) {
    return '<a href="' + s[1] + '" data-tip="' + s[0] + '" aria-label="' + s[0] +
      '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + s[2] + '"/></svg></a>';
  }).join('');

  var html =
    '<div class="foot-glow" aria-hidden="true"></div>' +
    '<div class="site-footer__inner"><div class="site-footer__grid">' +
      '<div class="foot-col foot-news">' +
        '<h2>Mantente al tanto</h2>' +
        '<p>Convocatorias, PEF Talks y oportunidades del programa, directo a tu correo.</p>' +
        '<form class="foot-form" data-foot-form novalidate>' +
          '<input type="email" name="email" placeholder="tu@correo.com" required aria-label="Correo electrónico">' +
          '<button type="submit" aria-label="Suscribirme">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
          '<span class="foot-note" data-foot-note role="status">Abriendo tu correo…</span>' +
        '</form>' +
      '</div>' +
      '<div class="foot-col"><h3>Navegación</h3><nav class="foot-links" aria-label="Pie de página">' + links + '</nav></div>' +
      '<div class="foot-col"><h3>Contacto</h3>' +
        '<address class="foot-contact">' +
          'Centro Roberto Garza Sada<br>Universidad de Monterrey<br>' +
          'Av. Ignacio Morones Prieto 4500 Pte.<br>San Pedro Garza García, N.L. 66238<br>' +
          '<a href="mailto:ldg.crgs@udem.edu">ldg.crgs@udem.edu</a>' +
        '</address></div>' +
      '<div class="foot-col"><h3>Síguenos</h3><div class="foot-social">' + socialBtns + '</div></div>' +
    '</div></div>' +
    '<div class="site-footer__bar">' +
      '<p>&copy; ' + YEAR + ' LDG &middot; UDEM &middot; Centro Roberto Garza Sada</p>' +
      '<nav class="foot-legal" aria-label="Legal">' +
        '<a href="#">Aviso de Privacidad</a>' +
        '<a href="#">Términos</a>' +
        '<a href="#">Accesibilidad</a>' +
      '</nav>' +
    '</div>';

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = html;
  document.body.appendChild(footer);

  // Newsletter: sin backend aún → abre el cliente de correo (honesto y funcional).
  // TODO: cablear a Firebase (nodo boletín) cuando se decida el backend.
  var form = footer.querySelector('[data-foot-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      var email = (input && input.value || '').trim();
      var note = footer.querySelector('[data-foot-note]');
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
        if (note) { note.textContent = 'Revisa tu correo: parece que falta algo.'; note.classList.add('is-on', 'is-error'); }
        return;
      }
      if (input) input.removeAttribute('aria-invalid');
      if (note) { note.textContent = 'Abriendo tu correo…'; note.classList.remove('is-error'); note.classList.add('is-on'); }
      var subject = encodeURIComponent('Suscripción · Boletín LDG UDEM');
      var body = encodeURIComponent('Quiero recibir convocatorias y oportunidades del programa.\nMi correo: ' + email);
      window.location.href = 'mailto:ldg.crgs@udem.edu?subject=' + subject + '&body=' + body;
    });
  }
})();
