---
id: function-prototype-extensions.observes
title: Function.prototype.observes
until: '4.0.0'
since: '3.11'
---

Historically, Ember has extended the `Function.prototype` with a few functions
(`on`, `observes`, `property`), over time we have moved away from using these
prototype extended functions in favor of using the official ES modules based
API.

In order to migrate away from `Function.prototype.observes` you would update to using
`observer` from `@ember/object` ([see
documentation](https://api.emberjs.com/ember/release/functions/@ember%2Fobject/observer))
directly.

For example, you would migrate from:

```js
import EmberObject from '@ember/object';

export default EmberObject.extend({
  valueObserver: function() {
    // Executes whenever the "value" property changes
  }.observes('value')
});
```

Into:

```js
import EmberObject, { observer } from '@ember/object';

export default EmberObject.extend({
  valueObserver: observer('value', function() {
    // Executes whenever the "value" property changes
  })
});
```

Please review the deprecation RFC over at
[emberjs/rfcs](https://emberjs.github.io/rfcs/0272-deprecation-native-function-prototype-extensions.html)
for more details.
