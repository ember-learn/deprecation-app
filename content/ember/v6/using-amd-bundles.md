---
title: Using `amd` bundles
until: 7.0.0
since: 6.10.0
rfc: https://rfcs.emberjs.com/id/1101-deprecate-ember-vendor-bundles
---

Ember will no longer publish legacy AMD-specific Ember builds. There are two ways you might be relying on the AMD bundles:

### Build-time use of ember-template-compiler.js AMD bundle

To clear this build-time deprecation, you may need to upgrade any of the following deps (if you have them in package.json) to these minimums:

 - ember-cli-htmlbars 7.0.0
 - babel-plugin-ember-template-compilation 3.1.0 or 4.0.0
 - ember-auto-import 2.13.1
 - @embroider/compat 4.1.16
 - @embroider/core 4.4.7

Of these, ember-cli-htmlbars is the only one that must be recursively updated -- if any of your addons depend on ember-cli-htmlbars 6.x, you will continue to hit this deprecation warning and won't be able to upgrade Ember 7 until it's addressed. It is usually safe to use your package manager to override the ember-cli-htmlbars version, because the vast majority of v1 addons don't care which version they're using.

### Runtime use of ember.debug.js, ember.prod.js, ember-testing.js AMD bundles

To opt-in to consuming Ember as ES modules and clear this deprecation, enable the
`use-ember-modules` optional feature by running `npx ember feature:enable use-ember-modules`.

This applies only to the classic build system or to Embroider < 4.0 without the
`staticEmberSource: true` option. If you see this deprecation warning in these
setups, please [open an issue](https://github.com/emberjs/ember.js/issues/new/choose).

Alternatively, you can also clear the deprecation by moving to Embroider v4 by
running the [Ember Vite Codemod](https://github.com/mainmatter/ember-vite-codemod),
but this may require additional changes to your project.

The AMD-specific Ember builds will no longer be published in next Ember major release
and no longer be bundled into `vendor.js`, even on the classic build system. These files are:

- `ember.debug.js`
- `ember.prod.js`
- `ember-testing.js`
- `ember-template-compiler.js`

- In rare cases, Addons were relying on accessing Ember from `vendor`. If you have
  addons that do so they will need to be updated to consume Ember as ES modules.

A known addon that previously relied on accessing Ember from `vendor` is
[ember-cli-deprecation-workflow](https://github.com/ember-cli/ember-cli-deprecation-workflow).
Please ensure you are on the latest version of this addon as that reliance has
been removed.

### Runtime template compiler

Most apps do all their template compilation as part of the build. But some apps may opt into shipping the compiler into the browser to do just-in-time template compilation. Historically, you might have done this via `app.import('vendor/ember-template-compiler.js')`. This uses the deprecated AMD ember-template-compiler.js bundle.

The replacement is to switch to the new on-demand runtime template compiler via `import { template } from '@ember/template-compiler/runtime'`. Note that it is not a drop-in replacement, it defaults to strict handlebars rules and always returns a Component, not a "bare template".
