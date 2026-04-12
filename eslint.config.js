import js from '@eslint/js';
import checkFile from 'eslint-plugin-check-file';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import astro from 'eslint-plugin-astro';

const fileNamingRule = [
  'error',
  { 'src/**/*.{ts,tsx,astro}': 'KEBAB_CASE' },
  { ignoreMiddleExtensions: true },
];

export default [
  js.configs.recommended,

  // TypeScript files
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.d.ts'],
    plugins: { 'check-file': checkFile },
    languageOptions: { parser: tsParser },
    rules: {
      'no-undef': 'off',
      'check-file/filename-naming-convention': fileNamingRule,
    },
  },

  // Astro files (exclude dynamic route files like [slug].astro)
  {
    files: ['src/**/*.astro'],
    ignores: ['src/**/\\[*\\].astro'],
    plugins: { 'check-file': checkFile, astro },
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: tsParser },
    },
    rules: {
      'check-file/filename-naming-convention': fileNamingRule,
    },
  },
];
