'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const contentFolders = ['ember/v1', 'ember/v2', 'ember/v3', 'ember-data/v2', 'ember-cli/v2'];

const jsonTrees = contentFolders.map((type) => new StaticSiteJson(`content/${type}`, {
  attributes: ['title', 'since', 'until'],
  type: 'contents',
  collections: [{
    src: `content/${type}`,
    output: `${type.replace(/\//, '-')}.x.json`,
  }
]
}));

let urls = [
  '/ember/v3.x',
  '/ember/v2.x',
  '/ember/v1.x',
  '/ember-data/v2.x',
  '/ember-cli/v2.x'
];

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    prember: {
      urls,
    },

    'ember-prism': {
      'theme': 'okaidia',
      'components': ['scss', 'javascript', 'handlebars', 'http', 'json'],
      'plugins': ['line-numbers', 'normalize-whitespace']
    },

    merge: BroccoliMergeTrees(jsonTrees),

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    }
  });

  app.import('node_modules/semver-compare/index.js', {
    using: [
      { transformation: 'cjs', as: 'semver-compare'}
    ]
  });

  return app.toTree();
};
