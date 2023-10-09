import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
