import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	output: "static",
	server: {
		port: 3000,
		host: true
	},
	Site: "https://indianocean.dlib.nyu.edu",
	Base: "/",
	integrations: [mdx(), react(), sitemap()]
	// Adapter: lambdaAdapter()
});
