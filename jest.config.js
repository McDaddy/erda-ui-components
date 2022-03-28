module.exports = {
  // clearMocks: true,
  preset: 'ts-jest/presets/js-with-ts-esm',
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  moduleDirectories: ['node_modules', 'src'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'mjs'],
  // collectCoverageFrom: [
  //   'app/common/**/*.{js,jsx,ts,tsx}',
  //   '!app/common/**/*.d.ts',
  //   '!app/common/components/custom-filter/index.tsx', // deprecated component
  //   '!app/common/stores/*.{js,jsx,ts,tsx}',
  //   '!app/common/test_bak/**/*.{js,jsx,ts,tsx}',
  //   '!app/common/services/*.{js,jsx,ts,tsx}',
  //   '!app/common/utils/style-constants.ts',
  //   '!app/common/constants.ts',
  //   '!app/common/utils/axios-config.ts',
  // ],
  testMatch: ['**/__tests__/**/*.test.+(tsx|ts)'],
  transform: {
    mjs$: 'babel-jest',
  },
  // globals: {
  //   'ts-jest': {
  //     babelConfig: true,
  //     tsconfig: 'tsconfig-jest.json',
  //     diagnostics: false,
  //     isolatedModules: true,
  //     useESM: true,
  //   },
  // },
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['<rootDir>/test/extend-expect.ts'],
  // setupFiles: ['<rootDir>/test/setupJest.ts'],
  // transformIgnorePatterns: [],
};
