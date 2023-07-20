'use strict';
const walkSync = require('walk-sync');
const path = require('path');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

/*
Map over filenames in order to help generate the prembered
URLs for the individual deprecation article pages.
Their URL is something like `/id/project.bower-dependencies`
*/
const getDeprecationFilenames = function () {
  return walkSync('content', { globs: ['**/*.md'] }).map(
    (filename) => `/id/${path.basename(filename, '.md')}`
  );
};

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    prember: {
      urls: [
        '/',
        '/v5.x',
        '/v4.x',
        '/v3.x',
        '/v2.x',
        '/v1.x',
        '/ember/v5.x',
        '/ember/v4.x',
        '/ember/v3.x',
        '/ember/v2.x',
        '/ember/v1.x',
        '/ember-data/v2.x',
        '/ember-data/v3.x',
        '/ember-data/v4.x',
        '/ember-cli/v2.x',
        '/ember-cli/v4.x',
        ...getDeprecationFilenames(),
      ],
    },

    'ember-cli-string-helpers': {
      only: ['html-safe'],
    },

    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },

    fastboot: {
      moduleWhitelist: ['algoliasearch'],
    },
  });

  app.import('node_modules/semver-compare/index.js', {
    using: [{ transformation: 'cjs', as: 'semver-compare' }],
  });

  return app.toTree();
};
