---
id: ember-cli.blacklist-whitelist-build-options
title: blacklist and whitelist build options
until: '5.0.0'
since: '4.4.0'
---

Using the `blacklist` and `whitelist` build options has been deprecated. Please 
use `exclude` and `include` respectively instead.

```diff
// ember-cli-build.js

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    addons: {
-     blacklist: ['addon-name'],
+     exclude: ['addon-name'],
    },
  };
};
```
