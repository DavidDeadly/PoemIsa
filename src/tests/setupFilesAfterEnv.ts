import '@testing-library/jest-native/extend-expect';
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () => 'Animated.View');
