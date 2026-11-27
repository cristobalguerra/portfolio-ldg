/* Plataforma LDG 2021 → LDVN 2027.
   Con config.js (window.SUPABASE) trabaja contra la base compartida, con cuentas y roles.
   Sin él, usa data.js y guarda las capturas en este navegador. */
const CFG = new URLSearchParams(location.search).has('local') ? null : window.SUPABASE || null;
const LS = 'ldvn-capturas-v1';
const VACIO = { perfil: {}, entregables: {}, candados: [], academia: {}, acredita: {}, dictamen: {}, liderPropuesto: {}, responsable: {}, imparte: {}, curso: {}, ejemplos: {}, juntas: [] };
const LDG = 'LDG 2021', LDVN = 'LDVN 2027';
const ROLES = { direccion: 'Dirección', lider: 'Líder de academia', profesor: 'Profesor', escolares: 'Servicios Escolares', pendiente: 'Sin rol' };

let D = null, S = structuredClone(VACIO), M = {}, A = {};
let sb = null, YO = { rol: 'direccion', academia: null, correo: '', nombre: '' };
let USUARIOS = [], INVITACIONES = [];

const $ = id => document.getElementById(id);
const mats = plan => D.materias.filter(m => m.plan === plan);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
const lineas = t => t.split('\n').map(x => x.trim()).filter(Boolean);
const pct = e => e.total ? Math.round(100 * e.cubiertas / e.total) : null;
const claseTipo = t => 't-' + (t === 'Sin equivalencia' ? 'Sin' : t);
const chip = t => `<span class="tipo ${claseTipo(t)}">${esc(t)}</span>`;
function indexar() {
  M = Object.fromEntries(D.materias.map(m => [m.clave, m]));
  A = Object.fromEntries(D.academias.map(a => [a.id, a]));
}

/* ---------- permisos (la base los vuelve a comprobar) ---------- */
const esDireccion = () => YO.rol === 'direccion';
const puedeMateria = m => esDireccion() || (YO.rol === 'lider' && m.academia != null && m.academia === YO.academia);
const puedeEntregables = m => puedeMateria(m) || YO.rol === 'profesor';
const puedeResponsable = () => esDireccion() || YO.rol === 'lider';
const no = ok => (ok ? '' : 'disabled');

/* ---------- carga ---------- */
function cargarLocal() {
  D = window.DATA;
  S = Object.assign(structuredClone(VACIO), JSON.parse(localStorage.getItem(LS) || '{}'));
  for (const m of D.materias) if (m.plan === LDVN) {
    const p = D.academiaPropuesta[m.clave];
    if (m.clave in S.academia) { m.academia = S.academia[m.clave] === '' ? null : +S.academia[m.clave]; m.academiaOrigen = null; }
    else { m.academia = p ? p.academia : null; m.academiaOrigen = p ? p.origen : null; }
  }
  indexar();
}
async function cargarRemoto() {
  const t = n => sb.from(n).select('*');
  const [ac, ma, eq, en, ca, re] = await Promise.all([t('academias').order('id'), t('materias').order('semestre').order('clave'), t('equivalencias').order('id'), t('entregables').order('id'), t('candados').order('id'), t('responsables')]);
  const err = [ac, ma, eq, en, ca, re].find(x => x.error);
  if (err) throw err.error;
  S = structuredClone(VACIO);
  D = { candados: [], sinMedir: {}, academias: ac.data.map(a => ({ id: a.id, nombre: a.nombre, lider: a.lider, apoyo: a.apoyo, lectura: a.lectura })) };
  for (const a of ac.data) { if (a.dictamen) S.dictamen[a.id] = a.dictamen; if (a.lider_propuesto) S.liderPropuesto[a.id] = a.lider_propuesto; }
  D.materias = ma.data.map(m => {
    if (m.sin_medir) D.sinMedir[m.clave] = m.sin_medir;
    if (m.acredita) S.acredita[m.clave] = m.acredita;
    if (m.perfil_entrada.length || m.perfil_salida.length) S.perfil[m.clave] = { entrada: m.perfil_entrada, salida: m.perfil_salida };
    return { plan: m.plan, clave: m.clave, nombre: m.nombre, semestre: m.semestre, academia: m.academia_id, academiaOrigen: m.academia_origen, objetivo: m.objetivo, unidades: m.unidades, creditos: m.creditos, horas: m.horas, nota: m.nota, fuente: m.fuente };
  });
  // el orden de la hoja original: primero LDG, luego LDVN
  D.materias.sort((x, y) => (x.plan === y.plan ? 0 : x.plan === LDG ? -1 : 1));
  D.equivalencias = eq.data;
  for (const e of en.data) (S.entregables[e.materia] = S.entregables[e.materia] || []).push({ id: e.id, nombre: e.nombre, competencia: e.competencia });
  S.candados = ca.data;
  for (const r of re.data) S.responsable[r.alerta] = r.responsable;
  const [im, cu, ej, ju, acu, fi] = await Promise.all([t('imparte'), t('cursos'), t('ejemplos').order('id'), t('juntas').order('fecha'), t('acuerdos').order('id'), t('firmas').order('firmado_en')]);
  const err2 = [im, cu, ej, ju, acu, fi].find(x => x.error);
  if (err2) throw err2.error;
  for (const r of im.data) (S.imparte[r.materia] = S.imparte[r.materia] || []).push({ nombre: r.nombre, correo: r.correo });
  for (const r of cu.data) S.curso[r.materia] = { cliente: r.cliente, plan: r.plan };
  for (const r of ej.data) (S.ejemplos[r.materia] = S.ejemplos[r.materia] || []).push(r);
  S.juntas = ju.data.map(j => ({ ...j, acuerdos: acu.data.filter(a => a.junta === j.id), firmas: fi.data.filter(f => f.junta === j.id) }));
  indexar();
  if (esDireccion()) {
    const [u, i] = await Promise.all([sb.from('usuarios').select('*').order('correo'), sb.from('invitaciones').select('*').order('correo')]);
    USUARIOS = u.data || []; INVITACIONES = i.data || [];
  }
}
/* guarda: en local todo el estado; en remoto, la operación que se le pase */
async function guardar(op) {
  if (!sb) { localStorage.setItem(LS, JSON.stringify(S)); return; }
  if (!op) return;
  const { error } = await op;
  if (error) { aviso('No se guardó: ' + error.message); await cargarRemoto(); pintar(); }
}
function aviso(texto) {
  const a = $('aviso'); a.textContent = texto; a.hidden = false;
  clearTimeout(aviso.t); aviso.t = setTimeout(() => (a.hidden = true), 6000);
}

/* ---------- lecturas sobre la base ---------- */
const eqDe = clave => D.equivalencias.find(e => e.de === clave);
const eqHacia = clave => D.equivalencias.filter(e => e.a === clave);
function tipoDe(m) {
  if (m.plan === LDG) return eqDe(m.clave)?.tipo || 'Pendiente';
  const tipos = eqHacia(m.clave).map(e => e.tipo);
  if (tipos.includes('Directa')) return 'Directa';
  if (tipos.includes('Parcial')) return 'Parcial';
  return D.sinMedir[m.clave] ? 'Pendiente' : 'Nueva';
}
const academiaDe = m => m.academia;
const perfil = c => S.perfil[c] || { entrada: [], salida: [] };
const entregables = c => S.entregables[c] || [];
const candados = () => D.candados.map(c => ({ ...c, habilidad: S.candados.find(x => x.de === c.de && x.a === c.a && x.base)?.habilidad || '' }))
  .concat(S.candados.filter(c => !c.base));

function salidasPrevias(m) {
  const r = [];
  if (m.semestre == null) return r;
  for (const o of mats(m.plan)) if (o.semestre != null && o.semestre < m.semestre)
    for (const h of perfil(o.clave).salida) r.push({ h, de: o.clave });
  return r;
}
/* candados que la plataforma sugiere: B pide algo que A entrega y no hay candado A→B */
function sugeridos(m) {
  const prev = salidasPrevias(m), r = [];
  for (const h of perfil(m.clave).entrada) for (const p of prev)
    if (norm(p.h) === norm(h) && !candados().some(c => c.de === p.de && c.a === m.clave) && !r.some(x => x.de === p.de))
      r.push({ de: p.de, a: m.clave, habilidad: h });
  return r;
}
function continuidad(id) {
  const fs = D.equivalencias.filter(e => M[e.de].academia === id);
  if (!fs.length) return null;
  const d = fs.filter(e => e.tipo === 'Directa').length, p = fs.filter(e => e.tipo === 'Parcial').length;
  return { d, p, s: fs.length - d - p, n: fs.length, pct: Math.round(100 * (d + p) / fs.length) };
}
function dobles() {
  const g = {};
  for (const e of D.equivalencias) if (e.a) (g[e.a] = g[e.a] || []).push(e.de);
  return Object.entries(g).filter(([, v]) => v.length > 1);
}

/* ---------- cruces ---------- */
const GRUPO_REGLA = { 'Perfil sin capturar': 'capturar', 'Sin entregable': 'capturar', 'Candado sin justificar': 'capturar',
  'Revisar fuente': 'fuente', 'Dato faltante': 'fuente', 'Pendiente del cruce': 'fuente', 'Sin medir': 'fuente', 'Entregables contra perfil de egreso': 'fuente' };
