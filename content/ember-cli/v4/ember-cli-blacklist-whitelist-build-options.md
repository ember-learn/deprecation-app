---
title: blacklist and whitelist build options
until: 5.0.0
since: 4.4.0
displayId: ember-cli.blacklist-whitelist-build-options
---


Using the `blacklist` and `whitelist` build options has been deprecated. Please 
use `exclude` and `include` respectively instead.

```js {data-filename="ember-cli-build.js" data-diff="-4,+5"}
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    addons: {
      blacklist: ['addon-name'],
      exclude: ['addon-name'],
    },
  };
};
```
