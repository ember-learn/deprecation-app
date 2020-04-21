---
id: ember-data:default-adapter
title: Default adapter usage
until: '4.0.0'
since: '3.12.0'
---
#### Deprecates both store.defaultAdapter (which defaults to -json-api) and the -json-api adapter fallback behavior

Previously, applications could define the store.adapter property which would be used by defaultAdapter and adapterFor as a fallback for when an adapter was not found by an exact name match.

[RFC 522](https://github.com/emberjs/rfcs/pull/522) Deprecated specifying and using this property in favor of an explicit application adapter fallback.

If you were not setting this value previously, the following should be sufficient to resolve this deprecation:

create the file app/adapters/application.js with the following:

```js
    export { default } from '@ember-data/adapters/json-api';
```


If you were setting the adapter property previously to `<adapter-name>`, create the file app/adapters/application.js with the following:

```js
    export { default } from './<adapter-name>';
```


 More information about custom adapters can be found on the [ember.js/guides](https://guides.emberjs.com/release/models/customizing-adapters/) and in the [API DOCs](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fadapter)
