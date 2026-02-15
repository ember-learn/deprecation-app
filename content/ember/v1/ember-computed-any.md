---
title: Ember.computed.any
until: 2.0.0
since: 1.13.0
---


`Ember.computed.any` is deprecated in favor of `Ember.computed.or`. This change is required because the computed value is the first value ( like || ) rather than a boolean value ( like Array.prototype.any ). For example:

```javascript
let Hamster = Ember.Object.extend({
  hasClothes: Ember.computed.any('hat', 'shirt')
});
```
The above code will be changed to

```javascript
let Hamster = Ember.Object.extend({
  hasClothes: Ember.computed.or('hat', 'shirt')
});
```
