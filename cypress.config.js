const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://shop-talk.heex.io",
    supportFile: false,
    testIsolation : true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
