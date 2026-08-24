// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';

// astro.config.mjs runs before Vite processes .env files
try {
  process.loadEnvFile();
} catch { /* no .env file, rely on system env */ }

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: false,
      apiVersion: '2024-01-01',
      studioBasePath: '/studio',
    }),
  ],
});
