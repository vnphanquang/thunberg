import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

import alias from './.config/alias.cjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
    typescript: {
      tsconfigFile: './tsconfig.json',
    },
    postcss: true,
  }),

	kit: {
		adapter: adapter(),
    ssr: false,
    prerender: {
      enabled: false,
    },
		target: '#svelte',
		files: {
			template: 'src/app.html',
		},
    vite: {
      resolve: {
        alias,
      },
      plugins: [ ],
    },
	}
};

export default config;
