module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-debugger': 2,
    'no-console': 2,
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false
        },
        extendDefaults: true
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error']
      }
    },
    {
      files: ['src/consts/redux.ts'],
      rules: { '@typescript-eslint/explicit-module-boundary-types': 'off' }
    },
    {
      files: ['src/components/Page/Mdx.tsx'],
      rules: {
        'react/display-name': 'off'
      }
    },
    {
      files: [
        'src/components/Sandbox/Vanilla/SandboxFilesSrc/**/*',
        'src/components/Sandbox/Vanilla/SandboxFilesDist/**/*',
        'src/components/Sandbox/React/SandboxFilesSrc/**/*',
        'src/components/Sandbox/React/SandboxFilesDist/**/*'
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
      }
    },
    {
      files: ['src/components/Sandbox/Compilation/**/*'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['src/utils/createGapStyles.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
