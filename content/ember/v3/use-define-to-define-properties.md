---
id: ember-meta.descriptor-on-object
title: Use defineProperty to define computed properties
until: '3.5.0'
since: '3.2'
---

Although uncommon, it is possible to assign computed properties directly to
objects and have them be implicitly computed from eg `Ember.get`.  As part of
supporting ES5 getter computed properties, assigning computed properties
directly is deprecated.  You should replace these assignments with calls to
`defineProperty`.

For example, the following:

```javascript
let object = {};
object.key = Ember.computed(() => 'value');
Ember.get(object, 'key') === 'value';
```

Should be changed to:

```javascript
let object = {};
Ember.defineProperty(object, 'key', Ember.computed(() => 'value'));
Ember.get(object, 'key') === 'value';
```
