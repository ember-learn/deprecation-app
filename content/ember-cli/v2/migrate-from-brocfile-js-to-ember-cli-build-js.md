---
id: migrate-from-brocfile-js-to-ember-cli-build-js
title: Migrate from Brocfile.js to ember-cli-build.js
until: '3.0.0'
since: '2.0.0'
---

Early versions of Ember CLI utilized the default build file of Broccoli: `Brocfile.js`. Over time
we began realizing that this was not a tenable solution (we could not pass high fidelity objects
into the build pipeline, and therefore created two instances of all addons, etc), and introduced a
replacement for `Brocfile.js`: `ember-cli-build.js`.  The new structure allows Ember CLI to pass
information into the function exported by `ember-cli-build.js` and avoid the issues mentioned above.

The migration from `Brocfile.js` to `ember-cli-build.js` is fairly straight forward:

Migrate `Brocfile.js` from:
```javascript
// Brocfile.js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();
module.exports = app.toTree();
```

To `ember-cli-build.js`:

```javascript
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
      // Any options
  });

  return app.toTree();
};
```
