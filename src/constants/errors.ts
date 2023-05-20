export const ERRORS = {
  SING_IN: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    ACTION_CANCELLED: 'Sign in action cancelled'
  },
  UNEXPECTED: 'Unexpected error'
};

export const ERRORS_MAP_TO_USER = new Map([
  [ERRORS.SING_IN.NETWORK_ERROR, 'Parece que estas sin conexión'],
  [ERRORS.SING_IN.ACTION_CANCELLED, 'Se canceló el inicio de sesión'],
  [ERRORS.UNEXPECTED, 'Ha ocurrido un error inesperado']
]);
