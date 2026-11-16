'use strict';

const fs = require('fs');
const path = require('path');
const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const yamlFront = require('yaml-front-matter');

function toPlainText(markdown) {
  return markdown
    .replace(/^```.*$/gm, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_#>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Writes `search-index.json`, one entry per deprecation guide,
 * for the client-side search in `app/utils/search.js`.
 */
class SearchIndex extends BroccoliPlugin {
  constructor(contentTree) {
    super([contentTree], { annotation: 'deprecation search index' });
  }

  build() {
    let [inputPath] = this.inputPaths;
    let entries = walkSync(inputPath, { globs: ['**/*.md'] }).map((file) => {
      let front = yamlFront.loadFront(
        fs.readFileSync(path.join(inputPath, file), 'utf8')
      );
      let id = path.basename(file, '.md');

      return {
        id,
        displayId: front.displayId || id,
        title: toPlainText(front.title),
        project: file.split('/')[0],
        since: front.since,
        until: front.until,
        text: toPlainText(front.__content),
      };
    });

    fs.writeFileSync(
      path.join(this.outputPath, 'search-index.json'),
      JSON.stringify(entries)
    );
  }
}

module.exports = SearchIndex;
