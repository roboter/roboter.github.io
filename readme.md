# Roboter Astro Theme

This repository contains the **ev0-astro-theme**, a modern, premium‑looking blog template built with **Astro**, **Tailwind CSS**, and **React** integration. The site showcases:

- A clean, dark‑mode ready design with smooth micro‑animations.
- Support for **Lottie** animations via `react-lottie`.
- SEO‑friendly meta tags, Open Graph data, and a sitemap.
- Automatic PWA support powered by `vite-plugin-pwa`.
- Easy content management using Markdown and Astro components.

The theme is fully configurable via `astro.config.mjs` and includes integrations for compression, sitemap generation, and Tailwind utilities. It is ready to be deployed to any static‑hosting platform.

## Getting Started

```bash
# Install dependencies (using Yarn)
yarn install

# Run the development server
yarn dev
```

Feel free to customize the theme, add your own pages, and extend it with additional Astro integrations.

## Static Deploy

To deploy the site as a static site, you can use any static hosting provider. Below are examples for Netlify, GitHub Pages, and Vercel.

### Netlify
```bash
# Build the static site
yarn build

# Deploy the `dist` folder
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Build the static site
yarn build

# Push the `dist` folder to the `gh-pages` branch
git checkout --orphan gh-pages
git --work-tree=dist add .
git commit -m "Deploy"
git push origin gh-pages --force
```

### Vercel
```bash
# Install Vercel CLI if not installed
yarn global add vercel

# Deploy
vercel --prod
```




### Netlify
```bash
# Build the static site
npm run build

# Deploy the `dist` folder
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Build the static site
npm run build

# Push the `dist` folder to the `gh-pages` branch
git checkout --orphan gh-pages
git --work-tree=dist add .
git commit -m "Deploy"
git push origin gh-pages --force
```

### Vercel
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```


---

© 2025 Roboter. All rights reserved.
