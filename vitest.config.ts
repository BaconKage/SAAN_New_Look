import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/tests/unit/**/*.test.ts'],
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/lib/**', 'src/content/**', 'src/config/**'],
    },
  },
});
