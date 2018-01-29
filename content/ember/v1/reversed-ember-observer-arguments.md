---
id: reversed-ember-observer-arguments
title: Reversed Ember.observer Arguments
until: ''
since: '1.13'
---

A little known feature of the observer function allowed for the arguments to be
listed in the opposite order, with function first:

```javascript
Ember.observer(function() {
  // React to observer firing here
}, 'property1', 'property2')
```

This syntax was deprecated in Ember 1.13.5. The above code sample should be
replaced with the standard syntax that lists the observed properties, then
the function as the last argument:

```javascript
Ember.observer('property1', 'property2', function() {
  // React to observer firing here
})
```