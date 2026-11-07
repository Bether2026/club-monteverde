/* =========================================================
   TORNEO SENIOR +35 — DATOS (fuente: Copa Fácil)
   Para actualizar: cambiá los números de acá y listo.
   https://copafacil.com/-9e0jv
   ========================================================= */
window.TORNEO = {
  nombre: 'Torneo Clausura Senior +35',
  actualizado: '7ª fecha',
  fuente: 'https://copafacil.com/-9e0jv',

  /* Equipos: sigla y color del escudito */
  equipos: {
    'Santa Inés':            { sigla: 'SI', color: '#d4b83a' },
    'Resistencia':           { sigla: 'RC', color: '#e5e5e5' },
    'Los Tronquitos':        { sigla: 'LT', color: '#9aa39c' },
    'Los Puntuales':         { sigla: 'LP', color: '#f5f5f2' },
    'Los Mismos de Siempre': { sigla: 'MS', color: '#3fb6a8' },
    'Monteverde':            { sigla: 'CAM', escudo: true }
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
    8: [['Los Mismos de Siempre', null, null, 'Los Puntuales'], ['Resistencia', null, null, 'Monteverde'], ['Los Tronquitos', null, null, 'Santa Inés']]
  },
  proximaFecha: 8,
  proximaInfo: 'Domingo · Cancha Club Monteverde · horarios a confirmar',

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
