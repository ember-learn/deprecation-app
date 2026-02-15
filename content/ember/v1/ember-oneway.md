---
title: Ember.oneWay
until: 2.0.0
since: 1.13.0
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
