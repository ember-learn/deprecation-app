---
id: ember-global
title: Deprecate the Ember Global
until: '4.0.0'
since: '3.27'
---

Accessing Ember on the global context (e.g. `window.Ember`, `globalThis.Ember`, or just `Ember` without importing it) is no longer supported. Migrate to importing Ember explicitly instead. See [RFC 706](https://github.com/emberjs/rfcs/pull/706) for more details.

Before:

```js
export default class MyComponent extends Ember.Component {
  // ...
}
```

After:

```js
import Ember from 'ember';

export default class MyComponent extends Ember.Component {
  // ...
}
```

Alternatively, consider converting to use the Ember modules API equivalent to
the API you are using:

```js
import Component from '@ember/component';

export default class MyComponent extends Component {
  // ...
}
```

If there is no modules API equivalent, consider refactoring away from using that
API.
