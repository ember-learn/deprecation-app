---
title: 'outputPaths' build option
until: 6.0.0
since: 5.3.0
displayId: ember-cli.outputPaths-build-option
---


Using the `outputPaths` build option is deprecated, as output paths will no longer be predetermined under Embroider.

To resolve the deprecation, please remove the `outputPaths` build option from your `ember-cli-build.js` file:

```diff
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
-   outputPaths: {
-     app: {
-       js: `/assets/foo.js`,
-     },
-   },
  };
};
```

And update your `app/index.html` file accordingly:

```diff
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>MyAppName</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{content-for "head"}}

    <link integrity="" rel="stylesheet" href="{{rootURL}}assets/vendor.css">
    <link integrity="" rel="stylesheet" href="{{rootURL}}assets/my-app-name.css">

    {{content-for "head-footer"}}
  </head>
  <body>
    {{content-for "body"}}

    <script src="{{rootURL}}assets/vendor.js"></script>
-   <script src="{{rootURL}}assets/foo.js"></script>
+   <script src="{{rootURL}}assets/my-app-name.js"></script>

    {{content-for "body-footer"}}
  </body>
</html>
```
