---
id: function-prototype-extensions.on
title: Function.prototype.on
until: '4.0.0'
since: '3.11'
---

Historically, Ember has extended the `Function.prototype` with a few functions
(`on`, `observes`, `property`), over time we have moved away from using these
prototype extended functions in favor of using the official ES modules based
API.

In order to migrate away from `Function.prototype.on` you would update to using
`@ember/object/evented` ([see
documentation](https://api.emberjs.com/ember/release/functions/@ember%2Fobject%2Fevented/on))
directly.

For example, you would migrate from:

```js
import EmberObject from '@ember/object';
import { sendEvent } from '@ember/object/events';

let Job = EmberObject.extend({
  logCompleted: function() {
    console.log('Job completed!');
  }.on('completed')
});

let job = Job.create();

sendEvent(job, 'completed'); // Logs 'Job completed!'
```

Into:

```js
import EmberObject from '@ember/object';
import { on } from '@ember/object/evented';
import { sendEvent } from '@ember/object/events';

let Job = EmberObject.extend({
  logCompleted: on('completed', function() {
    console.log('Job completed!');
  })
});

let job = Job.create();

sendEvent(job, 'completed'); // Logs 'Job completed!'
```

Please review the deprecation RFC over at
[emberjs/rfcs](https://emberjs.github.io/rfcs/0272-deprecation-native-function-prototype-extensions.html)
for more details.
