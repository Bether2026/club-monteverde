/* =========================================================
   TORNEO SENIOR +35 — DATOS (fuente: Copa Fácil)
   Para actualizar: cambiá los números de acá y listo.
   https://copafacil.com/-9e0jv
   ========================================================= */
window.TORNEO = {
  nombre: 'Torneo Clausura Senior +35',
  actualizado: '9ª fecha · 🏆 Santa Inés campeón de la fase regular',
  fuente: 'https://copafacil.com/-9e0jv',

  /* Equipos: escudo oficial de cada uno (img/equipos/) */
  equipos: {
    'Santa Inés':            { escudo: 'img/equipos/santa-ines.png' },
    'Resistencia':           { escudo: 'img/equipos/resistencia.png' },
    'Los Tronquitos':        { escudo: 'img/equipos/los-tronquitos.png' },
    'Los Puntuales':         { escudo: 'img/equipos/los-puntuales.png' },
    'Los Mismos de Siempre': { escudo: 'img/equipos/los-mismos-de-siempre.png' },
    'Monteverde':            { escudo: 'img/escudo-sm.png', local: true }
  },

  /* Tabla de posiciones: [equipo, PTS, J, G, E, P, GF, GC] */
  tabla: [
    ['Santa Inés',            15, 9, 7, 1, 1, 32, 11],
    ['Resistencia',            9, 8, 3, 3, 2, 19, 14],
    ['Los Puntuales',          8, 9, 3, 2, 4, 10, 17],
    ['Los Mismos de Siempre',  7, 9, 2, 3, 4, 17, 24],
    ['Monteverde',             7, 9, 1, 5, 3, 15, 20],
    ['Los Tronquitos',         6, 8, 2, 2, 4, 11, 18]
  ],

  /* Partidos por fecha: [local, goles local, goles visitante, visitante]
     Goles en null = partido pendiente */
  fechas: {
    1: [['Los Puntuales', 1, 0, 'Santa Inés'], ['Resistencia', null, null, 'Los Tronquitos'], ['Monteverde', 1, 1, 'Los Mismos de Siempre']],
    2: [['Resistencia', 6, 0, 'Los Puntuales'], ['Los Mismos de Siempre', 1, 3, 'Santa Inés'], ['Los Tronquitos', 2, 1, 'Monteverde']],
    3: [['Los Puntuales', 3, 1, 'Los Mismos de Siempre'], ['Monteverde', 1, 1, 'Resistencia'], ['Santa Inés', 2, 0, 'Los Tronquitos']],
    4: [['Monteverde', 1, 1, 'Los Puntuales'], ['Los Tronquitos', 2, 6, 'Los Mismos de Siempre'], ['Resistencia', 1, 4, 'Santa Inés']],
    5: [['Los Puntuales', 0, 0, 'Los Tronquitos'], ['Santa Inés', 3, 3, 'Monteverde'], ['Los Mismos de Siempre', 1, 1, 'Resistencia']],
    6: [['Santa Inés', 4, 0, 'Los Puntuales'], ['Los Tronquitos', 1, 1, 'Resistencia'], ['Los Mismos de Siempre', 2, 2, 'Monteverde']],
    7: [['Los Puntuales', 0, 1, 'Resistencia'], ['Santa Inés', 7, 1, 'Los Mismos de Siempre'], ['Monteverde', 1, 2, 'Los Tronquitos']],
    8: [['Los Tronquitos', 2, 3, 'Santa Inés'], ['Los Mismos de Siempre', 0, 3, 'Los Puntuales'], ['Resistencia', 6, 1, 'Monteverde']],
    9: [['Santa Inés', 6, 2, 'Resistencia'], ['Los Puntuales', 2, 4, 'Monteverde'], ['Los Mismos de Siempre', 4, 2, 'Los Tronquitos']],
    10: [['Los Tronquitos', null, null, 'Los Puntuales'], ['Monteverde', null, null, 'Santa Inés'], ['Resistencia', null, null, 'Los Mismos de Siempre']]
  },
  /* Opcional: 5º dato de cada partido = horario (se muestra en la próxima fecha) */
  proximaFecha: 10,
  proximaInfo: 'Última fecha de la fase regular · Cancha Club Monteverde · Río Dulce 399, Don Orione',

  /* Sanciones (suspendidos): [jugador, equipo, fecha de la sanción, amarillas, rojas] */
  sanciones: [
    ['Emiliano Cambiasso',    'Santa Inés',            '23/11/2026', 0, 0],
    ['Juan Tevez',            'Monteverde',            '23/11/2026', 0, 0],
    ['Walter Rojas',          'Los Puntuales',         '23/11/2026', 0, 0],
    ['Victor Alberto Merlo',  'Los Puntuales',         '26/10/2026', 3, 0],
    ['David Valdez',          'Resistencia',           '23/09/2026', 3, 0],
    ['Leonel Echagüe',        'Los Puntuales',         '14/09/2026', 3, 1],
    ['Daniel Martinez',       'Santa Inés',            '14/09/2026', 3, 0],
    ['Enrique Ramski',        'Santa Inés',            '06/09/2026', 5, 0],
    ['Matías Fabian Lencina', 'Los Mismos de Siempre', '06/09/2026', 3, 0],
    ['Juan Escofano',         'Los Mismos de Siempre', '06/09/2026', 3, 1]
  ],

  /* Goleadores: [jugador, equipo, goles] */
  goleadores: [
    ['Adrian Luna',       'Santa Inés',            11],
    ['Jose Arevalo',      'Resistencia',            6],
    ['Juan Tevez',        'Monteverde',             5],
    ['Nicolás Romero',    'Los Mismos de Siempre',  5],
    ['Julian Auteri',     'Santa Inés',             5],
    ['Matias Fredriksson','Santa Inés',             5],
    ['Leonel Echagüe',    'Los Puntuales',          4],
    ['Gabriel Palacio',   'Los Tronquitos',         4],
    ['Lucas Negrete',     'Resistencia',            3],
    ['Juan Escofano',     'Los Mismos de Siempre',  3]
  ]
};