function alertas() {
  const r = [];
  const add = (regla, texto, o = {}) => r.push({ regla, texto, grupo: o.g || GRUPO_REGLA[regla] || 'decidir', clave: o.clave || null, academia: o.academia ?? (o.clave ? academiaDe(M[o.clave]) : null), id: regla + '|' + (o.clave || o.id || texto) + (o.clave && o.id ? '|' + o.id : '') });

  for (const m of mats(LDVN)) {
    const p = perfil(m.clave), c = m.clave;
    if (academiaDe(m) == null) add('Sin academia', 'No tiene academia asignada', { clave: c });
    if (!p.entrada.length && m.semestre > 1) add('Perfil sin capturar', 'Falta el perfil de entrada', { clave: c, id: 'entrada' });
    if (!p.salida.length) add('Perfil sin capturar', 'Falta el perfil de salida', { clave: c, id: 'salida' });
    if (!entregables(c).length) add('Sin entregable', 'No tiene entregables', { clave: c });
    if (m.nota) add('Revisar fuente', m.nota, { clave: c });
  }
  for (const m of D.materias) {
    const prev = salidasPrevias(m).map(x => norm(x.h));
    for (const h of perfil(m.clave).entrada)
      if (!prev.includes(norm(h))) add('Perfil contra malla', `Pide «${h}» y ninguna materia previa lo entrega`, { clave: m.clave, id: norm(h) });
    for (const s of sugeridos(m)) add('Candado faltante', `Depende de ${s.de} por «${s.habilidad}» y no hay candado`, { clave: m.clave, id: s.de });
    if (m.plan === LDG && m.semestre == null) add('Dato faltante', 'Sin semestre en la fuente', { clave: m.clave });
  }
  for (const c of candados()) {
    const comparte = perfil(c.a).entrada.some(h => perfil(c.de).salida.some(x => norm(x) === norm(h)));
    if (!c.habilidad && !comparte) add('Candado sin justificar', `Candado ${c.de} → ${c.a} (${c.origen.toLowerCase()}) sin habilidad que lo sostenga`, { clave: c.a, id: c.de });
  }
  for (const sem of [...new Set(D.materias.map(m => m.plan + '|' + m.semestre))]) {
    const [plan, s] = sem.split('|'), vistos = {};
    for (const m of mats(plan).filter(m => String(m.semestre) === s)) for (const e of entregables(m.clave)) {
      const k = norm(e.nombre);
      if (vistos[k] && vistos[k] !== m.clave) add('Entregable repetido', `«${e.nombre}» también se pide en ${vistos[k]}, mismo semestre`, { clave: m.clave, id: k });
      vistos[k] = vistos[k] || m.clave;
    }
  }
  for (const e of D.equivalencias) {
    if (e.tipo === 'Directa' && !e.total) add('Equivalencia', 'Directa sin temario comparado', { clave: e.de, id: 'temario' });
    const p = pct(e), esperado = p == null ? null : p >= 66.6 ? 'Directa' : p >= 33.3 ? 'Parcial' : 'Sin equivalencia';
    if (esperado && esperado !== e.tipo) add('Equivalencia', `Declarada ${e.tipo} con ${e.cubiertas} de ${e.total} unidades; la regla daría ${esperado}`, { clave: e.de, id: 'regla' });
    if (e.pendiente) add('Pendiente del cruce', e.pendiente, { clave: e.de });
  }
  for (const [a, de] of dobles()) if (!S.acredita[a])
    add('Doble acreditación', `${de.join(' y ')} caen en ${a}; falta decidir cuál acredita`, { clave: a });
  for (const [c, motivo] of Object.entries(D.sinMedir)) add('Sin medir', motivo, { clave: c });

  for (const a of D.academias) {
    if (!a.lider) add('Academias', 'No tiene líder', { academia: a.id, id: 'l' + a.id });
    if (!S.dictamen[a.id]) add('Academias', 'Sin dictamen', { academia: a.id, id: 'd' + a.id, g: 'capturar' });
    if (!continuidad(a.id)) add('Sin medir', 'Continuidad sin medir: faltan planes analíticos 2021', { academia: a.id, id: 'c' + a.id });
  }
  const veces = {};
  for (const a of D.academias) for (const p of [...a.lider.split(' y '), ...a.apoyo]) (veces[p] = veces[p] || []).push(a.nombre);
  for (const [p, as] of Object.entries(veces)) if (as.length >= 3) add('Academias', `${p} aparece en ${as.length} academias: ${as.join(', ')}`, { id: p });
  for (const m of mats(LDG)) if (!(S.imparte[m.clave] || []).length) add('Sin profesor asignado', 'Falta capturar quién la imparte', { clave: m.clave, g: 'capturar' });
  add('Entregables contra perfil de egreso', 'Falta cargar las competencias del perfil de egreso LDVN', { id: 'egreso' });
  add('Candado sin justificar', 'Faltan por cargar los candados del plan 2021', { id: 'c2021', g: 'fuente' });
  return r;
}

/* ---------- navegación ---------- */
const VISTAS = { academias: 'Academias', malla: 'Materias', juntas: 'Juntas', resumen: 'Transición', usuarios: 'Usuarios' };
const SUB = { resumen: 'Resumen', dictamen: 'Continuidad y dictamen', equivalencias: 'Equivalencias', alumno: 'Alumno por semestre', alertas: 'Alertas', exportes: 'Exportar' };
const SOLO_GESTION = ['resumen'];
let sel = null, filtroAcad = '', filtroRegla = '', planAlumno = LDVN, planMalla = LDVN;
const visibles = () => Object.keys(VISTAS).filter(k => (k !== 'usuarios' || (sb && esDireccion())) && (YO.rol !== 'profesor' || !SOLO_GESTION.includes(k)));
const vista = () => { const h = location.hash.slice(1); return visibles().includes(h) || (h in SUB && YO.rol !== 'profesor') ? h : 'academias'; };

function pintar() {
  if (!D) return;
  const v = vista(), n = alertas().filter(a => a.grupo === 'decidir').length;
  $('nav').innerHTML = visibles().map(k =>
    `<a href="#${k}" class="${k === v || (k === 'resumen' && v in SUB) ? 'activa' : ''}">${VISTAS[k]}${k === 'resumen' && n ? `<span class="cuenta">${n}</span>` : ''}</a>`).join('');
  $('sesion').innerHTML = sb ? `<span>${esc(YO.correo)} · ${ROLES[YO.rol]}${YO.rol === 'lider' && A[YO.academia] ? ' · ' + esc(A[YO.academia].nombre) : ''}</span><button class="suave mini" onclick="salir()">Salir</button>` : '';
  const sub = v in SUB ? `<div class="sub">${Object.entries(SUB).map(([k, t]) => `<a href="#${k}" class="${k === v ? 'activa' : ''}">${t}${k === 'alertas' && n ? `<span class="cuenta">${n}</span>` : ''}</a>`).join('')}</div>` : '';
  $('vista').innerHTML = sub + ({ juntas: vJuntas, resumen: vResumen, malla: vMalla, alumno: vAlumno, academias: vAcademias, dictamen: vDictamen, equivalencias: vEquivalencias, alertas: vAlertas, exportes: vExportes, usuarios: vUsuarios })[v]();
  pintarFicha();
}
window.addEventListener('hashchange', pintar);
function abrir(clave) { sel = clave; pintar(); }
function cerrar() { sel = null; pintar(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sel && !/TEXTAREA|INPUT/.test(e.target.tagName)) cerrar(); });

const opcionesAcad = (v, vacio) => `<option value="">${vacio}</option>` + D.academias.map(a => `<option value="${a.id}" ${String(v) === String(a.id) ? 'selected' : ''}>${a.id} ${esc(a.nombre)}</option>`).join('');

/* ---------- piezas compartidas ---------- */
/* Una marca por unidad temática: llena = cubierta en LDVN. Se cuenta, no se estima. */
const tira = (c, t) => (t ? `<span class="tira" role="img" aria-label="${c} de ${t} unidades">${'<i class="on"></i>'.repeat(c)}${'<i></i>'.repeat(t - c)}</span>` : '');
/* Continuidad sobre una escala común de 0 a 100, con la marca de 60 % */
const barraCont = c => (c ? `<span class="cont ${c.pct < 60 ? 'bajo' : ''}"><span class="pista"><i style="width:${c.pct}%"></i></span><b>${c.pct} %</b></span>` : '<span class="gris">Sin medir</span>');
const enlaceMat = c => `<a href="javascript:abrir('${c}')">${esc(M[c].nombre)}</a>`;

