import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'  // 👈 Fixes 404 errors on routes like /A1
    }),
    paths: {
      base: "/GRAPHS"  // 👈 Base path for GitHub Pages
    },
    appDir: "_app"
  }
};

export default config;