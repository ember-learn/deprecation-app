---
id: deprecate-utility
title: Deprecate Utility
until: '3.0.0'
since: '2.2.0'
---

Using the `ember-cli/lib/utlities/deprecate` module to issue deprecations has been deprecated
in favor of using `.writeDeprecateLine` method on the `ui` object (which is available on both
addons and project instances).

Migrate from:

```javascript
const deprecate = require('ember-cli/lib/utilities/deprecate');

module.exports = {
  name: 'my-addon-name',

  someMethod() {
    deprecate('this thing is deprecated!');
  }
}
```

To:

```javascript
module.exports = {
  name: 'my-addon-name',

  someMethod() {
    this.ui.writeDeprecateLine('this thing is deprecated!');
  }
}
```
