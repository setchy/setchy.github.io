// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://setchy.io',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [
      // Cache static public/ images in the dev server so navigation between pages
      // doesn't revalidate them (Vite's default is `no-cache`, causing a flash of
      // the unloaded <img> — alt text / empty box — on every page load).
      {
        name: 'static-image-cache',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ?? '';
            if (url.startsWith('/avatar.png') || url.startsWith('/logos/')) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
            next();
          });
        },
      },
    ],
  },
});