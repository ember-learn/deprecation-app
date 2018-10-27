"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

let urls = [
  "/",
  "/v3.x",
  "/v2.x",
  "/v1.x",
  "/ember/v3.x",
  "/ember/v2.x",
  "/ember/v1.x",
  "/ember-data/v2.x",
  "/ember-cli/v2.x"
];

module.exports = function(defaults) {
  let prepend = "";

  let fastlyDomain = process.env.FASTLY_DOMAIN;
  if ("FASTLY_DOMAIN" in process.env) {
    prepend = `https://${fastlyDomain}/`;
  }

  let app = new EmberApp(defaults, {
    prember: {
      urls
    },

    fingerprint: {
      prepend
    },

    "ember-prism": {
      theme: "okaidia",
      components: ["javascript", "handlebars", "markup-templating"],
      plugins: ["line-numbers", "normalize-whitespace"]
    },

    "ember-bootstrap": {
      bootstrapVersion: 4,
      importBootstrapFont: false,
      importBootstrapCSS: false
    },
    // TODO: remove once this issue is fixed https://github.com/ember-cli/ember-cli/issues/8075
    'ember-cli-uglify': { 
      uglify: {
        compress: {
          collapse_vars: false
        }
      }
    },
  });

  app.import("node_modules/semver-compare/index.js", {
    using: [{ transformation: "cjs", as: "semver-compare" }]
  });

  return app.toTree();
};
