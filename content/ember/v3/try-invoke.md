---
id: ember-utils.try-invoke
title: tryInvoke from @ember/utils
until: '4.0.0'
since: 'Upcoming Features'
---

`tryInvoke` from the `@ember/utils` package is now deprecated.

In most cases, function arguments should not be optional, but in the rare occasion that an argument is optional by design, we can replace `tryInvoke` with JavaScript's [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

Before:

```javascript
import { tryInvoke } from '@ember/utils';

foo() {
 tryInvoke(this.args, 'bar', ['baz']);
}
```

After:

```javascript
foo() {
 this.args.bar?.('baz');
}
```
