---
id: ember-immediateobserver
title: Ember.immediateObserver
until: ''
since: '1.13'
---

`Ember.immediateObserver` is deprecated in favor of `Ember.observer`. Please change all instances of `Ember.immediateObserver` from:

```javascript
Ember.Object.extend({
  valueObserver: Ember.immediateObserver('value', function() {
  })
});
```
to

```javascript
Ember.Object.extend({
  valueObserver: Ember.observer('value', function() {
  })
});
```