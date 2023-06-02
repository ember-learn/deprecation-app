---
id: non-standard-ways-of-calling-code-ember-set-code-and-code-ember-get-code
title: Non-Standard Ways of Calling `Ember.set` and `Ember.get`
until: ''
since: '1.13'
---

Ember is deprecating calls to `get` and `set` made in non-standard ways.  Below are examples
of the calls that are now deprecated:

```javascript
// referencing properties with globals
Ember.set(null, 'App.foo', bar);
Ember.set('App.foo', bar);
Ember.get(null, 'App.foo');
Ember.get('App.foo');

// referencing properties with 'this'
Ember.set(obj, 'this.foo', bar);
Ember.get(obj, 'this.foo');

// providing a null context
Ember.set(null, 'foo', bar);
Ember.get(null, 'foo');

// providing a non-string property
Ember.set(obj, 42, bar);
Ember.get(obj, 42);
```