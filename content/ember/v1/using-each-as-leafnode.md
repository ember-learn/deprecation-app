---
id: using-code-each-code-as-a-leaf-node-in-a-dependent-key
title: Using `@each` as a leaf node in a dependent key
until: ''
since: '1.13'
---

Using `@each` at the end of a computed key is deprecated and will not work in
Ember 2.0

```javascript
invalid: Ember.computed('myObject.@each', function () {
  //no longer valid for monitoring changes to arrays
});
```

When defining dependent keys for computed properties, ember 2.0+ will treat
`@each` and `[]` differently.

`@each` will monitor specific properties within an array of objects.

```javascript
eachProp: Ember.computed('myObj.posts.@each.title', function () {
  //fired whenever one of the blog post titles is changed.
});
```

`[]` will monitor mutations to the array.

```javascript
arrProp: Ember.computed('myObj.posts.[]', function () {
  //fired whenever a blog post is added or removed
});
```
