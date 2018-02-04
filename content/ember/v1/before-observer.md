---
id: beforeobserver
title: beforeObserver
until: ''
since: '1.13'
---

Before observers are deprecated due to the negative performance implications they have for Ember internals and applications.

Typically they were used to have access to the old value of a property when it's about to change, but you can get same functionality in an even more efficient way with just a few lines of code:

```javascript
function fooObserver(obj){
  var newFoo = obj.get('foo');
  if (obj._oldFoo !== newFoo) {
    // do your stuff here
    obj._oldFoo = newFoo;
  }
}
addObserver(obj, 'foo', fooObserver);
fooObserver(obj); // Optionally call the observer immediately
```

The related functions `Ember.addBeforeObserver`, `Ember.removeBeforeObserver`, `Ember.beforeObserversFor`, and `Function#beforeObserver`
are deprecated too.