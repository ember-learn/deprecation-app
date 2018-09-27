'use strict';

const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'content-docs-generator',

  included(parent) {
    this._super.included && this._super.included.apply(this, arguments);

    if (parent.options && parent.options.contentFolders) {
      this.contentFolders = parent.options.contentFolders;
    }
  },

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    let jsonTrees = this._createJsonTrees();
    return new BroccoliMergeTrees([...jsonTrees])
  },

  _createJsonTrees() {
    return this.contentFolders.map((type) => new StaticSiteJson(`content/${type}`, {
      attributes: ['title', 'since', 'until'],
      type: 'contents',
      collections: [{
        src: `content/${type}`,
        output: `${type.replace(/\//, '-')}.x.json`,
      }]
    }));
  }
};
