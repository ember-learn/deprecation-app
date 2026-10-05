---
title: 'RegistryProxyMixin'
until: 8.0.0
since: 7.4.0
---

`RegistryProxyMixin` from `@ember/-internals/runtime` is deprecated. This mixin was private, but importable.

The mixin provided the methods: `register`, `unregister`, `resolveRegistration`, `hasRegistration`, `registerOption`. Ember still provides these methods on the owner. Only using the mixin directly is deprecated.

There is no migration for applying the mixin yourself. Remove it. 

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
