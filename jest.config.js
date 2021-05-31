module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/testing/__mocks__/cssFileMock.js",
  },
  setupFiles: [
    '<rootDir>/testing/setup.js'
  ]
};