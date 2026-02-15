---
title: Ember.immediateObserver
until: 2.0.0
since: 1.13.0
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
