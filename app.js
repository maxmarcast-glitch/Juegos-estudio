// Catálogo de juegos. Para sumar uno nuevo, agregá un objeto acá y su carpeta.
const JUEGOS = [
  {
    carpeta: 'bucle',
    clase: '',
    clave: 'bucle-js-v1',
    nombre: 'Bucle JS',
    materia: 'Programación I',
    muestra: 'console.log(typeof null); // ?',
    desc: 'Leé el código, predecí qué muestra la consola y entendé por qué. Unidades del final y práctica libre de JavaScript.',
    bloques: 24,
    preguntas: 132
  },
  {
    carpeta: 'terminal-lab',
    clase: 'lab',
    clave: 'terminal-lab-v1',
    nombre: 'Terminal Lab',
    materia: 'Laboratorio Full Stack I',
    muestra: '$ docker compose up -d',
    desc: 'Virtualización, Linux, redes, LAMP, HTML y CSS, Git y Docker. Incluye ejercicios de los laboratorios al estilo "¿qué comando sigue?".',
    bloques: 18,
    preguntas: 118
  },
  {
    carpeta: 'problema-prototipo',
    clase: 'proto',
    clave: 'problema-prototipo-v1',
    nombre: 'Del problema al prototipo',
    materia: 'Prácticas Profesionalizantes I · Diseño UX/UI',
    muestra: 'Como [rol] quiero [acción] para [beneficio]',
    desc: 'Casos de uso, requerimientos, historias de usuario y backlog; usabilidad, accesibilidad, maquetado y heurísticas de Nielsen.',
    bloques: 16,
    preguntas: 96
  }
];

// Lee el progreso que cada juego guarda en este navegador.
function leerProgreso(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave) || 'null');
    if (!datos) return null;
    return {
      xp: Number(datos.xp) || 0,
      jugados: Object.keys(datos.temas || {}).length,
      fallos: Array.isArray(datos.fallos) ? datos.fallos.length : 0,
      dia: datos.dia || '',
      racha: Number(datos.racha) || 0
    };
  } catch {
    return null;
  }
}

function fecha(dia) {
  if (!dia) return '';
  const [a, m, d] = dia.split('-');
  return `${d}/${m}/${a}`;
}

function esc(texto) {
  return String(texto).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function tarjeta(juego) {
  const p = leerProgreso(juego.clave);
  const porcentaje = p ? Math.round(p.jugados / juego.bloques * 100) : 0;
  const avance = p
    ? `<div class="avance">
         <span>${p.jugados} de ${juego.bloques} bloques jugados · ${p.xp} XP${p.fallos ? ` · ${p.fallos} errores para repasar` : ''}</span>
         <span class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${porcentaje}" aria-label="Avance en ${esc(juego.nombre)}"><i style="width:${porcentaje}%"></i></span>
         ${p.dia ? `<span>Última vez: ${fecha(p.dia)}</span>` : ''}
       </div>`
    : '<div class="avance"><span>Todavía no jugaste.</span></div>';
  return `<article class="juego ${juego.clase}">
      <p class="materia">${esc(juego.materia)}</p>
      <h2>${esc(juego.nombre)}</h2>
      <p class="muestra">${esc(juego.muestra)}</p>
      <p class="desc">${esc(juego.desc)}</p>
      <div class="cifras"><span><b>${juego.bloques}</b> bloques</span><span><b>${juego.preguntas}</b> preguntas</span></div>
      ${avance}
      <a class="jugar" href="${juego.carpeta}/">${p ? 'Seguir jugando' : 'Empezar'}</a>
    </article>`;
}

function render() {
  const progresos = JUEGOS.map(j => leerProgreso(j.clave)).filter(Boolean);
  const xp = progresos.reduce((total, p) => total + p.xp, 0);
  const bloques = progresos.reduce((total, p) => total + p.jugados, 0);
  const totalBloques = JUEGOS.reduce((total, j) => total + j.bloques, 0);
  const totalPreguntas = JUEGOS.reduce((total, j) => total + j.preguntas, 0);

  document.getElementById('resumen').innerHTML = `
    <span class="dato"><b>${JUEGOS.length}</b> juegos</span>
    <span class="dato"><b>${totalPreguntas}</b> preguntas</span>
    <span class="dato"><b>${bloques}</b> de ${totalBloques} bloques jugados</span>
    <span class="dato"><b>${xp}</b> XP en total</span>`;

  document.getElementById('juegos').innerHTML = JUEGOS.map(tarjeta).join('');

  document.getElementById('nota').textContent =
    'El progreso se guarda en este navegador. Si cambiás de dispositivo o borrás los datos de navegación, arranca de cero.';
}

render();
// Al volver desde un juego con el botón Atrás, actualiza el progreso.
window.addEventListener('pageshow', render);
