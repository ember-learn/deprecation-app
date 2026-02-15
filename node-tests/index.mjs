import { readFileSync } from 'fs';
import walkSync from 'walk-sync';
import { join, basename } from 'path';
import yamlFront from 'yaml-front-matter';
import semver from 'semver';

const markdownFilenames = walkSync('content', { globs: ['**/*.md'] });

// In addition to versions, `since` can have two magic values:
const SINCE_NON_VERSIONS = ['Upcoming Features', 'Glimmer Internals'];

describe('Frontmatter Validation', function () {
  let errors = [];
  markdownFilenames.forEach((file) => {
    it(`${file} has valid frontmatter`, function () {
      errors = [];
      const front = yamlFront.loadFront(
        readFileSync(join('content', file), 'utf8'),
      );

      if (front.id) {
        errors.push(
          `You can't define an ID for a deprecation. If you need an ID that is different from the file name then use displayId`,
        );
      }

      if (front.displayId && front.displayId === basename(file, '.md')) {
        errors.push(
          `You don't need to define a displayId if it's the same as the file name`,
        );
      }

      // `since` is manditory and must be a string
      if (typeof front.since !== 'string') {
        errors.push('since frontmatter must be a string');
      }

      // verify `since` is a version or a special value
      if (!semver.valid(front.since)) {
        if (!SINCE_NON_VERSIONS.includes(front.since)) {
          errors.push(
            `since frontmatter must be a valid version, found "${front.since}"`,
          );
        }
      }

      // if you define an `until` then it must be a string
      if (front.until) {
        if (typeof front.until !== 'string') {
          errors.push('until frontmatter must be a string');
        }

        // verify `until` is a version or an empty string
        if (!semver.valid(front.until)) {
          if (![''].includes(front.until)) {
            errors.push(
              `until frontmatter must be a valid version, found "${front.until}"`,
            );
          }
        }
      }

      if (errors.length > 0) {
        throw new Error(errors.join('; '));
      }
    });
  });
});
