// @ts-check
import 'dotenv/config';

import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import { cacheVercel } from '@astrojs/vercel/cache';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { SANITY_CACHE_TAG } from './src/lib/cache.ts';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

// @sanity/astro 3.5.1 strips only POSIX separators from its package aliases.
// On Windows that aliases `sanity` to package.json. Use Vite's dedupe instead.
if (process.platform === 'win32') {
  process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE = 'true';
}

// Pages rendered from Sanity content, cached on Vercel's CDN for 1 hour and
// served stale for up to 1 day while they revalidate in the background.
const sanityPage = { maxAge: 3600, swr: 86400, tags: [SANITY_CACHE_TAG] };

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  cache: {
    provider: cacheVercel(),
  },
  routeRules: {
    '/': sanityPage,
    '/livres': sanityPage,
    '/livres/[slug]': sanityPage,
    '/galerie': sanityPage,
    '/tarifs': sanityPage,
    '/reviews': sanityPage,
    '/citations': sanityPage,
    // Latest Ulule campaign island, shown in the menu of every page.
    '/_server-islands/[name]': sanityPage,
  },
  image: {
    service: { entrypoint: './src/lib/sanity-image-service.ts' },
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