/* ---------- resumen ---------- */
function vResumen() {
  const al = alertas(), g = k => al.filter(a => a.grupo === k);
  const conteo = (titulo, total, partes) => `<div class="conteo"><div class="rot"><b>${titulo}</b><span class="gris">${total} materias</span></div>
    <div class="unidades">${partes.map(([t, n]) => `<i class="u ${claseTipo(t)}" title="${t}"></i>`.repeat(n)).join('')}</div>
    <ul class="claves">${partes.filter(([, n]) => n).map(([t, n, rot]) => `<li><span class="tipo ${claseTipo(t)}">${rot || t}</span><b>${n}</b></li>`).join('')}</ul></div>`;
  const n21 = t => D.equivalencias.filter(e => e.tipo === t).length, vn = mats(LDVN), nvn = t => vn.filter(m => tipoDe(m) === t).length;
  const decidir = g('decidir');
  const frac = (a, b) => `<td class="num ${b && a === b ? '' : 'gris'}">${b ? `${a} de ${b}` : '—'}</td>`;
  const filaCap = (rot, ms, dict) => {
    const conEntrada = ms.filter(m => m.semestre > 1);
    return `<tr><td>${rot}</td><td class="num">${ms.length}</td>${frac(conEntrada.filter(m => perfil(m.clave).entrada.length).length, conEntrada.length)}
      ${frac(ms.filter(m => perfil(m.clave).salida.length).length, ms.length)}${frac(ms.filter(m => entregables(m.clave).length).length, ms.length)}<td>${dict}</td></tr>`;
  };
  const sinAcad = vn.filter(m => academiaDe(m) == null);
  return `<div class="encabezado"><h1>Transición</h1></div>
  <section class="bloque"><h2>Equivalencias</h2>
    ${conteo(LDG, D.equivalencias.length, [['Directa', n21('Directa')], ['Parcial', n21('Parcial')], ['Sin equivalencia', n21('Sin equivalencia')]])}
    ${conteo(LDVN, vn.length, [['Directa', nvn('Directa'), 'Con antecedente directo'], ['Parcial', nvn('Parcial'), 'Con antecedente parcial'], ['Nueva', nvn('Nueva'), 'Nueva'], ['Pendiente', nvn('Pendiente'), 'Sin medir']])}
  </section>
  <section class="bloque"><h2>Continuidad por academia</h2>
    <table class="compacta"><thead><tr><th>Academia</th><th>Líder</th><th class="num">Materias 2021</th><th>Con espejo en LDVN<span class="escala"><i>0</i><i style="left:60%">60</i><i style="left:100%">100 %</i></span></th><th>Dictamen</th></tr></thead><tbody>
    ${D.academias.map(a => { const c = continuidad(a.id); return `<tr><td><a href="#dictamen">${a.id} ${esc(a.nombre)}</a></td><td>${esc(a.lider)}</td><td class="num">${c ? c.n : '—'}</td><td>${barraCont(c)}</td><td class="${S.dictamen[a.id] ? '' : 'gris'}">${S.dictamen[a.id] || 'Por definir'}</td></tr>`; }).join('')}
    </tbody></table></section>
  <div class="dos">
  <section class="bloque"><h2>Por decidir <span class="gris">${decidir.length}</span></h2>
    ${decidir.length ? `<ul class="lista">${decidir.map(a => `<li><span class="regla">${esc(a.regla)}</span>${a.clave ? `${a.clave} ${enlaceMat(a.clave)} · ` : a.academia != null ? `${esc(A[a.academia].nombre)} · ` : ''}${esc(a.texto)}</li>`).join('')}</ul>` : '<p class="gris">Nada pendiente</p>'}
  </section>
  <section class="bloque"><h2>Captura LDVN <span class="gris">${g('capturar').length} por capturar</span></h2>
    <table class="compacta"><thead><tr><th>Academia</th><th class="num">Materias</th><th class="num">Perfil de entrada</th><th class="num">Perfil de salida</th><th class="num">Entregables</th><th>Dictamen</th></tr></thead><tbody>
    ${D.academias.map(a => filaCap(`${a.id} ${esc(a.nombre)}`, vn.filter(m => academiaDe(m) === a.id), S.dictamen[a.id] ? esc(S.dictamen[a.id]) : '<span class="gris">Por definir</span>')).join('')}
    ${sinAcad.length ? filaCap('Sin academia', sinAcad, '') : ''}
    </tbody></table>
    <p class="chico gris" style="margin-top:14px"><a href="#alertas" onclick="filtroGrupo='fuente';filtroRegla=''">${g('fuente').length} puntos por revisar en la fuente</a></p>
  </section></div>`;
}

/* ---------- malla ---------- */
function vMalla() {
  const dec = alertas().filter(a => a.grupo === 'decidir'), nDec = c => dec.filter(a => a.clave === c).length;
  const pares = sel ? (M[sel].plan === LDG ? [eqDe(sel)?.a] : eqHacia(sel).map(e => e.de)).filter(Boolean) : [];
  const plan = p => {
    const ms = mats(p), sems = [...new Set(ms.map(m => m.semestre))].sort((a, b) => (a ?? 99) - (b ?? 99));
    return `<section class="plan"><h2>${p} <span class="gris">${ms.length} materias</span></h2><div class="rejilla">${sems.map(s => `<div class="col"><div class="sem">${s == null ? 'Sin semestre' : 'Semestre ' + s}</div>${
      ms.filter(m => m.semestre === s).map(m => {
        const fuera = filtroAcad !== '' && String(academiaDe(m)) !== filtroAcad, n = nDec(m.clave), t = tipoDe(m);
        return `<button class="mat ${m.clave === sel ? 'sel' : ''} ${pares.includes(m.clave) ? 'par' : ''} ${fuera ? 'fuera' : ''}" onclick="abrir('${m.clave}')">
          <span class="n">${esc(m.nombre)}</span><span class="meta"><span class="tipo ${claseTipo(t)}" title="${t}"></span>${m.clave}${m.creditos ? ` · ${m.creditos} cr` : ''}${n ? `<span class="av" title="Por decidir">${n} por decidir</span>` : ''}</span></button>`;
      }).join('')}</div>`).join('')}</div></section>`;
  };
  const op = (v, t) => `<button class="${planMalla === v ? 'on' : ''}" onclick="planMalla='${v}';pintar()">${t}</button>`;
  return `<div class="encabezado"><h1>Malla</h1><div class="controles">
    <div class="segmento">${op(LDVN, LDVN)}${op(LDG, LDG)}${op('ambos', 'Ambos')}</div>
    <select onchange="filtroAcad=this.value;pintar()">${opcionesAcad(filtroAcad, 'Todas las academias')}</select></div></div>
    <div class="leyenda">${['Directa', 'Parcial', 'Sin equivalencia', 'Nueva', 'Pendiente'].map(t => `<span class="tipo ${claseTipo(t)}">${t === 'Pendiente' ? 'Sin medir' : t}</span>`).join('')}</div>
    ${planMalla !== LDG ? plan(LDVN) : ''}${planMalla !== LDVN ? plan(LDG) : ''}`;
}

