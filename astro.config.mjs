import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './src/utils/manifest';
import react from "@astrojs/react";



// https://astro.build/config
export default defineConfig({
  site: 'http://begemotik.ee/',
  image: {
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true
    }
  },
  integrations: [

    sitemap(),
    tailwind(),
    robotsTxt(),
    react(),
  ],
  vite: {
    plugins: [VitePWA({
      registerType: 'autoUpdate',
      manifest,
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
        navigateFallback: null,
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      }
    })]
  }
});
