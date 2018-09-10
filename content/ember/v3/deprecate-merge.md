---
id: ember-polyfills.deprecate-merge
title: Ember.merge
until: '4.0.0'
since: '3.6'
---

`Ember.merge` predates `Ember.assign`, but since `Ember.assign` has been released, `Ember.merge` has been mostly unnecessary.
To cut down on duplication, we are now recommending using `Ember.assign` instead of `Ember.merge`. If you need to support
Ember <= 2.4 you can use [ember-assign-polyfill](https://github.com/shipshapecode/ember-assign-polyfill) to make `Ember.assign`
available to you.

Before:
``` javascript
import { merge } from '@ember/polyfills';

var a = { first: 'Yehuda' };
var b = { last: 'Katz' };
merge(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
```

After:
``` javascript
import { assign } from '@ember/polyfills';

var a = { first: 'Yehuda' };
var b = { last: 'Katz' };
assign(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
```
