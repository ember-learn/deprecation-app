---
id: ember-data:deprecate-model-reopenclass
title: Deprecate Model Reopenclass
until: '5.0'
since: '4.7'
---

Instead of reopenClass, define `static` properties with native class syntax or add them to the final object.

Instead of:

```js
User.reopenClass({ aStaticMethod() {} });
```

Do this:

```js
class User {
  static aStaticMethod() {}
}
```

Or, do this:

```js
User.aStaticMethod = function () {};
```
