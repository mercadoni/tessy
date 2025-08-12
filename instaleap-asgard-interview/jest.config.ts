module.exports = {
  verbose: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/test/', '<rootDir>/node_modules/'],
  reporters: ['default'],
  coverageDirectory: 'coverage',
}
