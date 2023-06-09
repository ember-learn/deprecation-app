---
title: Project::bowerDependencies
until: 5.0.0
since: 4.3.0
displayId: ember-cli.project.bower-dependencies
---


`bowerDependencies` has been deprecated. If you still need access to the
project's Bower dependencies, you will have to manually resolve the project's
`bower.json` file instead:

```js
'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    let bowerPath = path.join(this.project.root, 'bower.json');
    let bowerJson = fs.existsSync(bowerPath) ? require(bowerPath) : {};
    let bowerDependencies = {
      ...bowerJson.dependencies,
      ...bowerJson.devDependencies,
    };

    // Do something with `bowerDependencies`.
  },
};
```
