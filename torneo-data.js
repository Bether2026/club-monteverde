/* =========================================================
   TORNEO SENIOR +35 — DATOS (fuente: Copa Fácil)
   Para actualizar: cambiá los números de acá y listo.
   https://copafacil.com/-9e0jv
   ========================================================= */
window.TORNEO = {
  nombre: 'Torneo Clausura Senior +35',
  actualizado: '7ª fecha',
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
    ['Santa Inés',            11, 7, 5, 1, 1, 23,  7],
    ['Resistencia',            7, 6, 2, 3, 1, 11,  7],
    ['Los Tronquitos',         6, 6, 2, 2, 2,  7, 11],
    ['Los Puntuales',          6, 7, 2, 2, 3,  5, 13],
    ['Los Mismos de Siempre',  5, 7, 1, 3, 3, 13, 19],
    ['Monteverde',             5, 7, 0, 5, 2, 10, 12]
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
    8: [['Los Tronquitos', null, null, 'Santa Inés', '10 hs'], ['Los Mismos de Siempre', null, null, 'Los Puntuales', '11 hs'], ['Resistencia', null, null, 'Monteverde', '12 hs']]
  },
  /* Opcional: 5º dato de cada partido = horario (se muestra en la próxima fecha) */
  proximaFecha: 8,
  proximaInfo: 'Domingo 15 de noviembre · Cancha Club Monteverde · Río Dulce 399, Don Orione',

  /* Sanciones (suspendidos): [jugador, equipo, fecha de la sanción, amarillas, rojas] */
  sanciones: [
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
    ['Adrian Luna',       'Santa Inés',            7],
    ['Julian Auteri',     'Santa Inés',            4],
    ['Matias Fredriksson','Santa Inés',            4],
    ['Jose Arevalo',      'Resistencia',           3],
    ['Juan Tevez',        'Monteverde',            3],
    ['Juan Escofano',     'Los Mismos de Siempre', 3],
    ['Nicolás Romero',    'Los Mismos de Siempre', 3],
    ['Gabriel Palacio',   'Los Tronquitos',        3],
    ['David Valdez',      'Resistencia',           2],
    ['Hugo Pelusa',       'Resistencia',           2]
  ]
};
