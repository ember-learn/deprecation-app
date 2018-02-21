---
id: copyable-frozencopy
title: Copyable.frozenCopy
until: ''
since: '1.13'
---

Just as the `Freezable` mixin is deprecated in favor of functionality in
core JavaScript, the `frozenCopy` method of the Copyable mixin is also
deprecated in favor of [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

Replace the following code:

```javascript
const Obj = Ember.Object.extend(Freezable, Copyable, {
  copy() {
    return Obj.create();
  }
});

const frozenCopy = Obj.create().frozenCopy();
frozenCopy.isFrozen(); // => true
frozenCopy.set('foo', 'baz'); // => throws TypeError
```

with:

```javascript
const a = Ember.Object.create();
Object.isFrozen(a); // => false
Object.freeze(a);
Object.isFrozen(a); // => true
a.set('foo', 'baz'); // => throws TypeError
```
