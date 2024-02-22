import { defineConfig } from "cypress";

module.exports = defineConfig({
	"e2e": {
		"baseUrl": "http://localhost:3000",
		"testIsolation": false
	},

	"component": {
		"devServer": {
			"framework": "react",
			"bundler": "vite"
		}
	}
});
