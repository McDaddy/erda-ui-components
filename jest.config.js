module.exports = {
  // clearMocks: true,
  preset: 'ts-jest/presets/js-with-ts-esm',
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  moduleDirectories: ['node_modules', 'src'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!src/**/*.d.ts', '!src/.umi/**/*', '!src/.umi-production/**/*'],
  testMatch: ['**/__tests__/**/*.test.+(tsx|ts)'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig-jest.json',
      diagnostics: false,
      isolatedModules: true,
      useESM: true,
    },
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  // setupFilesAfterEnv: ['<rootDir>/test/extend-expect.ts'],
  // setupFiles: ['<rootDir>/test/setupJest.ts'],
  // transformIgnorePatterns: [],
};
