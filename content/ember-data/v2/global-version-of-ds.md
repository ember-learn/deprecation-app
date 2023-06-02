---
id: global-version-of-ds
title: Global version of DS
until: '3.0.0'
since: '2.7'
---

Using the global version of DS is deprecated. Import `DS` or specific modules from `ember-data` where needed.

For example, if you had:

```javascript
/* globals DS */
```

It would be refactored to:

```javascript
import DS from 'ember-data';
```
