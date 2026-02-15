import { readFileSync } from 'fs';
import walkSync from 'walk-sync';
import { join, basename } from 'path';
import yamlFront from 'yaml-front-matter';

const markdownFilenames = walkSync('content', { globs: ['**/*.md'] });

console.log(markdownFilenames);

describe('Json Tests', function () {
  markdownFilenames.forEach((file) => {
    it(`${file} is ok`, function () {
      let contents = readFileSync(join('content', file), 'utf8');
      contents = yamlFront.loadFront(contents);

      if (contents.id) {
        throw new Error(
          `You can't define an ID for a deprecation. If you need an ID that is different from the file name then use displayId`,
        );
      }

      if (contents.displayId && contents.displayId === basename(file, '.md')) {
        throw new Error(
          `You don't need to define a displayId if it's the same as the file name`,
        );
      }

      // since is manditory and must be a string
      if (typeof contents.since !== 'string') {
        throw new Error('since frontmatter must be a string');
      }

      // if you define an until then it must be a string
      if (contents.until && typeof contents.until !== 'string') {
        throw new Error('until frontmatter must be a string');
      }
    });
  });
});
