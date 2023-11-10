/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  verbose: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testTimeout: 1_000_000,
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
    '^.+\\.(j)s$': 'babel-jest',
  },
  resolver: '<rootDir>/jest-resolver.cjs',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(tslib|o1js/node_modules/tslib))',
  ],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  moduleNameMapper: {
    '^(\\.{1,2}/.+)\\.js$': '$1',
  },
  // Define reporters directly
  reporters: [
    'default', // Default Jest reporter
    [
      'jest-junit',
      {
        outputDirectory: '.', // Output directory for the JUnit report
        outputName: 'junit.xml', // Output filename
      },
    ],
  ],
  // Add Cobertura coverage reporter
  coverageReporters: ['json', 'text', 'cobertura'],
  collectCoverage: true,
  coverageDirectory: '.', // Output directory for coverage reports
};
