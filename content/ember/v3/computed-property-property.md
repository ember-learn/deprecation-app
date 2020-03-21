---
id: computed-property.property
title: Computed Property `.property()` Modifier
until: '4.0.0'
since: '3.9'
---

`.property()` is a modifier that adds additional property dependencies to an
existing computed property:

```js
const Person = EmberObject.extend({
  fullName: computed(function() {
    return `${this.firstName} ${this.lastName}`;
  }).property('firstName', 'lastName')
});
```

To update, move the dependencies to the main computed property definition:

```js
const Person = EmberObject.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
});
```

In the case of the `filter`, `map`, and `sort` computed property macros, it was
previously possible to need to add dependencies because they weren't available
in the public APIs of those macros. An optional second parameter has now been
added to these macros which is an array of additional dependent keys, allowing
you to pass these dependencies to them.

Before:

```js
const Person = EmberObject.extend({
  friendNames: map('friends', function(friend) {
    return friend[this.get('nameKey')];
  }).property('nameKey')
});
```

After:

```js
const Person = EmberObject.extend({
  friendNames: map('friends', ['nameKey'], function(friend) {
    return friend[this.get('nameKey')];
  })
});
```

Custom computed property macros that encounter this issue should also be
refactored to be able to receive the additional keys as parameters.
