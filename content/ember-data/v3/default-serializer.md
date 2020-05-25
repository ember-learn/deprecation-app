---
id: ember-data:default-serializers
title: Default serializers usage
until: '4.0.0'
since: '3.12.0'
---
#### Default serializer deprecations

#### Deprecate adapter.defaultSerializer fallback

Moving forward, every app or addon that uses Ember Data must have a serializer explicitly defined.

Previously, if no application or model-type-specific serializer was specified, the store would attempt to look up a serializer via the `defaultSerializer` property on the type's adapter. This behavior is deprecated in favor of explicitly defining a model-type-specific serializer or application serializer.

You may be relying on the `defaultSerializer` property set by the `Adapter`, `RESTAdapter` or `JSONAPIAdapter` classes.
These classes specified the following `defaultSerializer`

- `Adapter`: `-default` (`@ember-data/serializer/json`)
- `RESTAdapter`: `-rest` (`@ember-data/serializer/rest`)
- `JSONAPIAdapter`: `-json-api` (`@ember-data/serializer/json-api`)

#### Clearing these deprecations

If all the adapters in your app are the same kind (such as JSONAPI, REST, or JSON), you should create an
application serializer to match.

For example, if you use only JSONAPI adapters, creating the following application serializer
will resolve the deprecation:

```javascript {data-filename=app/serializers/application.js}
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  /*custom code*/
});
```

If your app uses different adapter types for different models, you should make one serializer for each model type. For example, if a certain model uses the `RESTAdapter`, create an `app/serializers/user.js` file with the following:

```javascript {data-filename=app/serializers/user.js}
import RESTSerializer from '@ember-data/serializer/rest';

export default RESTSerializer.extend({
  /*custom code*/
});
```

More information about custom serializers can be found in the [Serializer API Docs](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fserializer) or in the [official guides](https://guides.emberjs.com/release/models/customizing-serializers/#toc_customizing-serializers).
