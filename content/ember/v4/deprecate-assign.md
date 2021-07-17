---
id: ember-polyfills.deprecate-assign
title: Ember.assign
until: '5.0.0'
since: '4.0.0'
---

Use of `Ember.assign` is deprecated. You should replace any calls to `Ember.assign` with `Object.assign` or use the object spread operator.

Before:
``` javascript
import { assign } from '@ember/polyfills';

var a = { first: 'Yehuda' };
var b = { last: 'Katz' };
assign(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
```

After:
``` javascript
var a = { first: 'Yehuda' };
var b = { last: 'Katz' };
Object.assign(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
```
