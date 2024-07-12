---
title: Project::bowerDirectory
until: 5.0.0
since: 4.3.0
displayId: ember-cli.project.bower-directory
---


`bowerDirectory` has been deprecated. If you still need access to the
project's Bower directory, you will have to manually resolve the project's
`.bowerrc` file and read the `directory` property instead:

```js
'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    let bowerConfigPath = path.join(this.project.root, '.bowerrc');
    let bowerConfigJson = fs.existsSync(bowerConfigPath) ? fs.readJsonSync(bowerConfigPath) : {};
    let bowerDirectory = bowerConfigJson.directory || 'bower_components';

    // Do something with `bowerDirectory`.
  },
};
```
