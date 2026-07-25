import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      '.lighthouseci/**',
      'next-env.d.ts',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message:
                'Use the "@/" path alias instead of deep relative imports.',
            },
          ],
        },
      ],
      // Contact details, company names and URLs must come from src/config/site.ts.
      // This catches the most common accidental hard-coding.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Literal[value=/^(\\+91[\\s-]?\\d|saanpro\\.com|www\\.saanpro\\.com)/]',
          message:
            'Do not hard-code contact details or the domain. Import from "@/config/site".',
        },
      ],
    },
  },

  // The site config is the one place these literals are allowed.
  {
    files: ['src/config/site.ts', 'src/lib/redirects.ts', 'src/lib/env.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  {
    files: ['src/tests/**/*.ts', 'src/tests/**/*.tsx', 'scripts/**/*.ts'],
    rules: {
      'no-restricted-syntax': 'off',
      'no-console': 'off',
    },
  },

  prettier,
];

export default config;
