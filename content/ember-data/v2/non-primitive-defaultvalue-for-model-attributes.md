---
id: non-primitive-defaultvalue-for-model-attributes
title: Non-primitive defaultValue for Model Attributes
until: '3.0.0'
since: '2.3'
---

Providing a non-primitive value as a `defaultValue` has been deprecated because
the provided value is shared between all instances of the model. Using a
non-primitive value, such as `defaultValue: []`, can lead to unexpected bugs when
that value is mutated.

If you wish to continue using a non-primitive value as the `defaultValue` for an
attribute, you should provide a function that returns the value:

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  })
});
```
