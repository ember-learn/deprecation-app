'use strict';

const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const contentFolders = [
  'ember/v1',
  'ember/v2',
  'ember/v3',
  'ember-data/v2',
  'ember-data/v3',
  'ember-cli/v2'
];

const jsonTrees = contentFolders.map(
  (type) =>
    new StaticSiteJson(`content/${type}`, {
      attributes: ['title', 'since', 'until', 'anchor'],
      type: 'contents',
      collate: true,
      collationFileName: `${type.replace(/\//, '-')}.x.json`,
    })
);

module.exports = {
  name: 'content-docs-generator',

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new BroccoliMergeTrees([...jsonTrees]);
  }
};
