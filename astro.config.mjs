import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	server: {
		port: 3000,
		host: true
	},
	base: '/',
	integrations: [mdx(), react(), sitemap()],
	site: 'https://indianocean.dlib.nyu.edu'
	// Adapter: lambdaAdapter()
});
