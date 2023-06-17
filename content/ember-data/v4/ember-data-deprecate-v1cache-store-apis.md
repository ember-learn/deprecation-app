---
displayId: ember-data:deprecate-v1cache-store-apis
title: Deprecate V1 cache Store Apis
until: '5.0'
since: '4.7'
---

Deprecates various methods on the store and store-cache-wrapper that were specific to the v1 cache.

Most applications should not encounter this deprecation, but if you do it means that an addon you are using is likely using these methods as part of having implemented its own cache.

The implementation will need to update to the V2 Cache API equivalent method as detailed in the deprecation method. Generally this means the implementation needs to be more broadly reworked to use the newer V2.1 Cache API.
