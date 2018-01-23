'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const jsonTree = new StaticSiteJson(`content/ember/v2`, {
  attributes: ['title', 'since', 'until'],
  type: 'contents',
  collections: [{
    src: 'content/ember/v2',
    output: 'ember-v2.x.json',
  }]
});

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    prember: {
      urls: [
        '/ember/v2.x'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return new BroccoliMergeTrees([app.toTree(), jsonTree]);
};
