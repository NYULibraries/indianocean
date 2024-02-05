const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
		testIsolation: false
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
