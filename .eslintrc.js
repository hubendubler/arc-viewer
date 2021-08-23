module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'unicorn'
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true
        },
        tsconfigRootDir: __dirname,
    },
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:unicorn/recommended',
        'prettier'
    ],
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'unicorn/filename-case': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'no-console': 'off',
    }
};
