import adapter from '@sveltejs/adapter-static';

export default {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
    runes: true
  },
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: '404.html'
    }),
    paths: {
      base: '/svgBuilder'
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};
