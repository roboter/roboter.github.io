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
      wrap: false,
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
          globPatterns: ['**/*.{js,css,woff,woff2,ico}', 'images/thumbs/**/*.webp'],
          navigateFallback: null,
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 3,
          runtimeCaching: [
            {
              urlPattern: /\/images\/.*\.(?:png|jpg|jpeg|webp|svg|gif)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'site-images-cache',
                expiration: {
                  maxEntries: 80,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
    ],
  },
});
