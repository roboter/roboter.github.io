import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './src/utils/manifest';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

const isBuild = process.argv.includes('build') || process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://begemotik.ee',
  image: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
  },
  integrations: [sitemap(), robotsTxt(), react(), mdx()],
  vite: {
    server: {
      watch: {
        ignored: ['**/dist/**', '**/.astro/**'],
      },
    },
    ...(isBuild ? { cacheDir: 'node_modules/.vite-build' } : {}),
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest,
        workbox: {
          globDirectory: 'dist',
          globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
          navigateFallback: null,
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
        },
      }),
    ],
  },
});
