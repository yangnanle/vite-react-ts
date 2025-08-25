import globals from 'globals';
import jsESlint from '@eslint/js';
import tsESlint from 'typescript-eslint';
import reactESLint from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['node_modules', 'src/.umi', 'src/.umi-production', 'dist', 'public'] },
    { languageOptions: { globals: globals.browser } },
    jsESlint.configs.recommended,
    ...tsESlint.configs.recommended,
    reactESLint.configs.flat.recommended,
    { rules: { '@typescript-eslint/no-explicit-any': 'off' } },
    eslintConfigPrettier,
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': ['error'], // 使用 eslint-plugin-prettier 的规则
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
];
