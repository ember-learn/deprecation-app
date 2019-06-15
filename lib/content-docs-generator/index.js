'use strict';

const StaticSiteJson = require('broccoli-static-site-json'); // eslint-disable-line
const BroccoliMergeTrees = require('broccoli-merge-trees'); // eslint-disable-line

const contentFolders = ['ember/v1', 'ember/v2', 'ember/v3', 'ember-data/v2', 'ember-cli/v2'];

const jsonTrees = contentFolders.map((type) => new StaticSiteJson(`content/${type}`, {
  attributes: ['title', 'since', 'until'],
  type: 'contents',
  collections: [{
    src: `content/${type}`,
    output: `${type.replace(/\//, '-')}.x.json`,
  }]
}));

module.exports = {
  name: 'content-docs-generator',

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new BroccoliMergeTrees([...jsonTrees])
  }
};

