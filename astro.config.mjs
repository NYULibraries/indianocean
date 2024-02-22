import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "static",
	server: {
		port: 3000,
		host: true
	},
	//   Site: 'https://dlib.nyu.edu/indianocean',
	//   Base: '/indianocean',
	integrations: [mdx(), react()]
	// Adapter: lambdaAdapter()
});
 