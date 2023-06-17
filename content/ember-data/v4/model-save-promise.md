---
id: ember-data:model-save-promise
title: Model Save Promise
until: '5.0'
since: '4.4'
---

Affects:

- `model.save` / `store.saveRecord`
- `model.reload`

Deprecates the promise-proxy returned by these methods in favor of a Promise return value.

To resolve this deprecation, `await` or `.then` the return value before doing work with the result instead of accessing values via the proxy.

To continue utilizing flags such as `isPending` in your templates consider using [ember-promise-helpers](https://github.com/fivetanley/ember-promise-helpers)
