/* ===== EGEL · gate de acceso compartido =====
   Un solo código para todo el espacio EGEL. No es seguridad fuerte
   (es un sitio estático); mantiene fuera a visitantes casuales y se
   recuerda en el navegador por un semestre. Para cambiar el código,
   reemplaza CODE_HASH por el SHA-256 hex del nuevo código
   (node -e "console.log(require('crypto').createHash('sha256').update('TU-CODIGO').digest('hex'))").
   Código actual por defecto: EGEL-LDG-2026 */
(function(){
  'use strict';
  var LS_KEY = 'egel_access_v1';
  var CODE_HASH = '00cddf00e01403db4c6e9ff3dd7cd36185943a77e02f3ec54db063581643c2b7';
  var TTL_MS = 150 * 864e5; /* ~5 meses */
  var root = document.documentElement;

  function unlocked(){
    try{
      var o = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      return !!(o && o.h === CODE_HASH && o.exp > Date.now());
    }catch(e){ return false; }
  }
  function remember(){
    try{ localStorage.setItem(LS_KEY, JSON.stringify({ h: CODE_HASH, exp: Date.now() + TTL_MS })); }catch(e){}
  }
  function sha256Hex(str){
    if(!(window.crypto && crypto.subtle)) return Promise.resolve(null);
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function(buf){
      return Array.prototype.map.call(new Uint8Array(buf), function(b){
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }
  function reveal(){ root.classList.remove('egel-locked'); var g = document.getElementById('egel-gate'); if(g) g.remove(); }

  if(unlocked()){ reveal(); return; }

  function build(){
    var gate = document.createElement('div');
    gate.id = 'egel-gate';
    gate.innerHTML =
      '<div class="gate-card">' +
        '<a class="gate-mark" href="index.html">LDG·UDEM<span class="b-arrow" aria-hidden="true">' +
          '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square" focusable="false"><path d="M2 2l8 8"/><path d="M10 4.6V10H4.6"/></svg>' +
        '</span></a>' +
        '<p class="eyebrow">Espacio EGEL · acceso del programa</p>' +
        '<h1>Ingresa el código</h1>' +
        '<p>Este espacio de preparación para el EGEL Plus es del alumnado de Diseño Gráfico. Escribe el código que te compartió la coordinación; el navegador lo recordará.</p>' +
        '<form id="gate-form" novalidate>' +
          '<label for="gate-code">Código de acceso' +
            '<input type="text" id="gate-code" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="text" required>' +
          '</label>' +
          '<p class="gate-status" id="gate-status" role="status" aria-live="polite"></p>' +
          '<button class="btn solid" type="submit">Entrar</button>' +
        '</form>' +
        '<p class="gate-help">¿No tienes el código? Escríbele a la coordinación: <a href="mailto:ldg.crgs@udem.edu" style="color:inherit;text-decoration:underline">ldg.crgs@udem.edu</a></p>' +
      '</div>';
    document.body.appendChild(gate);
    var form = gate.querySelector('#gate-form');
    var input = gate.querySelector('#gate-code');
    var status = gate.querySelector('#gate-status');
    input.focus();
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var val = (input.value || '').trim();
      if(!val){ return; }
      status.textContent = 'Verificando…';
      sha256Hex(val).then(function(h){
        if(h === null){
          status.textContent = 'Tu navegador no permite verificar el código de forma segura. Prueba con Chrome, Edge, Safari o Firefox actualizados.';
          return;
        }
        if(h === CODE_HASH){ remember(); reveal(); }
        else{ status.textContent = 'Código incorrecto. Revísalo con la coordinación.'; input.select(); }
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  }else{
    build();
  }
})();
