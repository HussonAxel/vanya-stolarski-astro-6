// @ts-check
import 'dotenv/config';

import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

// @sanity/astro 3.5.1 strips only POSIX separators from its package aliases.
// On Windows that aliases `sanity` to package.json. Use Vite's dedupe instead.
if (process.platform === 'win32') {
  process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE = 'true';
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  image: {
    service: passthroughImageService(),
    domains: ['cdn.sanity.io'],
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-03-01',
      useCdn: true,
      studioBasePath: '/admin',
    }),
    react(),
  ],
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom', 'styled-components', 'sanity', '@sanity/ui'],
    },
    plugins: [tailwindcss()]
  }
});
