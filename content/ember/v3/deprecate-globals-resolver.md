---
id: ember.deprecate-globals-resolver
title: Use ember-cli resolver rather than legacy globals resolver
until: '4.0.0'
since: '3.16'
---

Over the past years we have transitioned to using Ember-CLI as the main way to compile Ember apps. The globals resolver is a holdover and primarily facilitates use of Ember without Ember-CLI.

If at all possible, it is highly recommended that you transition to using ember-cli to build your Ember applications. Most of the community already uses it and it provides many benefits including a rich addon ecosystem.

However, if you do have a custom build system, or are using Ember App Kit,
you can adapt your current build tools and configuration instead of using ember-cli if you really need to.

Instead of extending from Ember.DefaultResolver or @ember/globals-resolver,
extend from the [ember-cli-resolver](https://github.com/ember-cli/ember-resolver).

Then throughout your app, instead of compiling to:

**App.NameOfThingTypeOfThing**,

transpile to named amd strict syntax with module name of

**&lt;app-name/type-of-things/name-of-things&gt;**

which looks like this after transpilation

```js
// import bar from 'bar';
// export default foo(bar);
define("my-app/utils/foo", ["exports", "bar"], function (exports, bar) {
  "use strict";

  exports.__esModule = true;

  exports["default"] = foo(bar);
});
```

Also, instead of including your templates in `index.html`,
precompile your templates using the precompiler that is included with the
version of Ember.js you intend to use it with. This can be found in
the ember-source package under `dist/ember-template-compiler.js`.

Additionally, instead of using the `Ember.TEMPLATES` array to lookup a template,
you can import it in your code:

```js
import layout from './template.js';

export default Ember.Component.extend({ layout });
```

Finally, instead of creating a global namespace

```js
App.Utils = Ember.Namespace.create();
```

simply create a directory and when transpiling, include the directory name in your module name.

```js
define('my-app/utils/...', /*...*/);
```

If you need additional help transitioning your globals build system,
feel free to reach out to someone on the Ember Community
[Discord](https://discordapp.com/invite/zT3asNS)
or the [Discourse](https://discuss.emberjs.com) forum.
