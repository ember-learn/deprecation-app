---
id: ember-data:default-serializers
title: Default serializers usage
until: '4.0.0'
since: '3.12.0'
---
## Default serializer deprecations
### deprecate adapter.serializer and adapter.defaultSerializer fallbacks
Previously, if no application or type-specific serializer was specified, the store would attempt to lookup a serializer via the `defaultSerializer` property on the type's adapter. This behavior is deprecated in favor of explicitly defining a type-specific serializer or application serializer as described in "clearing these deprecations" below.

### -default serializer fallback in store.serializerFor
When absolutely no serializer has been defined by the app, i.e. there is no model, application, or adapter serializer, the default (`-json-api`) serializer must be used. This behavior is deprecated in favor of explicitly defining a serializer for the type or application as a whole as described below.

## clearing the deprecations
More information about custom serializers can be found on the [ember.js/guides](https://guides.emberjs.com/release/models/customizing-serializers/#toc_customizing-serializers)

If a specific model type requires custom serialization, a type-specific serializer can be created.. Defining a type-specific serializer will clear the first deprecation, but won't clear both deprecations unless a type-specific serializer is defined for every type of model used in the application. To do this, create an `app/serializers/[type].js` with the following:

    import { JSONAPISerializer } from '@ember-data/serializers';

    export default JSONAPISerializer.extend({/* custom behavior */ });

Defining a serializer for the entire application will clear the second deprecation, and can clear both deprecations if the app doesn't require any type-specific serialization. To do this, create an `app/serializers/application.js` with the following:

    import { JSONAPISerializer } from '@ember-data/serializers';

    export default JSONAPISerializer.extend();




