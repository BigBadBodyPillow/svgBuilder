import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: '404.html'
    }),
    paths: {
      base: dev ? '' : process.env.BASE_PATH || '/svgBuilder'
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};