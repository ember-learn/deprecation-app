---
title: Using `amd` bundles
until: 7.0.0
since: 6.10.0
rfc: https://rfcs.emberjs.com/id/1101-deprecate-ember-vendor-bundles
---

Ember will no longer publish legacy AMD-specific Ember builds. To opt-in to
consuming Ember as ES modules and clear this deprecation, enable the
`use-ember-modules` optional feature by running `npx ember feature:enable use-ember-modules`.

This applies only to the classic build system or to Embroider < 4.0 without the
`staticEmberSource: true` option. If you see this deprecation warning in these
setups, please [open an issue](https://github.com/emberjs/ember.js/issues/new/choose).

Alternatively, you can also clear the deprecation by moving to Embroider v4 by
running the [Ember Vite Codemod](https://github.com/mainmatter/ember-vite-codemod),
but this may require additional changes to your project.

The AMD-specific Ember builds will no longer be published in next Ember major release
and no longer be bundled into `vendor.js`, even on the classic build system. These files are:
-
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
