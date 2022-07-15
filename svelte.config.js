import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteOptions} */
const svelteConfig = {
  preprocess: sveltePreprocess(),
};

export default svelteConfig;
