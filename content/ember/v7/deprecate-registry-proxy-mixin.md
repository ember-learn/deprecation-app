---
title: 'RegistryProxyMixin'
until: 8.0.0
since: 7.4.0
---

`RegistryProxyMixin` from `@ember/-internals/runtime` is deprecated. This mixin was private, but importable.

The mixin gave `Application`, `Engine`, and their instances the registry methods: `register`, `unregister`, `resolveRegistration`, `hasRegistration`, `registerOption`, and friends. Ember still provides these methods on the owner. They now come from an internal copy of the mixin, so application code and initializers that call `application.register(...)` keep working without changes.

There is no migration for applying the mixin yourself. Remove it. 

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
