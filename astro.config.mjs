import { defineConfig } from 'astro/config';
import react from '@astrojs/react'
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
	server: {
    port: 3000,
    host: true
  },
  // site: 'https://dlib.nyu.edu/indianocean',
  // base: '/indianocean',
  integrations: [ mdx(), react() ],
  // adapter: lambdaAdapter()
});
