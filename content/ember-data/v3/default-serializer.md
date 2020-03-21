---
id: ember-data:default-serializers
title: Default serializers usage
until: '4.0.0'
since: '3.12.0'
---
#### Default serializer deprecations

### Deprecate adapter.defaultSerializer fallback

Moving forward, every app or addon that uses Ember Data must have a serializer explicitly defined.

Previously, if no application or model-type-specific serializer was specified, the store would attempt to lookup a serializer via the `defaultSerializer` property on the type's adapter. This behavior is deprecated in favor of explicitly defining a type-specific serializer or application serializer.

You may be relying on the `defaultSerializer` property set by the `Adapter`, `RESTAdapter` or `JSONAPIAdapter` classes.
These classes specified the following `defaultSerializer`

- `Adapter`: `-default` (`@ember-data/serializer/json`)
- `RESTAdapter`: `-rest` (`@ember-data/serializer/rest`)
- `JSONAPIAdapter`: `-json-api` (`@ember-data/serializer/json-api`)

### Clearing these deprecations

If all the adapters in your app are the same kind (such as JSONAPI, REST, or JSON), you should create an
application serializer to match.

For example, if you use only JSONAPI adapters, creating the file below in `app/serializers/application.js`
will resolve the deprecation:

```javascript
// app/serializers/application.js

export { default } from '@ember-data/serializer/json-api';
```

If your app uses different adapter types for different models, you should make one serializer for each model type. For example, if a certain model uses the `RESTAdapter`, create an `app/serializers/[model-type].js` file with the following:

```js
    import RESTSerializer from '@ember-data/serializer/rest';

    export default class UserSerializer extends RESTSerializer {
      /*custom code*/
    }
```

More information about custom serializers can be found in the [Serializer API Docs](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fserializer) or on the [ember.js/guides](https://guides.emberjs.com/release/models/customizing-serializers/#toc_customizing-serializers)
