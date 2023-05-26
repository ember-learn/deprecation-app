/* eslint-env node */

/**
 * open each file in the content folder
 * if it has an id, and id is different from filename, rename it to be displayId
 * if it has an id, and it is the same as the filename, delete id
 *
 * for the app code: render displayId if available, or fallback to id
 *
 *
 * handle punctuation:
 * ember.built-in-components.reopen
 * becomes
 * toc_ember-built-in-components-reopen
 *
 *
 * ember-data:record-lifecycle-event-methods
 * becomes
 * record-lifecycle-event-methods
 *
 * question: are ids used at all?
 * experiment - change filenames only
 *
 * test - build the app and see if the HTML is the same for anchor tags
 *
 * CM 2023-06-02: ember/v4/deprecate-implicit-injection.md has a different ID, implicit-injections
 *  the plan is to rename the file to be `implicit-injections.md` so that the direct
 *  link `/id/implicit-injection` uses the same ID as the ancor link `/v4.x#toc_implicit-injections`
 *
 * THE ANSWER: we need to use the id-for-deprecation function to rename the file from the ID
 *
 * Example deprecation in emberjs source:
 * ```
 * export function deprecateTransitionMethods(frameworkClass: string, methodName: string): void {
  deprecate(
    `Calling ${methodName} on a ${frameworkClass} is deprecated. Use the RouterService instead.`,
    false,
    {
      id: 'routing.transition-methods',
      for: 'ember-source',
      since: {
        available: '3.26.0',
        enabled: '3.26.0',
      },
      until: '5.0.0',
      url: 'https://deprecations.emberjs.com/v3.x/#toc_routing-transition-methods',
    }
  );
}
```
 */

import fs, { writeFileSync } from 'fs';
import walkSync from 'walk-sync';
import {join, dirname, basename} from 'path';
import yamlFront from 'yaml-front-matter';
import yaml from 'yaml';

import { idForDeprecation } from './app/helpers/id-for-deprecation.mjs';

const markdownFilenames = walkSync('content', { globs: ['**/*.md'] });

console.log(markdownFilenames);

markdownFilenames.forEach((file) => {
  let contents = fs.readFileSync(join('content', file), 'utf8');
  contents = yamlFront.loadFront(contents);

  // fs.renameSync(
  //   join('content', file),
  //   join('content', dirname(file), `${idForDeprecation(contents.id)}.md`)
  // );

  // console.log(
  //   `Ranaming from ${join('content', file)} to ${join(
  //     'content',
  //     dirname(file),
  //     `${idForDeprecation(contents.id)}.md`
  //   )}`
  // );

  const baseFileName = basename(file, '.md');

  if (contents.id) {
    console.log(`${file} has a different ID, ${contents.id}`);
    const matter = contents.__content;

    if (contents.id !== idForDeprecation(contents.id)) {
      contents.displayId = contents.id;
    }

    delete contents.id;
    delete contents.__content;

    console.log(contents);

    writeFileSync(join('content', file), `---
${yaml.stringify(contents)}---\n${matter}`);
  }
});
