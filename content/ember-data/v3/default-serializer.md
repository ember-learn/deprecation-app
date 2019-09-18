---
id: ember-data:default-serializers
title: Default serializers usage
until: '4.0.0'
since: '3.12.0'
---
## Default serializer deprecations

### deprecate adapter.defaultSerializer fallback

Previously, if no application or type-specific serializer was specified, the store would attempt to lookup a serializer via the `defaultSerializer` property on the type's adapter. This behavior is deprecated in favor of explicitly defining a type-specific serializer or application serializer.

You may be relying on the `defaultSerializer` property set by the `Adapter`, `RESTAdapter` or `JSONAPIAdapter` classes.
These classes specified the following `defaultSerializer`

- `Adapter`: `-default` (`@ember-data/serializer/json`)
- `RESTAdapter`: `-rest` (`@ember-data/serializer/rest`)
- `JSONAPIAdapter`: `-json-api` (`@ember-data/serializer/json-api`)

If a per-type adapter exists for the modelName triggering this deprecation, the easiest resolution is to add a per-type serializer.

If the application adapter is triggering this deprecation, then an application serializer should be added.

More information on adding these serializers can be found in "clearing these deprecations" below.

### -default serializer fallback in store.serializerFor

Previously, when no type-specific serializer, application serializer, or adapter defaultSerializer had been defined by the app, the `-default` serializer would be used which defaulted to the `JSONSerializer`. This behavior is deprecated in favor of explicitly defining an application or type-specific serializer as described below.

## clearing these deprecations

More information about custom serializers can be found in the [Serializer API Docs](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fserializer) or on the [ember.js/guides](https://guides.emberjs.com/release/models/customizing-serializers/#toc_customizing-serializers)

If a specific model type requires custom serialization, a type-specific serializer can be created. A single `application` serializer can be used a for any model types not requiring custom serialization. To define a type-specific serializer, create an `app/serializers/[type].js` with the following:

```js
    import RESTSerializer from '@ember-data/serializers/rest';

    export default class UserSerializer extends RESTSerializer {
      /*custom code*/
    }
```

Defining a serializer for the entire application can be done by adding the file `app/serializers/application.js` with the following:

```js
    export { default } from '@ember-data/serializers/json-api';
```
