---
title: Ember CreateWithMixins
until: 2.0.0
since: 1.13.0
---


`Ember.Object.createWithMixins` method has been deprecated. Instead call `Ember.Object.create` or `Ember.Object.extend`.

```javascript
var obj = Ember.Object.createWithMixins({

});
```

Replace with code above with:

```javascript
var obj = Ember.Object.extend({

}).create();
```
