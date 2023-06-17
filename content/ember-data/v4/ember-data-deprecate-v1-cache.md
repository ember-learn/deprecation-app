---
displayId: ember-data:deprecate-v1-cache
title: Deprecate V1 Cache
until: '5.0'
since: '4.7'
---

Deprecates instantiating a non-singleton cache via `store.createRecordDataFor` in favor of a singleton-cache via `store.createCache`.

Most applications should not encounter this deprecation, but if you do it means that an addon you are using is likely using an unsupported cache implementation.

The implementation will need to update to the V2 Cache API and be integrated via the `createCache` hook.
