import { NativeModules } from 'react-native';
import '@testing-library/jest-native/extend-expect';

require('react-native-reanimated/lib/module/reanimated2/jestUtils.js').setUpTests();

jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('@react-native-firebase/firestore', () => {
  const firestore = () => {
    return {
      collection: () => {
        return {
          onSnapshot: () => {}
        };
      }
    };
  };

  return firestore;
});
jest.mock('@react-native-firebase/functions', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      useEmulator: jest.fn()
    }))
  };
});

jest.mock('@react-native-google-signin/google-signin', () => {
  const mockGoogleSignin = jest.requireActual(
    '@react-native-google-signin/google-signin'
  );

  mockGoogleSignin.GoogleSignin.hasPlayServices = () => Promise.resolve(true);
  mockGoogleSignin.GoogleSignin.configure = () => Promise.resolve();

  return mockGoogleSignin;
});

NativeModules.RNGoogleSignin = {
  BUTTON_SIZE_ICON: 0,
  BUTTON_SIZE_STANDARD: 0,
  BUTTON_SIZE_WIDE: 0,
  BUTTON_COLOR_AUTO: 0,
  BUTTON_COLOR_LIGHT: 0,
  BUTTON_COLOR_DARK: 0,
  configure: jest.fn(),
  currentUserAsync: jest.fn()
};
