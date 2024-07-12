---
displayId: ember-data:deprecate-secret-adapter-fallback
title: Deprecate Secret Adapter Fallback
until: '5.0'
since: '4.5'
---

Deprecates the secret `-json-api` fallback adapter in favor or an explicit "catch all" application adapter. In addition to this deprecation ensuring the user has explicitly chosen an adapter, this ensures that the user may choose to use no adapter at all.

Simplest fix:

```js {data-filename=/app/adapters/application.js}
export { default } from '@ember-data/adapter/json-api';
```
