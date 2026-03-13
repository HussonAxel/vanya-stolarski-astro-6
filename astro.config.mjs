// @ts-check
import vercel from '@astrojs/vercel';
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
