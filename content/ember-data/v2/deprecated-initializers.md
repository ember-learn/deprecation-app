---
id: unused-initializers
title: Unused Initializers
until: '3.0.0'
since: '2.13'
---

The Ember Data initializers `data-adapter`, `injectStore`, `transforms`, and `store` are no longer used, so they are being removed.
Applications that depend on these for the ordering of their own custom initializers can substitute `ember-data` instead, without any change in functionality.

Before:

```javascript
export function initialize(application) {
  // ... your code ...
};

export default {
  name: 'websocketInit',
  after: 'store',
  initialize: initialize
};
```

After:

```javascript
export function initialize(application) {
  // ... your code ...
};

export default {
  name: 'websocketInit',
  after: 'ember-data',
  initialize: initialize
};
```
