---
id: ember-source-deprecation-without-for
title: Without for
until: '4.0.0'
since: '3.24'
---

The `deprecate` function now requires passing the `for` option. Before:

```js
function somethingBad() {}

deprecate(
  'Please update from the bad function `somethingBad` to a better one',
  false,
  {
    id: 'get-rid-of-somethingBad',
    until: 'v4.0.0',
  }
);
```

After:

```js
function somethingBad() {}

deprecate(
  'Please update from the bad function `somethingBad` to a better one',
  false,
  {
    id: 'get-rid-of-somethingBad',
    until: 'v4.0.0',
    for: 'my-namespace',
  }
);
```
