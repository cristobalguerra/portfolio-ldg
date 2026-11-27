/* ===== EGEL · acceso compartido =====
   Un solo código para todo el espacio EGEL, sin cuenta por alumno.
   El código NO se guarda aquí, ni en claro ni como huella: de él se deriva
   la ruta de la base donde vive el material (banco, biblioteca, glosario).
   Quien no conoce el código no puede leer esa ruta ni listarla.
   Para cambiar el código: volver a subir el material con el código nuevo
   (herramientas egel_preparar.js y egel_subir.sh) y borrar la ruta anterior. */
(function(){
  'use strict';
  var LS_KEY = 'egel_access_v2';
  var DB = 'https://portfolioldg-3ca20-default-rtdb.firebaseio.com/egelPriv/';
  var TTL_MS = 150 * 864e5; /* ~5 meses */
  var root = document.documentElement;
  var cache = {};
  var abrir;
  var listo = new Promise(function(resolve){ abrir = resolve; });

  function guardado(){
    try{
      var o = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      return o && /^[a-f0-9]{64}$/.test(o.t) && o.exp > Date.now() ? o.t : null;
    }catch(e){ return null; }
  }
  function recordar(t){
    try{ localStorage.setItem(LS_KEY, JSON.stringify({ t: t, exp: Date.now() + TTL_MS })); }catch(e){}
  }
  function olvidar(){
    try{ localStorage.removeItem(LS_KEY); localStorage.removeItem('egel_access_v1'); }catch(e){}
  }
  function sha256Hex(str){
    if(!(window.crypto && crypto.subtle)) return Promise.resolve(null);
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function(buf){
      return Array.prototype.map.call(new Uint8Array(buf), function(b){
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }
  function leer(t, nombre){
    return fetch(DB + t + '/' + nombre + '.json').then(function(r){
      if(!r.ok) throw new Error('No se pudo leer ' + nombre);
      return r.json();
    });
  }
  /* Material del curso: 'banco', 'biblioteca' o 'glosario'. Espera a que el acceso esté abierto. */
  function cargar(nombre){
    if(cache[nombre]) return cache[nombre];
    cache[nombre] = listo.then(function(t){ return leer(t, nombre); }).then(function(v){
      if(v === null){ olvidar(); location.reload(); throw new Error('El acceso venció'); }
      return typeof v === 'string' ? JSON.parse(v) : v;
    });
    cache[nombre].catch(function(){ cache[nombre] = null; });
    return cache[nombre];
  }
  window.EGEL_ACCESS = { listo: listo, cargar: cargar };

  function reveal(t){
    root.classList.remove('egel-locked');
    var g = document.getElementById('egel-gate');
    if(g) g.remove();
    abrir(t);
  }

  var t0 = guardado();
  if(t0){
    reveal(t0);
    /* si el código cambió desde la última visita, se vuelve a pedir */
    leer(t0, 'ok').then(function(ok){ if(ok !== true){ olvidar(); location.reload(); } }).catch(function(){});
    return;
  }

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
      sha256Hex('egel-material-v1:' + val).then(function(t){
        if(t === null){
          status.textContent = 'Tu navegador no permite verificar el código de forma segura. Prueba con Chrome, Edge, Safari o Firefox actualizados.';
          return;
        }
        return leer(t, 'ok').then(function(ok){
          if(ok === true){ recordar(t); reveal(t); }
          else{ status.textContent = 'Código incorrecto. Revísalo con la coordinación.'; input.select(); }
        });
      }).catch(function(){
        status.textContent = 'No se pudo verificar el código. Revisa tu conexión e inténtalo de nuevo.';
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  }else{
    build();
  }
})();
