module.exports = {
  preset: 'ts-jest', // typeScript파일은 ts-jest에서 CommonJS구문으로 변환
  testMatch: ['**/*.spec.[jt]s?(x)', '**/*.test.[jt]s?(x)'], // 테스트 파일 위치
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/__test__/fileMock.js', // 이미지 파일을 JS로 변환
    '\\.(scss|css)$': 'identity-obj-proxy', // SCSS 파일을 JavaScript로 변환
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(axios)/.*)', // axios 변환 허용
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'jest-environment-jsdom', // 테스트 환경
};
