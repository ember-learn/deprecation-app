---
id: template-compiler.registerPlugin
title: Class-based template compilation plugins
until: '4.0.0'
since: '3.27'
---

Using class-based template compilation plugins is deprecated.
Please update to the functional style.

Before:

```js
'use strict';

module.exports = class MyTemplateCompilationPlugin {
  transform(ast) {
    let visitor = {
      BlockStatement(node) {
        // ...
      },

      ElementNode(node) {
        // ...
      },

      MustacheStatement(node) {
        // ...
      },
    };

    this.syntax.traverse(ast, visitor);

    return ast;
  }
};
```

After:

```js
'use strict';

module.exports = function myTemplateCompilationPlugin() {
  return {
    visitor: {
      BlockStatement(node) {
        // ...
      },

      ElementNode(node) {
        // ...
      },

      MustacheStatement(node) {
        // ...
      },
    },
  };
};
```

Note:

If you see this deprecation when building an app, most likely it's coming from
one of the addons you have installed. You can use the class name of the plugin
included in the deprecation message to figure out which addon is triggering this
deprecation (`MyTemplateCompilationPlugin` in the before example above).
