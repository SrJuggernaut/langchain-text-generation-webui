import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/__tests__'
  ],
  testMatch: [
    '**/__tests__/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  automock: false,
  setupFiles: [
    '<rootDir>/__tests__/jestSetup.ts'
  ]
}

export default config
