---
id: ember-oneway
title: Ember.oneWay
until: ''
since: '1.13'
---

`Ember.oneWay` is deprecated in favor for `Ember.computed.oneWay`. Please
change all instances of `Ember.oneWay` from:

```javascript
let User = Ember.Object.extend({
  firstName: null,
  nickName: Ember.oneWay('firstName')
});
```

to

```javascript
let User = Ember.Object.extend({
  firstName: null,
  nickName: Ember.computed.oneWay('firstName')
});
```