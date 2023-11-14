import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import react from '@astrojs/react'
import mdx from '@astrojs/mdx';
import lambdaAdapter from '@common-web/astro-lambda-edge';


// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
	redirects:{
		'/maps/*':'/maps'
		},
	output: 'static',
  // site: 'https://dlib.nyu.edu/indianocean',
  // base: '/indianocean',
  integrations: [mdx(), react()]
  // adapter: lambdaAdapter()
});
