/* ===== EGEL · utilidades compartidas (namespace EG) =====
   Funciones puras y helpers de almacenamiento reutilizados por todas las
   páginas del espacio EGEL. Extraído verbatim del simulador ya verificado. */
window.EG = (function(){
'use strict';
var $ = function(sel, ctx){ return (ctx || document).querySelector(sel); };
var $all = function(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
var LS_SIM = 'egel-sim-v1', LS_NSC = 'egel-nsc-v1', LS_PEND = 'egel-envios-pendientes-v1';
function norm(s){
  return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function shuffle(arr, rnd){
  rnd = rnd || Math.random;
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(rnd() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function permutation(n, rnd){
  var idx = [];
  for(var i = 0; i < n; i++) idx.push(i);
  return shuffle(idx, rnd);
}
/* reparte los 60 reactivos: cap por disponibilidad y compensa el déficit
   en las áreas con reactivos de sobra */
function proportionalTargets(avail, base){
  var t = {}, area, deficit = 0;
  for(area in base){
    var want = base[area], have = avail[area] || 0;
    t[area] = Math.min(want, have);
    deficit += want - t[area];
  }
  while(deficit > 0){
    var best = null, bestSpare = 0;
    for(area in t){
      var spare = (avail[area] || 0) - t[area];
      if(spare > bestSpare){ bestSpare = spare; best = area; }
    }
    if(best === null) break;
    t[best]++; deficit--;
  }
  return t;
}
function sampleExam(banco, base, rnd){
  var byArea = {}, a;
  banco.forEach(function(r){ (byArea[r.area] = byArea[r.area] || []).push(r); });
  var avail = {};
  for(a in byArea) avail[a] = byArea[a].length;
  var targets = proportionalTargets(avail, base);
  var out = [];
  for(a in targets){
    if(byArea[a]) out = out.concat(shuffle(byArea[a], rnd).slice(0, targets[a]));
  }
  return shuffle(out, rnd);
}
/* parte del banco trae las opciones con su propia letra («C) Texto…»);
   se quita porque la letra visible la genera la interfaz */
function stripOpcion(o){
  return String(o).replace(/^[A-D][).]\s+/, '');
}
/* si el porqué cita una letra («la opción B», «solo B respeta…», «(C)»),
   barajar rompería la referencia: esos reactivos conservan el orden original.
   La segunda expresión captura la letra suelta A-D entre no-letras; una letra
   seguida de dígito (C80, A1, A4) no cuenta como referencia */
function hasLetterRef(r){
  var p = r.porque || '';
  return /opci[oó]n\s+[A-D]\b|inciso\s+[A-D]\b|respuesta\s+[A-D]\b/i.test(p) ||
    /(?:^|[^\wÁÉÍÓÚáéíóú])[A-D](?=[^\wÁÉÍÓÚáéíóú]|$)/.test(p);
}
function identityPerm(n){
  var idx = [];
  for(var i = 0; i < n; i++) idx.push(i);
  return idx;
}
/* baraja opciones conservando el índice correcto */
function buildItem(r, perm, rnd){
  if(!perm){
    perm = hasLetterRef(r) ? identityPerm(r.opciones.length) : permutation(r.opciones.length, rnd);
  }
  return {
    id: r.id, area: r.area, nivel: r.nivel,
    pregunta: r.pregunta, contexto: r.contexto || null,
    opciones: perm.map(function(i){ return stripOpcion(r.opciones[i]); }),
    correcta: perm.indexOf(r.correcta),
    porque: r.porque, fuente: r.fuente, validar: !!r.validar,
    perm: perm
  };
}
function nivelDesempeno(pct){
  if(pct >= 75) return 'Sobresaliente';
  if(pct >= 53) return 'Satisfactorio';
  return 'Aún no satisfactorio';
}
function nivelClase(nivel){
  return nivel === 'Sobresaliente' ? 'n2' : (nivel === 'Satisfactorio' ? 'n1' : 'n0');
}
function computeResults(items, answers){
  var porArea = {}, ok = 0;
  items.forEach(function(it, i){
    var k = 'a' + it.area;
    porArea[k] = porArea[k] || {ok: 0, de: 0};
    porArea[k].de++;
    if(answers[i] === it.correcta){ porArea[k].ok++; ok++; }
  });
  var niveles = {}, k;
  for(k in porArea){
    var p = porArea[k];
    niveles[k] = nivelDesempeno(p.de ? Math.round(p.ok / p.de * 100) : 0);
  }
  var total = items.length;
  var pct = total ? Math.round(ok / total * 100) : 0;
  return { total: total, correctas: ok, pct: pct,
    nivelGlobal: nivelDesempeno(pct), porArea: porArea, niveles: niveles };
}
function areaPct(res, k){
  var p = res.porArea[k];
  return (p && p.de) ? Math.round(p.ok / p.de * 100) : null;
}
function fmtClock(sec){
  sec = Math.max(0, sec | 0);
  var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  var mm = (m < 10 ? '0' : '') + m, ss = (s < 10 ? '0' : '') + s;
  return h > 0 ? h + ':' + mm + ':' + ss : mm + ':' + ss;
}
function csvCell(v){
  v = String(v == null ? '' : v);
  /* neutraliza inyección de fórmulas: Excel evalúa celdas que empiezan
     con = + - @ o tab/CR (el nombre es texto libre del alumno) */
  if(/^[=+\-@\t\r]/.test(v)) v = "'" + v;
  return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}
function buildCSV(rows){
  return rows.map(function(r){ return r.map(csvCell).join(','); }).join('\r\n');
}
function letra(i){ return String.fromCharCode(65 + i); }
function buildAttempt(nombre, matricula, res, modo, duracionMin, fechaISO){
  return {
    nombre: nombre, matricula: matricula,
    fecha: fechaISO || new Date().toISOString(), modo: modo,
    total: res.total, correctas: res.correctas,
    porArea: res.porArea, niveles: res.niveles,
    duracionMin: Math.max(0, Math.min(600, Math.round(duracionMin || 0)))
  };
}
function resumenLineas(att){
  var L = [
    'Resultado de simulacro EGEL Plus (simulación, no oficial)',
    'Nombre: ' + att.nombre,
    'Matrícula: ' + att.matricula,
    'Fecha: ' + att.fecha,
    'Modo: ' + att.modo,
    'Correctas: ' + att.correctas + ' de ' + att.total,
    'Duración: ' + att.duracionMin + ' min'
  ];
  var k;
  for(k in att.porArea){
    var p = att.porArea[k];
    var pc = p.de ? Math.round(p.ok / p.de * 100) : 0;
    L.push(k.toUpperCase() + ': ' + p.ok + '/' + p.de + ' (' + pc + '%) · ' + (att.niveles[k] || ''));
  }
  return L;
}
function mailtoResumen(att){
  return 'mailto:ldg.crgs@udem.edu' +
    '?subject=' + encodeURIComponent('Simulacro EGEL · ' + att.nombre + ' · ' + att.matricula) +
    '&body=' + encodeURIComponent(resumenLineas(att).join('\n'));
}
/* convierte URLs en ligas dentro de un texto plano (para el checklist NSC) */
function linkify(text){
  var frag = document.createDocumentFragment();
  var re = /(https?:\/\/[^\s]+)/g, last = 0, m;
  while((m = re.exec(text)) !== null){
    if(m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
    var a = document.createElement('a');
    a.href = m[1]; a.textContent = m[1];
    a.target = '_blank'; a.rel = 'noopener';
    frag.appendChild(a);
    last = m.index + m[1].length;
  }
  if(last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
  return frag;
}
function loadJSON(key, fallback){
  try{ var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch(e){ return fallback; }
}
function saveJSON(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch(e){ return false; }
}
function dropKey(key){ try{ localStorage.removeItem(key); }catch(e){} }
return {
  $: $, $all: $all, LS_SIM: LS_SIM, LS_NSC: LS_NSC, LS_PEND: LS_PEND,
  norm: norm, esc: esc, shuffle: shuffle, permutation: permutation,
  proportionalTargets: proportionalTargets, sampleExam: sampleExam,
  stripOpcion: stripOpcion, hasLetterRef: hasLetterRef, identityPerm: identityPerm,
  buildItem: buildItem, nivelDesempeno: nivelDesempeno, nivelClase: nivelClase,
  computeResults: computeResults, areaPct: areaPct, fmtClock: fmtClock,
  csvCell: csvCell, buildCSV: buildCSV, letra: letra, buildAttempt: buildAttempt,
  resumenLineas: resumenLineas, mailtoResumen: mailtoResumen, linkify: linkify,
  loadJSON: loadJSON, saveJSON: saveJSON, dropKey: dropKey
};
})();
