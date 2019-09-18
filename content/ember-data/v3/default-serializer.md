---
id: ember-data:default-serializers
title: Default serializers usage
until: '4.0.0'
since: '3.12.0'
---
## Default serializer deprecations
### deprecate adapter.defaultSerializer fallbacks
Previously, if no application or type-specific serializer was specified, the store would attempt to lookup a serializer via the `defaultSerializer` property on the type's adapter. This behavior is deprecated in favor of explicitly defining a type-specific serializer or application serializer as described in "clearing these deprecations" below.

### -default serializer fallback in store.serializerFor
Previously, when no type-specific serializer, application serializer, or adapter defaultSerializer had been defined by the app, the `-default` serializer would be used which defaulted to `-json-api`. This behavior is deprecated in favor of explicitly defining an application or type-specific serializer as described below.

## clearing these deprecations
More information about custom serializers can be found in the [Serializer API Docs](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fserializer) or on the [ember.js/guides](https://guides.emberjs.com/release/models/customizing-serializers/#toc_customizing-serializers)

If a specific model type requires custom serialization, a type-specific serializer can be created.. Defining a type-specific serializer will clear the first deprecation, but won't clear both deprecations unless a type-specific serializer is defined for every type of model used in the application. To do this, create an `app/serializers/[type].js` with the following:

```js
    import { JSONAPISerializer } from '@ember-data/serializers';

    export default class UserSerializer extends JSONApiSerializer { /*custom code*/ };
```

Defining a serializer for the entire application can be done by adding the file `app/serializers/application.js` with the following:

```js
    export { JSONAPISerializer } from '@ember-data/serializers';
```




