// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env manually — astro.config.mjs runs before Vite processes .env files
try {
  const envContent = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#\s][^=]*)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
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
