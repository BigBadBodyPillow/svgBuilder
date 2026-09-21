import adapter from '@sveltejs/adapter-static';

export default {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
    runes: true
  },
  kit: {
    adapter: adapter(),
    paths: {
      base: '/svgBuilder'
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};
