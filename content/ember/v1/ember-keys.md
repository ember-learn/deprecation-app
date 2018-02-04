---
id: ember-keys
title: Ember.keys
until: ''
since: '1.13'
---

`Ember.keys` is deprecated in favor for `Object.keys`. For more information
regarding `Object.keys`, please
[read the MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

```javascript
const food = Ember.keys({
  yellow: 'banana',
  green: 'pickle'
});
```

to

```javascript
const food = Object.keys({
  yellow: 'banana',
  green: 'pickle'
});
```