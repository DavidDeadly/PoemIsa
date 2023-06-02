/** @type {import('jest').Config} */

const config = {
  verbose: true,
  preset: 'react-native',
  transform: {
    'test\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@react|react)'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupFilesAfterEnv.ts'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/functions/'],
  collectCoverageFrom: ['**/src/**/*.ts?(x)'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/functions/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};

module.exports = config;