/* ---------- ficha ---------- */
/* Orden pensado para quien llega a impartirla: con quién, para qué, qué temas, con qué ejemplos; después lo curricular. */
function pintarFicha() {
  const f = $('ficha');
  document.body.classList.toggle('con-ficha', !!sel);
  f.hidden = !sel;
  if (!sel) return;
  const m = M[sel], ac = A[academiaDe(m)], p = perfil(sel), als = alertas().filter(a => a.clave === sel);
  const eqs = m.plan === LDG ? [eqDe(sel)].filter(Boolean) : eqHacia(sel);
  const cs = candados().filter(c => c.a === sel || c.de === sel), sug = sugeridos(m);
  const edita = puedeMateria(m), edCurso = puedeCurso(m), cu = curso(sel);
  const prev = edita ? [...new Set(salidasPrevias(m).map(x => x.h))].filter(h => !p.entrada.some(x => norm(x) === norm(h))) : [];
  const doble = dobles().find(([a]) => a === sel), t = tipoDe(m);
  const notas = k => als.filter(a => a.grupo === k).map(a => `<p class="nota ${k}"><b>${esc(a.regla)}.</b> ${esc(a.texto)}</p>`).join('');
  const area = (accion, ok, ph) => `<textarea ${no(ok)} placeholder="${ok ? ph : 'Sin capturar'}" onchange="${accion}">`;
  f.innerHTML = `<button class="cerrar" onclick="cerrar()" aria-label="Cerrar">×</button>
    <p class="sobre">${m.clave} · ${m.plan}</p><h2>${esc(m.nombre)}</h2>
    <dl class="datos"><div><dt>Semestre</dt><dd>${m.semestre ?? '—'}</dd></div><div><dt>Créditos</dt><dd>${m.creditos ?? '—'}</dd></div><div><dt>Horas</dt><dd>${m.horas ?? '—'}</dd></div></dl>
    ${notas('decidir')}
    <h3>Academia</h3>
    ${m.plan === LDVN && esDireccion() ? `<select onchange="setAcademia('${sel}',this.value)">${opcionesAcad(academiaDe(m) ?? '', 'Sin academia')}</select>` : `<p>${ac ? ac.id + ' ' + esc(ac.nombre) : '—'}</p>`}
    ${m.academiaOrigen ? `<p class="chico gris">Propuesta: ${esc(m.academiaOrigen[0].toLowerCase() + m.academiaOrigen.slice(1))}</p>` : ''}
    ${ac ? `${ac.lider.split(' y ').map(l => `<div class="persona">${retrato(l, 'mini')}<span><b>${esc(l)}</b><span class="clave">Líder de academia</span></span></div>`).join('')}<p class="chico gris">Apoyo: ${esc(ac.apoyo.join(', '))}</p>` : ''}
    <h3>Quién la imparte</h3>
    ${edita ? `${area('setImparte(this.value)', true, 'Nombre | correo, una persona por línea')}${esc(imparten(sel).map(x => (x.nombre ? x.nombre + ' | ' : '') + x.correo).join('\n'))}</textarea>`
      : imparten(sel).length ? `<ul class="simple">${imparten(sel).map(x => `<li>${esc(x.nombre || x.correo)}${x.nombre ? ` <span class="gris">${esc(x.correo)}</span>` : ''}</li>`).join('')}</ul>` : '<p class="gris">Sin asignar</p>'}
    <h3>Objetivo</h3><p>${esc(m.objetivo)}</p>
    <h3>Temas</h3><ol>${m.unidades.map(u => `<li>${esc(u)}</li>`).join('')}</ol>
    <h3>Plan de clase</h3>
    ${area("setCurso('plan',this.value)", edCurso, 'Cómo se trabaja cada tema este periodo')}${esc(cu.plan)}</textarea>
    <div class="campo"><span>Cliente o colaboración</span><input type="text" ${no(edCurso)} placeholder="${edCurso ? 'Con quién se trabaja este periodo' : 'Ninguno'}" value="${esc(cu.cliente)}" onchange="setCurso('cliente',this.value)"></div>
    <h3>Ejemplos</h3>
    ${ejemplos(sel).length ? `<ul class="simple">${ejemplos(sel).filter(e => /^https?:\/\//i.test(e.url)).map(e => `<li><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.titulo)}</a>${edCurso ? ` <button class="suave mini" onclick="quitarEjemplo(${e.id})">Quitar</button>` : ''}</li>`).join('')}</ul>` : '<p class="gris">Ninguno</p>'}
    ${edCurso ? `<form class="alta" style="margin:8px 0 0" onsubmit="addEjemplo(event)"><input type="text" name="titulo" required placeholder="Título" style="flex:1;min-width:120px"><input type="text" name="url" required placeholder="Liga" style="flex:1;min-width:120px"><button class="suave">Agregar</button></form>` : ''}
    <h3>Entregables</h3>
    ${area('capEntregables(this.value)', puedeEntregables(m), 'Entregable | competencia que evidencia')}${esc(entregables(sel).map(e => e.nombre + (e.competencia ? ' | ' + e.competencia : '')).join('\n'))}</textarea>
    <details class="mas" ${fichaMas ? 'open' : ''} ontoggle="fichaMas=this.open"><summary>Plan de estudios</summary>
    <h3>Perfil de entrada</h3>
    ${area("capPerfil('entrada',this.value)", edita, 'Una habilidad por línea')}${esc(p.entrada.join('\n'))}</textarea>
    ${prev.length ? `<p class="chico gris" style="margin-top:8px">Lo entregan materias previas:</p><div class="fichas-hab">${prev.map(h => `<button class="suave mini" onclick="capPerfil('entrada',perfil(sel).entrada.concat(this.textContent).join('\\n'))">${esc(h)}</button>`).join('')}</div>` : ''}
    <h3>Perfil de salida</h3>
    ${area("capPerfil('salida',this.value)", edita, 'Una habilidad por línea')}${esc(p.salida.join('\n'))}</textarea>
    <h3>Candados</h3>
    ${cs.length || sug.length ? '' : '<p class="gris">Ninguno</p>'}
    ${cs.map(c => `<div class="eq"><p><b>${c.de} → ${c.a}</b> <span class="gris">${c.tipo} · ${c.origen}${c.fuente ? ' · ' + esc(c.fuente) : ''}</span></p>
      <div class="campo"><span>Habilidad que lo justifica</span><input type="text" ${no(puedeMateria(M[c.a]))} value="${esc(c.habilidad)}" onchange="capHabilidad('${c.de}','${c.a}',this.value)"></div>
      ${c.origen === 'Sugerido' && puedeMateria(M[c.a]) ? `<button class="suave mini" onclick="quitarCandado('${c.de}','${c.a}')">Quitar</button>` : ''}</div>`).join('')}
    ${sug.map(s => `<div class="eq"><p><b>${s.de} → ${s.a}</b> <span class="gris">Sugerido: pide «${esc(s.habilidad)}»</span></p>${edita ? `<button class="mini" onclick="aceptarCandado('${s.de}','${s.a}',this.dataset.h)" data-h="${esc(s.habilidad)}">Aceptar como recomendación</button>` : ''}</div>`).join('')}
    <h3>${m.plan === LDG ? 'Equivale en LDVN' : 'Antecedente en LDG 2021'}</h3>
    ${eqs.length ? eqs.map(e => { const o = m.plan === LDG ? e.a : e.de; return `<div class="eq"><p><span class="tipo ${claseTipo(e.tipo)}">${e.tipo}</span>${e.total ? ` ${tira(e.cubiertas, e.total)} <span class="gris">${e.cubiertas} de ${e.total} unidades</span>` : ''}</p>
      ${o ? `<p>${o} ${enlaceMat(o)}</p>` : ''}<p class="chico">${esc(e.evidencia)}</p>${e.pendiente ? `<p class="chico gris">${esc(e.pendiente)}</p>` : ''}</div>`; }).join('')
      : `<p><span class="tipo ${claseTipo(t)}">${t === 'Pendiente' ? 'Sin medir' : t}</span></p><p class="chico gris">${esc(D.sinMedir[sel] || 'Sin antecedente en el plan 2021')}</p>`}
    ${doble ? `<div class="campo"><span>Acredita</span><select ${no(esDireccion())} onchange="setAcredita('${sel}',this.value)"><option value="">Por decidir</option>${doble[1].map(c => `<option ${S.acredita[sel] === c ? 'selected' : ''}>${c}</option>`).join('')}<option ${S.acredita[sel] === 'Ambas' ? 'selected' : ''}>Ambas</option></select></div>` : ''}
    ${m.fuente || notas('fuente') ? `<h3>Fuente</h3>${/^https?:\/\//i.test(m.fuente) ? `<p><a href="${esc(m.fuente)}" target="_blank" rel="noopener">${m.plan === LDG ? 'Plan analítico 2021' : 'Programa LDVN'} en Drive</a></p>` : ''}${notas('fuente')}` : ''}</details>`;
}

/* ---------- capturas ---------- */
function setAcademia(c, v) {
  const id = v === '' ? null : +v;
  M[c].academia = id; M[c].academiaOrigen = null; S.academia[c] = v;
  guardar(sb && sb.from('materias').update({ academia_id: id, academia_origen: null }).eq('clave', c)); pintar();
}
function setAcredita(c, v) { S.acredita[c] = v; guardar(sb && sb.from('materias').update({ acredita: v || null }).eq('clave', c)); pintar(); }
function setDictamen(id, v) { S.dictamen[id] = v; guardar(sb && sb.from('academias').update({ dictamen: v || null }).eq('id', id)); pintar(); }
function setLiderPropuesto(id, v) { S.liderPropuesto[id] = v.trim(); guardar(sb && sb.from('academias').update({ lider_propuesto: v.trim() || null }).eq('id', id)); }
function setResponsable(id, v) {
  v = v.trim(); if (v) S.responsable[id] = v; else delete S.responsable[id];
  guardar(sb && (v ? sb.from('responsables').upsert({ alerta: id, responsable: v }) : sb.from('responsables').delete().eq('alerta', id)));
}
function capPerfil(lado, texto) {
  const p = S.perfil[sel] = { ...perfil(sel), [lado]: lineas(texto) };
  guardar(sb && sb.from('materias').update({ perfil_entrada: p.entrada, perfil_salida: p.salida }).eq('clave', sel)); pintar();
}
async function capEntregables(texto) {
  const clave = sel, antes = entregables(clave), libres = [...antes];
  const ahora = lineas(texto).map(l => { const [n, ...c] = l.split('|'); return { nombre: n.trim(), competencia: c.join('|').trim() }; });
  for (const e of ahora) { const i = libres.findIndex(x => x.nombre === e.nombre && x.competencia === e.competencia); if (i >= 0) e.id = libres.splice(i, 1)[0].id; }
  S.entregables[clave] = ahora;
  if (!sb) { guardar(); pintar(); return; }
  const nuevos = ahora.filter(e => !e.id);
  if (libres.length) await guardar(sb.from('entregables').delete().in('id', libres.map(e => e.id)));
  if (nuevos.length) {
    const { data, error } = await sb.from('entregables').insert(nuevos.map(e => ({ materia: clave, nombre: e.nombre, competencia: e.competencia }))).select();
    if (error) { aviso('No se guardó: ' + error.message); await cargarRemoto(); }
    else nuevos.forEach((e, i) => (e.id = data[i].id));
  }
  pintar();
}
function capHabilidad(de, a, h) {
  let c = S.candados.find(x => x.de === de && x.a === a);
  if (!c) S.candados.push(c = { de, a, base: true });
  c.habilidad = h.trim();
  guardar(sb && sb.from('candados').update({ habilidad: c.habilidad }).eq('de', de).eq('a', a)); pintar();
}
function aceptarCandado(de, a, habilidad) {
  const c = { de, a, tipo: 'Seriación', origen: 'Sugerido', fuente: 'Recomendación interna', habilidad };
  S.candados.push(c); guardar(sb && sb.from('candados').insert(c)); pintar();
}
function quitarCandado(de, a) {
  S.candados = S.candados.filter(c => !(c.de === de && c.a === a && !c.base));
  guardar(sb && sb.from('candados').delete().eq('de', de).eq('a', a)); pintar();
}

/* ---------- equipo: quién imparte, curso y ejemplos ---------- */
const imparten = c => S.imparte[c] || [];
const imparto = c => !!YO.correo && imparten(c).some(p => p.correo === YO.correo);
const puedeCurso = m => puedeMateria(m) || (YO.rol === 'profesor' && imparto(m.clave));
const curso = c => S.curso[c] || { cliente: '', plan: '' };
const ejemplos = c => S.ejemplos[c] || [];
const fecha = (f, hora = true) => new Date(f).toLocaleString('es-MX', hora ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' });

/* crea una fila y devuelve la que quedó guardada (con su id) */
async function crear(tabla, fila) {
  if (!sb) { const r = { ...fila, id: Date.now() }; return r; }
  const { data, error } = await sb.from(tabla).insert(fila).select().single();
  if (error) { aviso('No se guardó: ' + error.message); return null; }
  return data;
}
async function setImparte(texto) {
  const c = sel, filas = lineas(texto), lista = [];
  for (const l of filas) {
    const partes = l.split('|').map(x => x.trim()), correo = partes.find(x => x.includes('@'));
    if (!correo) { aviso('Cada persona necesita correo: Nombre | correo'); return pintar(); }
    lista.push({ nombre: partes.find(x => !x.includes('@')) || '', correo: correo.toLowerCase() });
  }
  S.imparte[c] = lista;
  if (sb) {
    await guardar(sb.from('imparte').delete().eq('materia', c));
    if (lista.length) await guardar(sb.from('imparte').insert(lista.map(p => ({ materia: c, ...p }))));
  } else guardar();
  pintar();
}
function setCurso(campo, v) {
  S.curso[sel] = { ...curso(sel), [campo]: v.trim() };
  guardar(sb && sb.from('cursos').upsert({ materia: sel, ...S.curso[sel] })); pintar();
}
async function addEjemplo(ev) {
  ev.preventDefault();
  const f = ev.target, url = f.url.value.trim();
  if (!/^https?:\/\//i.test(url)) return aviso('La liga debe empezar con https://');
  const fila = await crear('ejemplos', { materia: sel, titulo: f.titulo.value.trim(), url });
  if (fila) { (S.ejemplos[sel] = ejemplos(sel)).push(fila); guardar(); }
  pintar();
}
function quitarEjemplo(id) {
  S.ejemplos[sel] = ejemplos(sel).filter(e => e.id !== id);
  guardar(sb && sb.from('ejemplos').delete().eq('id', id)); pintar();
}

/* ---------- matriz de academias ---------- */
/* Fotos: las mismas del directorio del CRGS que ya usa el sitio (assets/profes). */
const FOTOS = (/^(localhost|127\.)/.test(location.hostname) ? 'https://portfolioldg.com' : '') + '/assets/profes/';
const FOTO = [['ceballos', 'natalia-ceballos'], ['trujillo', 'sergio-trujillo'], ['garrido', 'marco-garrido'], ['angulo', 'rolando-angulo'], ['delgado de robles', 'carlos-delgado'],
  ['mateos', 'fernando-mateos'], ['moreno guzm', 'iliana-moreno'], ['guerra tamez', 'cristobal-guerra'], ['garcia hern', 'mariel-garcia'], ['guizar', 'eduardo-guizar']];
const retrato = (nombre, cls = '') => {
  const n = norm(nombre), f = FOTO.find(([k]) => n.includes(k));
  return f ? `<img class="retrato ${cls}" src="${FOTOS}${f[1]}.jpg" alt="" loading="lazy">` : `<span class="retrato sin ${cls}">${esc(nombre.split(/\s+/).slice(0, 2).map(x => x[0]).join(''))}</span>`;
};
let planMatriz = LDG;
function vAcademias() {
  const op = (v, t) => `<button class="${planMatriz === v ? 'on' : ''}" onclick="planMatriz='${v}';pintar()">${t}</button>`;
  return `<div class="encabezado"><h1>Academias</h1><div class="segmento">${op(LDG, 'Plan 2021')}${op(LDVN, 'LDVN 2027')}</div></div>
  <div class="matriz">${D.academias.map(a => {
    const ms = mats(planMatriz).filter(m => academiaDe(m) === a.id), ls = a.lider.split(' y ');
    return `<article class="celda"><div class="fotos">${ls.map(l => retrato(l)).join('')}</div>
      <h2>${esc(a.nombre)}</h2><p class="lider">${ls.map(esc).join('<br>')}</p>
      ${a.apoyo.length ? `<p class="chico gris">Apoyo: ${esc(a.apoyo.join(', '))}</p>` : ''}
      ${ms.length ? `<ul class="simple chico">${ms.map(m => `<li>${enlaceMat(m.clave)}</li>`).join('')}</ul>` : ''}</article>`;
  }).join('')}</div>`;
}

/* ---------- juntas, minutas y firmas ---------- */
let selJunta = null, fichaMas = false;
const estadoJunta = j => (j.cerrada ? `Cerrada · ${j.firmas.length} ${j.firmas.length === 1 ? 'firma' : 'firmas'}` : j.minuta || j.acuerdos.length ? 'Minuta en borrador' : 'Convocada');
const puedeConvocar = () => esDireccion() || YO.rol === 'lider';
const puedeMinuta = j => !j.cerrada && ['direccion', 'lider', 'profesor'].includes(YO.rol);
const puedeReabrir = j => esDireccion() || (YO.rol === 'lider' && j.academia_id === YO.academia);
const juntaSel = () => S.juntas.find(j => j.id === selJunta);

async function convocar(ev) {
  ev.preventDefault();
  const f = ev.target, fila = { titulo: f.titulo.value.trim(), fecha: new Date(f.fecha.value).toISOString(), lugar: f.lugar.value.trim(), academia_id: f.academia.value === '' ? null : +f.academia.value };
  const j = await crear('juntas', fila);
  if (j) { S.juntas.push({ minuta: '', minuta_por: null, archivo_url: '', cerrada: false, convocada_por: YO.correo, ...j, acuerdos: [], firmas: [] }); guardar(); selJunta = j.id; }
  pintar();
}
function setJunta(campo, v) {
  if (campo === 'archivo_url' && v && !/^https?:\/\//i.test(v)) { aviso('La liga debe empezar con https://'); return pintar(); }
  const j = juntaSel(), cambio = { [campo]: v };
  if (campo === 'minuta') cambio.minuta_por = YO.correo || null;
  if (campo === 'cerrada' && !v) j.firmas = [];
  Object.assign(j, cambio);
  guardar(sb && sb.from('juntas').update(cambio).eq('id', j.id)); pintar();
}
function cancelarJunta() {
  const id = selJunta; S.juntas = S.juntas.filter(j => j.id !== id); selJunta = null;
  guardar(sb && sb.from('juntas').delete().eq('id', id)); pintar();
}
async function addAcuerdo(ev) {
  ev.preventDefault();
  const f = ev.target, j = juntaSel();
  const a = await crear('acuerdos', { junta: j.id, texto: f.texto.value.trim(), responsable: f.responsable.value.trim(), fecha_limite: f.limite.value || null });
  if (a) { j.acuerdos.push({ hecho: false, ...a }); guardar(); }
  pintar();
}
function setAcuerdo(id, hecho) {
  juntaSel().acuerdos.find(a => a.id === id).hecho = hecho;
  guardar(sb && sb.from('acuerdos').update({ hecho }).eq('id', id)); pintar();
}
function quitarAcuerdo(id) {
  const j = juntaSel(); j.acuerdos = j.acuerdos.filter(a => a.id !== id);
  guardar(sb && sb.from('acuerdos').delete().eq('id', id)); pintar();
}
async function firmar() {
  const j = juntaSel(), f = { junta: j.id, nombre: YO.nombre || '' };
  if (sb) {
    const { data, error } = await sb.from('firmas').insert(f).select().single();
    if (error) return aviso('No se guardó: ' + error.message);
    j.firmas.push(data);
  } else { j.firmas.push({ ...f, correo: YO.correo, firmado_en: new Date().toISOString() }); guardar(); }
  pintar();
}

function vJuntas() {
  const j = juntaSel();
  if (j) return vJunta(j);
  const acad = x => (x.academia_id == null ? 'General' : `${x.academia_id} ${esc(A[x.academia_id].nombre)}`);
  const orden = [...S.juntas].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const soloMia = YO.rol === 'lider';
  return `<div class="encabezado"><h1>Juntas</h1></div>
  ${puedeConvocar() ? `<form class="alta" onsubmit="convocar(event)"><input type="text" name="titulo" required placeholder="Asunto de la junta">
    <input type="datetime-local" name="fecha" required><input type="text" name="lugar" placeholder="Lugar o liga">
    <select name="academia">${soloMia ? `<option value="${YO.academia}">${YO.academia} ${esc(A[YO.academia]?.nombre || '')}</option>` : opcionesAcad('', 'General')}</select><button>Convocar</button></form>` : ''}
  ${orden.length ? `<table><thead><tr><th>Fecha</th><th>Junta</th><th>Academia</th><th>Estado</th><th class="num">Acuerdos</th></tr></thead><tbody>
    ${orden.map(x => `<tr class="fila" onclick="selJunta=${x.id};pintar()"><td class="num" style="text-align:left">${fecha(x.fecha)}</td><td><b>${esc(x.titulo)}</b>${x.lugar ? `<span class="clave">${esc(x.lugar)}</span>` : ''}</td><td>${acad(x)}</td><td>${estadoJunta(x)}</td><td class="num">${x.acuerdos.length}</td></tr>`).join('')}
    </tbody></table>` : '<p class="gris">Ninguna junta registrada</p>'}
  ${(() => {
    const firma = YO.rol !== 'escolares' ? S.juntas.filter(x => x.cerrada && !x.firmas.some(f => f.correo === YO.correo)) : [];
    const abiertos = S.juntas.filter(x => x.cerrada).flatMap(x => x.acuerdos.filter(a => !a.hecho).map(a => ({ ...a, x })));
    const liga = x => `<a href="javascript:void 0" onclick="selJunta=${x.id};pintar()">${esc(x.titulo)}</a>`;
    return `<div class="dos" style="margin-top:36px">
      ${firma.length ? `<section class="bloque"><h2>Por firmar <span class="gris">${firma.length}</span></h2><ul class="lista">${firma.map(x => `<li>${liga(x)}<span class="clave">${fecha(x.fecha, false)}</span></li>`).join('')}</ul></section>` : ''}
      ${abiertos.length ? `<section class="bloque"><h2>Acuerdos abiertos <span class="gris">${abiertos.length}</span></h2><ul class="lista">${abiertos.map(a => `<li>${esc(a.texto)}<span class="clave">${a.responsable ? esc(a.responsable) + ' · ' : ''}${a.fecha_limite ? 'para el ' + fecha(a.fecha_limite + 'T12:00', false) + ' · ' : ''}${liga(a.x)}</span></li>`).join('')}</ul></section>` : ''}</div>`;
  })()}`;
}
function vJunta(j) {
  const abre = puedeMinuta(j), firme = j.firmas.some(f => f.correo === YO.correo);
  return `<p class="volver"><a href="javascript:void 0" onclick="selJunta=null;pintar()">← Juntas</a></p>
  <div class="encabezado"><h1>${esc(j.titulo)}</h1><span class="gris">${estadoJunta(j)}</span></div>
  <dl class="datos"><div><dt>Fecha</dt><dd>${fecha(j.fecha)}</dd></div><div><dt>Academia</dt><dd>${j.academia_id == null ? 'General' : esc(A[j.academia_id].nombre)}</dd></div>
    ${j.lugar ? `<div><dt>Lugar</dt><dd>${esc(j.lugar)}</dd></div>` : ''}${j.convocada_por ? `<div><dt>Convoca</dt><dd>${esc(j.convocada_por)}</dd></div>` : ''}</dl>
  <div class="dos" style="margin-top:28px">
  <section class="bloque"><h2>Minuta ${j.minuta_por ? `<span class="gris">${esc(j.minuta_por)}</span>` : ''}</h2>
    <textarea class="minuta" ${no(abre)} placeholder="${abre ? 'Lo que se trató' : 'Sin minuta'}" onchange="setJunta('minuta',this.value)">${esc(j.minuta)}</textarea>
    <div class="campo"><span>Archivo o acta</span>${abre ? `<input type="text" placeholder="Liga a Drive" value="${esc(j.archivo_url)}" onchange="setJunta('archivo_url',this.value.trim())">` : /^https?:\/\//i.test(j.archivo_url) ? `<a href="${esc(j.archivo_url)}" target="_blank" rel="noopener">Abrir</a>` : '<span class="gris">—</span>'}</div>
    <div class="controles" style="margin-top:18px">
      ${abre ? `<button onclick="setJunta('cerrada',true)">Cerrar minuta para firma</button>` : ''}
      ${j.cerrada && puedeReabrir(j) ? `<button class="suave" onclick="setJunta('cerrada',false)">Reabrir</button>` : ''}
      ${!j.cerrada && puedeReabrir(j) ? `<button class="suave" onclick="cancelarJunta()">Cancelar junta</button>` : ''}
    </div>
  </section>
  <section class="bloque"><h2>Acuerdos <span class="gris">${j.acuerdos.length}</span></h2>
    ${j.acuerdos.length ? `<table class="compacta"><tbody>${j.acuerdos.map(a => `<tr><td style="width:28px"><input type="checkbox" ${a.hecho ? 'checked' : ''} ${no(abre || puedeReabrir(j) || YO.rol === 'lider')} onchange="setAcuerdo(${a.id},this.checked)" aria-label="Cumplido"></td>
      <td class="${a.hecho ? 'hecho' : ''}">${esc(a.texto)}<span class="clave">${a.responsable ? esc(a.responsable) : 'Sin responsable'}${a.fecha_limite ? ' · para el ' + fecha(a.fecha_limite + 'T12:00', false) : ''}</span></td>
      <td class="num">${abre ? `<button class="suave mini" onclick="quitarAcuerdo(${a.id})">Quitar</button>` : ''}</td></tr>`).join('')}</tbody></table>` : '<p class="gris">Ninguno</p>'}
    ${abre ? `<form class="alta" style="margin-top:14px" onsubmit="addAcuerdo(event)"><input type="text" name="texto" required placeholder="Acuerdo" style="flex:1"><input type="text" name="responsable" placeholder="Responsable"><input type="date" name="limite" aria-label="Fecha límite"><button>Agregar</button></form>` : ''}
    ${j.cerrada ? `<h2 style="margin-top:28px">Firmas <span class="gris">${j.firmas.length}</span></h2>
      ${j.firmas.length ? `<ul class="lista">${j.firmas.map(f => `<li>${esc(f.nombre || f.correo || '')}<span class="clave">${f.nombre ? esc(f.correo || '') + ' · ' : ''}${fecha(f.firmado_en)}</span></li>`).join('')}</ul>` : '<p class="gris">Nadie ha firmado</p>'}
      ${!firme && YO.rol !== 'escolares' ? `<button style="margin-top:14px" onclick="firmar()">Firmar minuta</button>` : ''}` : ''}
  </section></div>`;
}

/* ---------- alumno por semestre ---------- */
function vAlumno() {
  const ms = mats(planAlumno).filter(m => m.semestre != null), sems = [...new Set(ms.map(m => m.semestre))].sort((a, b) => a - b);
  const li = xs => xs.length ? `<ul>${xs.join('')}</ul>` : '<p class="gris chico">Sin perfiles capturados</p>';
  return `<div class="encabezado"><h1>Alumno por semestre</h1><div class="controles"><select onchange="planAlumno=this.value;pintar()">${[LDVN, LDG].map(p => `<option ${p === planAlumno ? 'selected' : ''}>${p}</option>`).join('')}</select></div></div>` +
    sems.map(s => {
      const cursa = ms.filter(m => m.semestre === s);
      const llega = [...new Set(ms.filter(m => m.semestre < s).flatMap(m => perfil(m.clave).salida))];
      const piden = cursa.flatMap(m => perfil(m.clave).entrada.map(h => ({ h, c: m.clave })));
      return `<section class="semestre"><div class="nsem">${s}</div>
        <div><h3>Llega sabiendo</h3>${s === sems[0] ? '<p class="gris chico">Perfil de ingreso</p>' : li(llega.map(h => `<li>${esc(h)}</li>`))}</div>
        <div><h3>Le piden</h3>${li(piden.map(x => `<li class="${llega.some(l => norm(l) === norm(x.h)) ? '' : 'falta'}">${esc(x.h)} <span class="gris">${x.c}</span></li>`))}</div>
        <div><h3>Cursa</h3><ul>${cursa.map(m => `<li><a href="javascript:abrir('${m.clave}')">${esc(m.nombre)}</a></li>`).join('')}</ul></div></section>`;
    }).join('');
}

/* ---------- academias ---------- */
const DICTAMENES = ['Se mantiene', 'Se fusiona', 'Se redefine', 'Nueva'];
const abiertas = new Set();
function vDictamen() {
  const dec = alertas().filter(a => a.grupo === 'decidir');
  return `<div class="encabezado"><h1>Continuidad y dictamen</h1></div>
  <div class="acads"><div class="acad-cab"><span>Academia</span><span>Líder</span><span>Materias 2021</span><span>Con espejo en LDVN<span class="escala"><i>0</i><i style="left:60%">60</i><i style="left:100%">100 %</i></span></span><span>Dictamen</span></div>` + D.academias.map(a => {
    const c = continuidad(a.id), m21 = mats(LDG).filter(m => m.academia === a.id), mvn = mats(LDVN).filter(m => academiaDe(m) === a.id);
    const conEq = new Set(m21.map(m => eqDe(m.clave)?.a).filter(Boolean)), suma = mvn.filter(m => !conEq.has(m.clave)), n = dec.filter(x => x.academia === a.id).length;
    return `<details class="acad" ${abiertas.has(a.id) ? 'open' : ''} ontoggle="this.open?abiertas.add(${a.id}):abiertas.delete(${a.id})">
      <summary><span><b>${a.id} ${esc(a.nombre)}</b></span><span>${esc(a.lider)}</span>
        <span>${c ? `<span class="unidades">${['Directa', 'Parcial', 'Sin equivalencia'].map(t => `<i class="u ${claseTipo(t)}" title="${t}"></i>`.repeat(m21.filter(m => eqDe(m.clave).tipo === t).length)).join('')}</span>` : '<span class="gris">Sin plan analítico</span>'}</span>
        <span>${barraCont(c)}</span><span class="${S.dictamen[a.id] ? '' : 'gris'}">${S.dictamen[a.id] || 'Por definir'}</span></summary>
      <div class="acad-det">
        <div>${m21.length || suma.length ? `<table class="compacta"><thead><tr><th>LDG 2021</th><th>Equivalencia</th><th>LDVN 2027</th></tr></thead><tbody>
          ${m21.map(m => { const e = eqDe(m.clave); return `<tr><td>${m.clave} ${enlaceMat(m.clave)}</td><td><span class="tipo ${claseTipo(e.tipo)}">${e.tipo}</span> ${tira(e.cubiertas, e.total)}</td><td>${e.a ? `${e.a} ${enlaceMat(e.a)}` : '<span class="gris">—</span>'}</td></tr>`; }).join('')}
          ${suma.map(m => `<tr><td><span class="gris">—</span></td><td><span class="tipo ${claseTipo(tipoDe(m))}">${tipoDe(m) === 'Pendiente' ? 'Sin medir' : tipoDe(m)}</span></td><td>${m.clave} ${enlaceMat(m.clave)}</td></tr>`).join('')}
          </tbody></table>` : '<p class="gris">Sin materias cargadas</p>'}</div>
        <div><p class="chico gris">Apoyo: ${esc(a.apoyo.join(', '))}</p>${(eq => eq.length ? `<p class="chico gris">Imparten: ${esc(eq.join(', '))}</p>` : '')([...new Set([...m21, ...mvn].flatMap(m => (S.imparte[m.clave] || []).map(x => x.nombre || x.correo)))])}<p class="chico" style="margin-top:8px">${esc(a.lectura)}</p>
          <div class="campo"><span>Dictamen</span><select ${no(esDireccion())} onchange="setDictamen(${a.id},this.value)"><option value="">Por definir</option>${DICTAMENES.map(d => `<option ${S.dictamen[a.id] === d ? 'selected' : ''}>${d}</option>`).join('')}</select></div>
          <div class="campo"><span>Líder propuesto</span><input type="text" ${no(esDireccion())} placeholder="Por definir" value="${esc(S.liderPropuesto[a.id] || '')}" onchange="setLiderPropuesto(${a.id},this.value)"></div>
          ${n ? `<p class="chico" style="margin-top:12px"><a href="#alertas" onclick="filtroGrupo='decidir';filtroRegla=''" class="pend">${n} por decidir</a></p>` : ''}</div>
      </div></details>`;
  }).join('') + '</div>';
}

/* ---------- equivalencias ---------- */
let filtroTipo = '';
function vEquivalencias() {
  const cuenta = t => D.equivalencias.filter(e => e.tipo === t).length;
  const nuevas = mats(LDVN).filter(m => !eqHacia(m.clave).length);
  const chip2 = (v, t, n) => `<button class="${filtroTipo === v ? 'on' : ''}" onclick="filtroTipo='${v}';pintar()">${t}<b>${n}</b></button>`;
  const fila = e => `<tr class="fila" onclick="abrir('${e.de}')"><td><span class="clave">${e.de}</span>${esc(M[e.de].nombre)}</td>
    <td>${e.a ? `<span class="clave">${e.a}</span>${esc(M[e.a].nombre)}${e.relacion && e.relacion !== '1:1' ? `<span class="clave">junto con ${esc(e.relacion.replace('N:1 con ', ''))}</span>` : ''}` : '<span class="gris">—</span>'}</td>
    <td><span class="tipo ${claseTipo(e.tipo)}">${e.tipo}</span></td>
    <td class="num">${e.total ? `${tira(e.cubiertas, e.total)}<span class="clave">${e.cubiertas} de ${e.total} · ${pct(e)} %</span>` : '—'}</td>
    <td class="chico">${esc(e.evidencia)}${e.pendiente ? `<span class="clave">${esc(e.pendiente)}</span>` : ''}</td></tr>`;
  return `<div class="encabezado"><h1>Equivalencias</h1><div class="segmento">${chip2('', 'Todas', D.equivalencias.length)}${['Directa', 'Parcial', 'Sin equivalencia'].map(t => chip2(t, t, cuenta(t))).join('')}</div></div>
  <table class="eqs"><thead><tr><th>LDG 2021</th><th>LDVN 2027</th><th>Equivalencia</th><th>Unidades 2021 cubiertas</th><th>Evidencia</th></tr></thead>
  ${D.academias.map(a => { const fs = D.equivalencias.filter(e => M[e.de].academia === a.id && (!filtroTipo || e.tipo === filtroTipo));
    return fs.length ? `<tbody><tr class="grupo-fila"><th colspan="5">${a.id} ${esc(a.nombre)}</th></tr>${fs.map(fila).join('')}</tbody>` : ''; }).join('')}
  ${!filtroTipo && nuevas.length ? `<tbody><tr class="grupo-fila"><th colspan="5">LDVN sin antecedente comparado</th></tr>${nuevas.map(m => `<tr class="fila" onclick="abrir('${m.clave}')"><td><span class="gris">—</span></td><td><span class="clave">${m.clave}</span>${esc(m.nombre)}</td><td><span class="tipo ${claseTipo(tipoDe(m))}">${tipoDe(m) === 'Pendiente' ? 'Sin medir' : tipoDe(m)}</span></td><td>—</td><td class="chico">${esc(D.sinMedir[m.clave] || 'Sin antecedente en el plan 2021')}</td></tr>`).join('')}</tbody>` : ''}
  </table>`;
}

/* ---------- alertas ---------- */
const GRUPOS = { decidir: 'Por decidir', capturar: 'Por capturar', fuente: 'Por revisar en la fuente' };
let filtroGrupo = 'decidir';
function vAlertas() {
  const todas = alertas(), delGrupo = todas.filter(a => a.grupo === filtroGrupo), reglas = {};
  for (const a of delGrupo) reglas[a.regla] = (reglas[a.regla] || 0) + 1;
  if (filtroRegla && !reglas[filtroRegla]) filtroRegla = '';
  const ver = delGrupo.filter(a => !filtroRegla || a.regla === filtroRegla);
  const grupos = [...D.academias.map(a => [a.id, a.id + ' ' + a.nombre]), [null, 'General']];
  return `<div class="encabezado"><h1>Alertas</h1><div class="segmento">${Object.entries(GRUPOS).map(([k, t]) => `<button class="${filtroGrupo === k ? 'on' : ''}" onclick="filtroGrupo='${k}';filtroRegla='';pintar()">${t}<b>${todas.filter(a => a.grupo === k).length}</b></button>`).join('')}</div></div>
  ${Object.keys(reglas).length > 1 ? `<div class="reglas"><button class="${filtroRegla ? '' : 'on'}" onclick="filtroRegla='';pintar()">Todas</button>${Object.entries(reglas).map(([r, n]) => `<button class="${filtroRegla === r ? 'on' : ''}" onclick="filtroRegla=this.dataset.r;pintar()" data-r="${esc(r)}">${esc(r)}<b>${n}</b></button>`).join('')}</div>` : ''}
  ${ver.length ? '' : '<p class="gris">Nada pendiente</p>'}` +
    grupos.map(([id, nombre]) => {
      const xs = ver.filter(a => a.academia === id);
      return xs.length ? `<section class="grupo"><h2>${esc(nombre)} <span class="gris">${xs.length}</span></h2><table class="compacta"><tbody>${xs.map(a => `<tr><td class="regla">${esc(a.regla)}</td>
        <td>${a.clave ? `${a.clave} ${enlaceMat(a.clave)} · ` : ''}${esc(a.texto)}</td>
        <td class="resp"><input type="text" ${no(puedeResponsable())} placeholder="Responsable" value="${esc(S.responsable[a.id] || '')}" data-id="${esc(a.id)}" onchange="setResponsable(this.dataset.id,this.value)"></td></tr>`).join('')}</tbody></table></section>` : '';
    }).join('');
}

/* ---------- exportes ---------- */
function csv(nombre, filas) {
  const t = filas.map(f => f.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  descargar(nombre, '\ufeff' + t, 'text/csv;charset=utf-8');
}
function descargar(nombre, texto, tipo) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([texto], { type: tipo })); a.download = nombre; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function tablaSEP() {
  const enc = ['Clave 2021', 'Asignatura LDG 2021', 'Semestre 2021', 'Créditos 2021', 'Horas 2021', 'Clave LDVN', 'Asignatura LDVN 2027', 'Semestre LDVN', 'Créditos LDVN', 'Horas LDVN', 'Tipo de equivalencia', 'Unidades 2021 cubiertas', '% de coincidencia', 'Relación', 'Acredita', 'Evidencia', 'Pendiente', 'Plan analítico 2021', 'Programa LDVN'];
  const f = D.equivalencias.map(e => { const o = M[e.de], d = e.a ? M[e.a] : {};
    return [o.clave, o.nombre, o.semestre, o.creditos, o.horas, d.clave, d.nombre, d.semestre, d.creditos, d.horas, e.tipo, e.total ? `${e.cubiertas} de ${e.total}` : '', pct(e), e.relacion, e.a && e.relacion !== '1:1' ? (S.acredita[e.a] || 'Por decidir') : '', e.evidencia, e.pendiente, o.fuente, d.fuente]; });
  for (const m of mats(LDVN)) if (!eqHacia(m.clave).length)
    f.push(['', '', '', '', '', m.clave, m.nombre, m.semestre, m.creditos, m.horas, tipoDe(m), '', '', '', '', D.sinMedir[m.clave] || 'Sin antecedente en el plan 2021', '', '', m.fuente]);
  csv('tabla-equivalencias-LDG2021-LDVN2027.csv', [enc, ...f]);
}
function matrizLideres() {
  const enc = ['Academia 2025', 'Líder', 'Apoyo', 'Materias LDG 2021', 'Materias LDVN 2027', 'Directas', 'Parciales', 'Sin equivalencia', 'Continuidad %', 'Lectura', 'Dictamen', 'Líder propuesto'];
  const lista = ms => ms.map(m => `${m.clave} ${m.nombre}`).join('; ');
  csv('matriz-academias-lideres.csv', [enc, ...D.academias.map(a => { const c = continuidad(a.id);
    return [`${a.id} ${a.nombre}`, a.lider, a.apoyo.join(', '), lista(mats(LDG).filter(m => m.academia === a.id)), lista(mats(LDVN).filter(m => academiaDe(m) === a.id)),
      c ? c.d : 'Pendiente', c ? c.p : 'Pendiente', c ? c.s : 'Pendiente', c ? c.pct : 'Pendiente', a.lectura, S.dictamen[a.id] || 'Por definir', S.liderPropuesto[a.id] || 'Por definir']; })]);
}
function alertasCSV() {
  csv('alertas.csv', [['Academia', 'Regla', 'Clave', 'Materia', 'Alerta', 'Responsable'], ...alertas().map(a => [a.academia != null ? `${a.academia} ${A[a.academia].nombre}` : 'General', a.regla, a.clave, a.clave ? M[a.clave].nombre : '', a.texto, S.responsable[a.id] || ''])]);
}
function importar(input) {
  const r = new FileReader();
  r.onload = () => { try { localStorage.setItem(LS, JSON.stringify(Object.assign(structuredClone(VACIO), JSON.parse(r.result)))); cargarLocal(); pintar(); } catch { aviso('El archivo no es un respaldo válido'); } };
  if (input.files[0]) r.readAsText(input.files[0]);
}
function vExportes() {
  const t = (titulo, detalle, boton) => `<article class="tarjeta"><h2>${titulo}</h2><p class="gris chico">${detalle}</p>${boton}</article>`;
  return `<div class="encabezado"><h1>Exportes</h1></div><div class="exportes">
    ${t('Tabla de equivalencias', `${D.equivalencias.length} materias 2021 y ${mats(LDVN).filter(m => !eqHacia(m.clave).length).length} LDVN sin antecedente · CSV`, '<button onclick="tablaSEP()">Descargar</button>')}
    ${t('Matriz de academias y líderes', `${D.academias.length} academias · CSV`, '<button onclick="matrizLideres()">Descargar</button>')}
    ${t('Alertas', `${alertas().length} abiertas · CSV`, '<button onclick="alertasCSV()">Descargar</button>')}
    ${sb ? '' : t('Capturas', 'Perfiles, entregables, candados, dictámenes y responsables · JSON', `<div class="controles"><button onclick="descargar('capturas-ldvn.json',JSON.stringify(S,null,1),'application/json')">Respaldar</button><label><input type="file" accept=".json" hidden onchange="importar(this)"><span style="cursor:pointer;text-decoration:underline">Cargar respaldo</span></label></div>`)}
  </div>`;
}

/* ---------- usuarios (solo Dirección) ---------- */
function vUsuarios() {
  const acad = id => (A[id] ? `${id} ${esc(A[id].nombre)}` : '—');
  const roles = v => Object.entries(ROLES).filter(([k]) => k !== 'pendiente').map(([k, t]) => `<option value="${k}" ${k === v ? 'selected' : ''}>${t}</option>`).join('');
  const entro = new Set(USUARIOS.map(u => u.correo));
  return `<div class="encabezado"><h1>Usuarios</h1></div>
  <form class="alta" onsubmit="invitar(event)"><input type="email" name="correo" required placeholder="correo@udem.edu">
    <select name="rol">${roles('profesor')}</select><select name="academia">${opcionesAcad('', 'Sin academia')}</select><button>Dar acceso</button></form>
  <table><thead><tr><th>Correo</th><th>Rol</th><th>Academia</th><th></th></tr></thead><tbody>
  ${USUARIOS.map(u => `<tr><td>${esc(u.correo)}</td><td>${ROLES[u.rol]}</td><td>${acad(u.academia_id)}</td><td class="gris chico">${u.rol === 'pendiente' ? 'Sin acceso' : 'Activo'}${u.rol !== 'pendiente' && u.correo !== YO.correo ? ` · <a href="javascript:void 0" data-c="${esc(u.correo)}" onclick="retirar(this.dataset.c)">Retirar</a>` : ''}</td></tr>`).join('')}
  ${INVITACIONES.filter(i => !entro.has(i.correo)).map(i => `<tr><td>${esc(i.correo)}</td><td>${ROLES[i.rol]}</td><td>${acad(i.academia_id)}</td><td class="gris chico">Aún no entra · <a href="javascript:void 0" data-c="${esc(i.correo)}" onclick="retirar(this.dataset.c)">Retirar</a></td></tr>`).join('')}
  </tbody></table>`;
}
async function invitar(ev) {
  ev.preventDefault();
  const f = ev.target, rol = f.rol.value, academia_id = f.academia.value === '' ? null : +f.academia.value;
  if (rol === 'lider' && academia_id == null) return aviso('Un líder necesita academia');
  await guardar(sb.from('invitaciones').upsert({ correo: f.correo.value.trim().toLowerCase(), rol, academia_id }));
  await cargarRemoto(); pintar();
}
async function retirar(correo) { await guardar(sb.from('invitaciones').delete().eq('correo', correo)); await cargarRemoto(); pintar(); }

/* ---------- acceso ---------- */
function puerta(html) { $('nav').innerHTML = ''; $('sesion').innerHTML = ''; $('vista').innerHTML = `<section class="puerta">${html}</section>`; }
function pedirAcceso(msj) {
  puerta(`<h1>Acceso</h1><button onclick="entrarGoogle()">Entrar con Google</button>${msj ? `<p class="falta">${esc(msj)}</p>` : ''}`);
}
function entrarGoogle() {
  sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname, queryParams: { prompt: 'select_account' } } });
}
async function salir() { await sb.auth.signOut(); }
async function entrar(sesion) {
  if (!sesion) { D = null; sel = null; $('ficha').hidden = true; document.body.classList.remove('con-ficha'); return pedirAcceso(RECHAZO); }
  const { data } = await sb.from('usuarios').select('rol, academia_id').eq('id', sesion.user.id).maybeSingle();
  YO = { rol: data?.rol || 'pendiente', academia: data?.academia_id ?? null, correo: sesion.user.email, nombre: sesion.user.user_metadata?.full_name || '' };
  if (YO.rol === 'pendiente') return puerta(`<h1>Acceso</h1><p>${esc(YO.correo)} no está en la lista de acceso. Pídelo a la Dirección de programa.</p><button class="suave" onclick="salir()">Salir</button>`);
  try { await cargarRemoto(); pintar(); } catch (e) { puerta(`<h1>Sin conexión con la base</h1><p class="gris">${esc(e.message)}</p>`); }
}
/* si Google devolvió un error (correo fuera de la lista), se explica en la puerta */
const VUELTA = new URLSearchParams(location.hash.slice(1) || location.search);
const RECHAZO = VUELTA.get('error') ? 'Ese correo no está en la lista de acceso. Pídelo a la Dirección de programa.' : '';
if (RECHAZO) history.replaceState(null, '', location.pathname);
function arrancar() {
  if (!CFG) {
    if (!window.DATA) return puerta('<h1>Falta configuración</h1>');
    cargarLocal(); return pintar();
  }
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2';   // versión fija, con integridad
  s.integrity = 'sha384-7i/4BYWz4Mn+lJfg2HWfEPfZQ7tmFKF3CTSKlXBpxWjNlLjcg+T6smpHG4gLmU1u';
  s.crossOrigin = 'anonymous';
  s.onload = () => {
    sb = supabase.createClient(CFG.url, CFG.key);
    let actual;
    sb.auth.onAuthStateChange((_, sesion) => {
      const id = sesion?.user.id || null;
      if (id === actual) return;           // refrescos de token: nada que recargar
      actual = id; setTimeout(() => entrar(sesion), 0);
    });
  };
  s.onerror = () => puerta('<h1>Sin conexión</h1>');
  document.head.appendChild(s);
}
arrancar();
