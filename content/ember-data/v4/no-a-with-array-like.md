---
id: ember-data:no-a-with-array-like
title: No A With Array Like
until: '5.0'
since: '4.7'
---

Deprecates calling `A()` when an EmberData ArrayLike class is detected. This deprecation may not always trigger due to complexities in ember-source versions and the use (or disabling) of prototype extensions.

To fix, use the native JavaScript array methods instead of the `EmberArray` methods and refrain from wrapping the array in `A()`.

Note that some computed property macros may themselves utilize `A()`, in which scenario the computed properties need to be upgraded to Ember Octane syntax.

For instance, instead of:

```js
A([]);
```

Use:

```js
[];
```
