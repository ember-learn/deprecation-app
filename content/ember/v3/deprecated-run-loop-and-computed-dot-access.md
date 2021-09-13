---
id: deprecated-run-loop-and-computed-dot-access
title: Run loop and computed dot access
until: '5.0.0'
since: '3.27.0'
---

Using `.` to access computed or run loop functions has been deprecated, such
as `computed.filter`.
Instead, import the value directly from the module:

```js
import { filter } from '@ember/object/computed';
```

(This deprecation guide needs more details.
You can help out by editing 
[this file](https://github.com/ember-learn/deprecation-app/blob/main/content/ember/v3/deprecated-run-loop-and-computed-dot-access.md)
and making a PR!)
