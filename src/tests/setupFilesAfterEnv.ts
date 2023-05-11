import '@testing-library/jest-native/extend-expect';
require('react-native-reanimated/lib/module/reanimated2/jestUtils.js').setUpTests();

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
