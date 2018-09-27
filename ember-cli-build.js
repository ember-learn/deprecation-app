"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");
const contentFolders = require('./content-folder-list');

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

    contentFolders
  });

  app.import("node_modules/semver-compare/index.js", {
    using: [{ transformation: "cjs", as: "semver-compare" }]
  });

  app.import("node_modules/semver/semver.js", {
    using: [{ transformation: "cjs", as: "semver" }]
  });

  return app.toTree();
};
