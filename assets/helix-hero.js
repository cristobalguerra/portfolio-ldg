/* ===== Hero de hélice =====
   Port a vainilla de «Helix Ribbon Hero» (Kedhareswer Naidu, 21st.dev).
   El titular entra letra por letra junto a una imagen; al desplazarse, las dos líneas se
   separan mientras una cinta de proyectos, doblada sobre una hélice, sube girando; al final
   los primeros seis proyectos caen en una retícula con pie.
   Uso: HelixHero(elemento, { linea1, linea2, sangria, imagen, proyectos, cuenta, pie, pista, navAlto }) */
(function(){
  'use strict';
  var clamp01 = function(t){ return t < 0 ? 0 : t > 1 ? 1 : t; };
  var seg = function(t, a, b){ return clamp01((t - a) / (b - a)); };
  var easeInOut = function(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var easeOut = function(t){ return 1 - Math.pow(1 - t, 3); };
  var easeSine = function(t){ return .5 - .5 * Math.cos(Math.PI * t); };
  var px = function(n){ return n.toFixed(2) + 'px'; };

  /* tramos del recorrido (0 a 1) */
  var FASE = { pie: [0, .06], separa: [.08, .36], helice: [.02, .62], reticula: [.53, .63], escalon: .026, sube: [.8, 1], calmaSale: [.04, .2], calmaEntra: [.42, .58] };
  var HELICE = { porVuelta: 7, tiras: 4, paso: 1.34, giroZ: -17, giroX: -9 };
  /* métricas de Archivo con interlínea 1: altura de mayúsculas y línea de base */
  var CAP = .69, BASE = .834;

  function letras(texto, retraso){
    return Array.prototype.map.call(texto, function(ch, i){
      var s = document.createElement('span');
      s.className = 'hrh-ch';
      s.style.animationDelay = (retraso + i * .045) + 's';
      if(ch === ' '){ var e = document.createElement('span'); e.style.cssText = 'display:inline-block;width:.12em'; s.appendChild(e); }
      else s.textContent = ch;
      return s;
    });
  }
  function el(tag, cls, hijos){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    (hijos || []).forEach(function(h){ n.appendChild(h); });
    return n;
  }

  window.HelixHero = function(root, cfg){
    var reducido = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    var cinta = cfg.proyectos.slice(0, 12).reverse();
    var seis = cfg.proyectos.slice(0, 6);
    var T = HELICE.tiras;

    /* ---------- estructura ---------- */
    var linea1 = el('h1', 'hrh-line', letras(cfg.linea1, .08));
    linea1.style.margin = '0';
    linea1.setAttribute('aria-label', (cfg.sobre ? cfg.sobre + ' ' : '') + cfg.linea1 + ' ' + cfg.linea2);
    var retrato = el('div', 'hrh-port');
    var formas = (cfg.imagenes && cfg.imagenes.length) ? cfg.imagenes : [cfg.imagen];
    var caras = formas.map(function (src, i) {
      var im = new Image(); im.src = src; im.alt = ''; im.draggable = false;
      if (i) im.style.visibility = 'hidden';
      retrato.appendChild(im); return im;
    });
    /* el recuadro cambia de forma a intervalos irregulares (corte seco, sin repetir la anterior) */
    if (caras.length > 1 && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      var cara = 0;
      (function cambia() {
        setTimeout(function () {
          var n; do { n = Math.floor(Math.random() * caras.length); } while (n === cara);
          caras[cara].style.visibility = 'hidden'; caras[n].style.visibility = 'visible'; cara = n;
          cambia();
        }, 350 + Math.pow(Math.random(), 2) * 2900);
      })();
    }
    var sobre = el('div', 'hrh-line hrh-over', cfg.sobre ? letras(cfg.sobre, 0) : []);
    sobre.setAttribute('aria-hidden', 'true');
    var linea2 = el('div', 'hrh-line', letras(cfg.linea2, .3));
    linea2.setAttribute('aria-hidden', 'true');
    var tornillo = el('div', 'hrh-screw');
    cinta.forEach(function(p){
      for(var k = 0; k < T * 2; k++){
        var t = el('div', 'hrh-slice');
        t.style.backgroundImage = 'url(' + JSON.stringify(p.src) + ')';
        tornillo.appendChild(t);
      }
    });
    var grupo = el('div', 'hrh-group', [tornillo]);
    grupo.setAttribute('aria-hidden', 'true');
    grupo.style.visibility = 'hidden';
    var vista = el('div', 'hrh-view', [el('div', 'hrh-scene', [sobre, linea1, retrato, linea2, grupo])]);

    var cuentaTxt = el('span', 'hrh-fade'); cuentaTxt.style.display = 'block'; cuentaTxt.textContent = cfg.cuenta || '';
    var cuenta = el('div', 'hrh-count', [cuentaTxt]);

    var reticula = el('div', 'hrh-grid');
    seis.forEach(function(p, i){
      var caja = el('div', 'hrh-card-img');
      var im = new Image(); im.src = p.src; im.alt = p.titulo; im.loading = 'lazy'; im.draggable = false; caja.appendChild(im);
      var a = el('span'); a.textContent = p.titulo;
      var b = el('span'); b.textContent = (i + 1) + '/' + seis.length;
      var pie = el('div', 'hrh-cap', [a, b]); pie.style.opacity = '0';
      reticula.appendChild(el('div', 'hrh-card', [caja, pie]));
    });

    var bio = el('p', 'hrh-bio hrh-fade'); bio.textContent = cfg.pie || '';
    var pista = el('span', 'hrh-hint hrh-fade'); pista.textContent = cfg.pista || '';
    var pie = el('div', 'hrh-foot', [bio, pista]);

    var escena = el('div', 'hrh-stage', [vista, cuenta, reticula, pie]);
    root.classList.add('hrh-root');
    root.appendChild(escena);

    var tiras = Array.prototype.slice.call(tornillo.children);
    var tarjetas = Array.prototype.slice.call(reticula.children);
    var nCinta = cinta.length;
    var G = { W: 0, H: 0, R: 0, cw: 0, ch: 0, paso: 0, dTheta: 0, persp: 0, zTit: 0, cols: 3, hueco: [], tw: 0, th: 0, gridH: 0, top: 0, g: 0 };
    var brillo = new Float32Array(tiras.length).fill(-1);
    var p = 0, meta = 0;

    /* ---------- medidas ---------- */
    function medir(){
      var W = escena.clientWidth, H = escena.clientHeight;
      if(!W || !H) return;
      G.W = W; G.H = H;
      var movil = W < 720;
      var g = parseFloat(getComputedStyle(pie).paddingLeft) || 24;
      G.g = g;
      var base = Math.max(Math.min(W, H * 1.6), H * .62);
      G.cw = base * .4; G.ch = G.cw / 1.5;
      G.dTheta = Math.PI * 2 / HELICE.porVuelta;
      G.R = G.cw / G.dTheta;
      G.paso = G.ch * HELICE.paso;
      G.persp = base * 1.05;
      vista.style.perspective = px(G.persp);

      /* cada proyecto se parte en tiras planas que, juntas, siguen la curva */
      var anchoTira = 2 * G.R * Math.sin(G.dTheta / T / 2);
      var subeTira = G.paso * (G.dTheta / T) / (Math.PI * 2);
      var sesgo = Math.atan2(subeTira, anchoTira) * 180 / Math.PI;
      for(var i = 0; i < tiras.length; i++){
        var reverso = i % 2;
        var proy = Math.floor(i / (2 * T));
        var k = Math.floor(i / 2) % T;
        var ang = proy * G.dTheta + (k + .5) * (G.dTheta / T);
        var y = -(G.paso * ang) / (Math.PI * 2);
        var s = tiras[i].style;
        s.width = px(anchoTira + 2);
        s.height = px(G.ch);
        s.backgroundSize = px(anchoTira * T) + ' auto';
        s.backgroundPosition = px(1 - (reverso ? T - 1 - k : k) * anchoTira) + ' 50%';
        s.transform = 'rotateY(' + (ang * 180 / Math.PI).toFixed(3) + 'deg) translate3d(' + px(-anchoTira / 2 - 1) + ',' + px(y - G.ch / 2 + subeTira / 2) + ',' + px(G.R) + ') skewY(' + (-sesgo).toFixed(3) + 'deg)' +
          (reverso ? ' translateX(' + px(anchoTira + 2) + ') rotateY(180deg)' : '');
      }

      /* titular: dos líneas, la segunda sangrada, con la imagen al final de la primera */
      G.zTit = -G.R * .45;
      var esc = G.persp / (G.persp - G.zTit);
      linea1.style.fontSize = '100px'; linea2.style.fontSize = '100px';
      var a1 = linea1.offsetWidth / 100, a2 = linea2.offsetWidth / 100;
      var sangria = a1 * (cfg.sangria == null ? .3 : cfg.sangria);
      var anchoImg = CAP * .8, aire = .06, entre = CAP * .3;   /* aire para los acentos de las mayúsculas */
      var anchoTot = Math.max(a1 + aire + anchoImg, sangria + a2);
      var chica = .2, aireChica = .11;                      /* línea chica: tamaño y separación, en cuerpos del titular */
      var altoSobre = cfg.sobre ? CAP * chica + aireChica : 0;
      var altoTot = CAP * 2 + entre + altoSobre;
      var cuerpo = Math.min((movil ? .9 : .8) * W / anchoTot, (movil ? .36 : .47) * H / altoTot);
      var altoLinea = CAP * cuerpo;
      var x0 = -(anchoTot * cuerpo) / 2 + (movil ? 0 : W * .015);
      var y0 = H * (movil ? -.08 : -.06) - altoTot * cuerpo / 2 + altoSobre * cuerpo;
      var poner = function(n, x, y){
        n.style.fontSize = px(cuerpo / esc);
        n.dataset.x = String(x / esc);
        n.dataset.y = String((y - BASE * cuerpo + altoLinea) / esc);
      };
      poner(linea1, x0, y0);
      sobre.style.fontSize = px(chica * cuerpo / esc);
      sobre.dataset.x = String((x0 + .012 * cuerpo) / esc);
      sobre.dataset.y = String((y0 - altoSobre * cuerpo - (BASE - CAP) * chica * cuerpo) / esc);
      poner(linea2, x0 + sangria * cuerpo, y0 + altoLinea + entre * cuerpo);
      retrato.style.width = px(anchoImg * cuerpo / esc);
      retrato.style.height = px(altoLinea / esc);
      retrato.dataset.x = String((x0 + (a1 + aire) * cuerpo) / esc);
      retrato.dataset.y = String(y0 / esc);

      var yFin = y0 + altoLinea * 2 + entre * cuerpo;
      cuenta.style.left = px(W / 2 + x0);
      cuenta.style.top = movil ? px(H / 2 + yFin + 22) : px(H / 2 + yFin - cuenta.offsetHeight);

      /* retícula final */
      var cols = movil ? 2 : 3, gx = movil ? 12 : Math.round(g * .9), gy = movil ? 22 : Math.round(g * 1.2), altoPie = 22;
      G.cols = cols;
      G.tw = (W - 2 * g - (cols - 1) * gx) / cols;
      G.th = G.tw / 1.5;
      var filas = Math.ceil(seis.length / cols);
      G.gridH = filas * (G.th + altoPie) + (filas - 1) * gy;
      G.top = (cfg.navAlto || 0) + (movil ? 12 : g * .6);
      G.hueco = seis.map(function(_, i){ return { x: g + i % cols * (G.tw + gx), y: Math.floor(i / cols) * (G.th + altoPie + gy) }; });
      tarjetas.forEach(function(t){
        t.firstElementChild.style.width = px(G.tw);
        t.firstElementChild.style.height = px(G.th);
        t.style.width = px(G.tw);
      });
      pintar(true);
    }

    /* ---------- cuadro ---------- */
    function pintar(forzar){
      var W = G.W, H = G.H;
      if(!W) return;
      var u = easeInOut(seg(p, FASE.separa[0], FASE.separa[1]));
      var calma = reducido ? 1 - seg(p, FASE.calmaSale[0], FASE.calmaSale[1]) : 1;
      var viaje = W * .95;
      var esc = G.persp / (G.persp - G.zTit);
      var titular = function(n, dx){
        n.style.transform = 'translate3d(' + px(Number(n.dataset.x) + dx / esc) + ',' + px(Number(n.dataset.y)) + ',' + px(G.zTit) + ')';
        n.style.opacity = reducido ? String(calma) : (u >= 1 ? '0' : '1');
      };
      titular(linea1, reducido ? 0 : u * viaje);
      titular(sobre, reducido ? 0 : u * viaje);
      titular(retrato, reducido ? 0 : u * viaje);
      titular(linea2, reducido ? 0 : -u * viaje);

      var sale = reducido ? 1 - calma : seg(p, FASE.pie[0], FASE.pie[1]);
      pie.style.opacity = String(1 - sale);
      pie.style.transform = 'translateY(' + px(sale * 40) + ')';
      var saleC = reducido ? 1 - calma : seg(p, FASE.separa[0], FASE.separa[0] + .08);
      cuenta.style.opacity = String(1 - saleC);
      cuenta.style.transform = 'translateX(' + px(-saleC * 30) + ')';

      var t = seg(p, FASE.helice[0], FASE.helice[1]);
      if(reducido || t <= 0 || t >= 1){
        grupo.style.visibility = 'hidden';
      }else{
        grupo.style.visibility = 'visible';
        var sube = easeSine(t) * .35 + t * .65;
        var giro = -.85 * Math.PI + t * 2.1 * Math.PI;
        var alto = G.paso * ((nCinta - 1) * G.dTheta) / (Math.PI * 2);
        var rec = H / 2 + alto / 2 + G.ch * 1.6;
        var y = rec - sube * 2 * rec;
        var dy = -(G.paso * giro) / (Math.PI * 2);
        grupo.style.transform = 'translate3d(' + px(-W * .04) + ',' + px(y - (-(alto / 2) + dy)) + ',' + px(-G.R) + ') rotateZ(' + HELICE.giroZ + 'deg) rotateX(' + HELICE.giroX + 'deg)';
        tornillo.style.transform = 'rotateY(' + (giro * 180 / Math.PI).toFixed(3) + 'deg) translateY(' + px(dy) + ')';
        for(var i = 0; i < tiras.length; i++){
          var ang = Math.floor(i / (2 * T)) * G.dTheta + (Math.floor(i / 2) % T + .5) * (G.dTheta / T) + giro;
          var frente = i % 2 ? -Math.cos(ang) : Math.cos(ang);
          if(frente < -.05) continue;
          var b = .66 + .34 * Math.max(0, frente);
          if(forzar || Math.abs(b - brillo[i]) > .015){ brillo[i] = b; tiras[i].style.filter = 'brightness(' + b.toFixed(3) + ')'; }
        }
      }

      var subeG = easeInOut(seg(p, FASE.sube[0], FASE.sube[1]));
      var libre = H - G.top - G.g, desde = H * .4;
      var hasta = G.gridH <= libre ? G.top + (libre - G.gridH) / 2 : H - G.g - G.gridH;
      var yG = desde + (hasta - desde) * subeG;
      for(var n = 0; n < tarjetas.length; n++){
        var tj = tarjetas[n], h = G.hueco[n];
        var ini = FASE.reticula[0] + n * FASE.escalon;
        var e = reducido ? seg(p, FASE.calmaEntra[0], FASE.calmaEntra[1]) : easeOut(seg(p, ini, ini + (FASE.reticula[1] - FASE.reticula[0])));
        if(e <= 0){ tj.style.opacity = '0'; continue; }
        var caja = tj.firstElementChild, cap = tj.lastElementChild;
        if(reducido){
          tj.style.opacity = String(e);
          tj.style.transform = 'translate(' + px(h.x) + ',' + px(yG + h.y) + ')';
          caja.style.width = px(G.tw); caja.style.height = px(G.th); cap.style.opacity = '1';
          continue;
        }
        var f = 1 - e, zoom = 1 + .4 * f, w = G.tw * zoom, al = G.th * zoom;
        var fila = Math.floor(n / G.cols), col = n % G.cols;
        var xF = h.x - (w - G.tw) / 2, yF = yG + h.y, xI = xF, yI = yF;
        if(fila > 0) yI = H + al * .1; else if(col === 0) xI = -w * 1.05; else if(col === G.cols - 1) xI = W + w * .05; else yI = -al * 1.05;
        caja.style.width = px(w); caja.style.height = px(al);
        tj.style.width = px(w);
        tj.style.opacity = String(Math.min(1, e * 3));
        caja.style.filter = f > .01 ? 'blur(' + (f * 7).toFixed(2) + 'px)' : '';
        tj.style.transform = 'translate(' + px(xF + (xI - xF) * f) + ',' + px(yF + (yI - yF) * f) + ') perspective(' + px(G.persp) + ') rotateX(' + (f * 16).toFixed(2) + 'deg)';
        cap.style.opacity = String(seg(e, .8, 1));
      }
    }

    /* ---------- recorrido ligado al scroll ---------- */
    function objetivo(){
      var r = root.getBoundingClientRect(), tramo = r.height - escena.offsetHeight;
      return tramo > 0 ? clamp01(-r.top / tramo) : 0;
    }
    var raf = 0, antes = performance.now(), visible = true;
    function tic(ahora){
      var dt = Math.min(64, ahora - antes); antes = ahora;
      meta = objetivo();
      if(reducido) p = meta;
      else{ p += (meta - p) * (1 - Math.exp(-dt / 110)); if(Math.abs(meta - p) < 5e-5) p = meta; }
      pintar();
      raf = visible ? requestAnimationFrame(tic) : 0;
    }
    function arrancar(){
      medir();
      p = objetivo();
      pintar(true);
      root.setAttribute('data-ready', 'true');
      if('IntersectionObserver' in window){
        new IntersectionObserver(function(es){
          visible = es[es.length - 1].isIntersecting;
          if(visible && !raf){ antes = performance.now(); raf = requestAnimationFrame(tic); }
        }).observe(root);
      }
      if('ResizeObserver' in window) new ResizeObserver(medir).observe(escena);
      else addEventListener('resize', medir);
      raf = requestAnimationFrame(tic);
    }
    /* espera a la tipografía: el titular se mide con ella */
    var listo = false, ir = function(){ if(!listo){ listo = true; arrancar(); } };
    setTimeout(ir, 2500);
    if(document.fonts && document.fonts.load){
      document.fonts.load("900 100px Archivo").then(function(){ return document.fonts.ready; }).then(ir, ir);
    }else ir();

    return { ir: function(v){ p = meta = clamp01(v); pintar(true); } };
  };
})();
