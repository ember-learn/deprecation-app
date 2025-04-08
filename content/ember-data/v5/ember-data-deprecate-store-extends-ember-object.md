---
title: Store will no longer extend EmberObject in 6.0
until: '6.0'
since: '5.4'
displayId: ember-data:deprecate-store-extends-ember-object
rfc: https://rfcs.emberjs.com/id/1026-ember-data-deprecate-store-extends-ember-object
---

The Store class extending from EmberObject is deprecated and the class will no 
longer extend from EmberObject in 6.0.

Please remove usage of [EmberObject APIs](https://api.emberjs.com/ember/release/modules/@ember%2Fobject) 
in your Store class.

To mark the class as no longer extending from EmberObject, in ember-cli-build.js
set the following config:

```js
const app = new EmberApp(defaults, {
  emberData: {
    deprecations: {
      DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false
    }
 }
});
```

If you are unsure whether your Store class uses EmberObject APIs, set this 
config and uses of those APIs will throw exceptions. The most common API that 
may have been used is `Store.extend({...`.

This deprecation was introduced in RFC [#1026](https://rfcs.emberjs.com/id/1026-ember-data-deprecate-store-extends-ember-object).
