import { Dimensions } from 'react-native';

export const SCREENS = {
  MAIN: {
    HOME: 'Inicio',
    CREATE: 'Crear',
    PROFILE: 'Perfil'
  },
  APP: {
    APP: 'App',
    WRITE: 'Escribir',
    CAPTURE: 'Capturar',
    POEM_DETAILED: 'Detalle Poem'
  }
} as const;

export const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const THRESHOLD = SCREEN_WIDTH / 3;
export const HALF_SCREEN = SCREEN_WIDTH / 2;
