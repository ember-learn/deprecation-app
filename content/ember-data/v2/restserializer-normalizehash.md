---
id: restserializer-normalizehash
title: RESTSerializer.normalizeHash
until: '3.0.0'
since: '2.6'
---

`RESTSerializer.normalizeHash` has been deprecated in favor of using `normalize`.

If you had this:

```javascript
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    _id: function(hash) {
      hash.id = hash._id;
      delete hash._id;
      return hash;
    }
  }
});
```

You could change it to this:

```javascript
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalize(model, hash, prop) {
    if (prop === 'comments') {
      hash.id = hash._id;
      delete hash._id;
    }
    return this._super(...arguments);
  }
});
```
