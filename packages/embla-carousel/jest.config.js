module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  testRegex: '__tests__/.*\\.test\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom'
}
