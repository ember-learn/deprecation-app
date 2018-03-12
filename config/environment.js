"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "deprecation-app",
    environment,
    rootURL: "/",
    routerRootURL: "/",
    apiHost: "",
    locationType: "auto",
    "ember-algolia": {
      algoliaId: "BH4D90D16A",
      algoliaKey: "760969ef081fcadc7e0e60faefdb0907"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: ["localhost:4200"]
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature

    let fastlyDomain = process.env.FASTLY_DOMAIN;
    if (fastlyDomain) {
      ENV.apiHost = `https://${fastlyDomain}`;
      ENV.rootURL = `https://${fastlyDomain}/`;
    }

    ENV.routerRootURL = "/deprecations/";
  }

  return ENV;
};
