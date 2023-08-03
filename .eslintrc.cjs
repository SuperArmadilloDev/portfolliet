module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte']
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            rules:{
                semi:'error',
                'prefer-const': 'error',
                quotes: ['error','single'],
                'no-console': ['warn', {allow: ['info', 'error']}]
            },
            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        }
    ],
    rules:{
        semi:'error',
        quotes: ['error','single'],
        'no-console': ['warn', {allow: ['info', 'error']}]
    },
};
