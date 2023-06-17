---
displayId: ember-data:deprecate-promise-proxies
title: Deprecate Promise Proxies
until: '5.0'
since: '4.7'
---

Additional Reading: [RFC#846 Deprecate Proxies](https://rfcs.emberjs.com/id/0846-ember-data-deprecate-proxies)

Deprecates using the proxy object/proxy array capabilities of values returned from:

- `store.findRecord`
- `store.findAll`
- `store.query`
- `store.queryRecord`
- `record.save`
- `recordArray.save`
- `recordArray.update`

These methods will now return a native Promise that resolves with the value.

Note that this does not deprecate the proxy behaviors of `PromiseBelongsTo`. See RFC for reasoning. The opportunity should still be taken if available to stop using these proxy behaviors; however, this class will remain until `import Model from '@ember-data/model';` is deprecated more broadly.
