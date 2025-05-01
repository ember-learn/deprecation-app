---
title: Legacy Imports
until: '6.0'
since: '5.5'
displayId: warp-drive:deprecate-tracking-package
---

Using WarpDrive with EmberJS requires configuring it to use Ember's reactivity system.

The use of the package **@ember-data/tracking** is now deprecated. It
historically provided the bindings into Ember's reactivity system.
 
This package is no longer needed as the configuration is now
provided by the package **@warp-drive/ember**.

To resolve this deprecation, follow these steps:

### 1. Remove @ember-data/tracking

- Remove `@ember-data/tracking` from package.json (if using `ember-data` this may not be present)
- Remove type imports for `@ember-data/tracking` from tsconfig.json
- If using `untracked`, change to using `untrack` from `@glimmer/validator`

### 2. Add @warp-drive/ember

- Add `@warp-drive/ember` to package.json - the version to install should match the version of `ember-data` or `@ember-data/store`
- Add `@warp-drive/ember` to tsconfig.json - the types import follows the same pattern (currently this means adding `@warp-drive/ember/unstable-preview-types` to the types array)
- Add `import '@warp-drive/ember/install';` to the top of your `app.js` or `app.ts` file

### 3. Clear the deprecation

Once the above steps are complete, the deprecation can be silenced and the automatic fallback
registration of reactivity from `@ember-data/tracking` can be removed by updating your [WarpDrive
build config](https://api.emberjs.com/ember-data/release/modules/@warp-drive%2Fbuild-config%2Fdeprecations) in your `ember-cli-build` file.

```js
// inside of ember-cli-build.js

const { setConfig } = await import('@warp-drive/build-config');

setConfig(app, __dirname, {
  deprecations: {
    DEPRECATE_TRACKING_PACKAGE: false
  }
});
```
