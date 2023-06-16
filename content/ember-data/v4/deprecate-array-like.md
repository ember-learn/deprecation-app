---
id: ember-data:deprecate-array-like
title: Deprecate Array Like
until: '5.0'
since: '4.7'
---

Deprecates Ember "Array-like" methods on `RecordArray` and `ManyArray`.

These are the arrays returned respectively by `store.peekAll()`, `store.findAll()` and hasMany relationships on instance of Model or `record.hasMany('relationshipName').value()`.

The appropriate refactor is to treat these arrays as native arrays and to use native array methods.

For instance, instead of:

```js
users.firstObject;
```

Use:

```js
users[0];
// or
users.at(0);
```
