---
id: ember-create
title: Ember.create
until: ''
since: '1.13'
---

`Ember.create` is deprecated in favor for `Object.create`. For more information
regarding `Object.create`, please
[read the MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Please change this:

```javascript
const doug = Ember.create({
  firstName: 'Doug'
});
```

to

```javascript
const doug = Object.create({
  firstName: 'Doug'
});
```