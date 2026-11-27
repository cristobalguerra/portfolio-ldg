/* ===== EGEL · acceso con correo UDEM =====
   Se entra con la cuenta de Google institucional (@udem.edu). No hay código compartido.
   El material del curso (banco, biblioteca, glosario) vive en la base y la regla solo
   lo entrega a sesiones con correo @udem.edu verificado; aquí no hay nada que proteger.
   Requiere Firebase ya inicializado en la página (app, auth y database). */
(function(){
  'use strict';
  var root = document.documentElement;
  var DOMINIO = /@udem\.edu(\.mx)?$/i;
  var cache = {};
  var abrir, abierto = false;
  var listo = new Promise(function(resolve){ abrir = resolve; });
  var hayFirebase = typeof firebase !== 'undefined' && firebase.auth && firebase.database;

  function permitido(u){ return !!(u && !u.isAnonymous && u.email && DOMINIO.test(u.email)); }

  /* Material del curso: 'banco', 'biblioteca' o 'glosario'. Espera a que haya sesión. */
  function cargar(nombre){
    if(cache[nombre]) return cache[nombre];
    cache[nombre] = listo.then(function(){
      return firebase.database().ref('egelMaterial/' + nombre).once('value');
    }).then(function(snap){
      var v = snap.val();
      if(v === null) throw new Error('No hay material: ' + nombre);
      return typeof v === 'string' ? JSON.parse(v) : v;
    });
    cache[nombre].catch(function(){ cache[nombre] = null; });
    return cache[nombre];
  }
  window.EGEL_ACCESS = { listo: listo, cargar: cargar };

  function reveal(u){
    abierto = true;
    root.classList.remove('egel-locked');
    var g = document.getElementById('egel-gate');
    if(g) g.remove();
    abrir(u);
  }

  function build(aviso){
    if(document.getElementById('egel-gate')) return;
    var gate = document.createElement('div');
    gate.id = 'egel-gate';
    gate.innerHTML =
      '<div class="gate-card">' +
        '<a class="gate-mark" href="index.html"><img src="assets/ldg-udem.png" alt="LDG UDEM" width="61" height="36"></a>' +
        '<p class="eyebrow">Espacio EGEL · acceso del programa</p>' +
        '<h1>Entra con tu correo UDEM</h1>' +
        '<p>Este espacio de preparación para el EGEL Plus es del alumnado de Diseño Gráfico. Entra con tu cuenta institucional; el navegador la recordará.</p>' +
        '<form id="gate-form" novalidate>' +
          '<p class="gate-status" id="gate-status" role="status" aria-live="polite"></p>' +
          '<button class="btn solid" type="submit">Entrar con correo UDEM</button>' +
        '</form>' +
        '<p class="gate-help">¿No puedes entrar? Escríbele a la coordinación: <a href="mailto:ldg.crgs@udem.edu" style="color:inherit;text-decoration:underline">ldg.crgs@udem.edu</a></p>' +
      '</div>';
    document.body.appendChild(gate);
    var form = gate.querySelector('#gate-form');
    var status = gate.querySelector('#gate-status');
    if(aviso) status.textContent = aviso;
    if(!hayFirebase){
      status.textContent = 'No se pudo conectar con el servicio de acceso. Revisa tu conexión y recarga la página.';
      return;
    }
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      status.textContent = 'Abriendo el acceso de Google…';
      var prov = new firebase.auth.GoogleAuthProvider();
      prov.setCustomParameters({ hd: 'udem.edu', prompt: 'select_account' });
      firebase.auth().signInWithPopup(prov).then(function(res){
        if(permitido(res.user)){ reveal(res.user); return; }
        return firebase.auth().signOut().then(function(){
          status.textContent = 'Ese correo no es de UDEM. Entra con tu cuenta @udem.edu.';
        });
      }).catch(function(err){
        var c = err && err.code;
        status.textContent =
          c === 'auth/popup-blocked' ? 'El navegador bloqueó la ventana de acceso. Permite ventanas emergentes para este sitio e inténtalo de nuevo.' :
          c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request' ? '' :
          c === 'auth/network-request-failed' ? 'No hay conexión. Inténtalo de nuevo.' :
          'No se pudo iniciar sesión. Inténtalo de nuevo.';
      });
    });
  }
  function alCargar(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn();
  }

  if(!hayFirebase){ alCargar(function(){ build(); }); return; }

  /* Solo la primera respuesta decide: si después la coordinación inicia o cierra su sesión
     en esta misma página, lo ya abierto no se vuelve a bloquear. */
  var decidido = false;
  firebase.auth().onAuthStateChanged(function(u){
    if(decidido) return;
    decidido = true;
    if(permitido(u)) reveal(u);
    else alCargar(function(){ if(!abierto) build(); });
  });
})();
