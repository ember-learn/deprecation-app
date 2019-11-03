---
id: jsonapiserializer-modelnamefrompayloadkey-for-resource
title: JSONAPISerializer.modelNameFromPayloadKey for Resource
until: '4.0.0'
since: 'Upcoming Features'
---
#### feature: ds-payload-type-hooks

Using `JSONAPISerializer.modelNameFromPayloadKey` to normalize the type of a
resource has been deprecated in favor of
`JSONAPISerializer.modelNameFromPayloadType`.

In the context of a JSON API payload, it is the value of the `type` key that
maps to the name of the corresponding `DS.Model` class rather than the key that
the data is nested under.

For example, if your API responds with a namespaced resource type in the payload
when you fetch a `post`:

```javascript
// GET /post/1

{
  "data": {
    "type": "api::v1::post",
    "id": "1"
  }
}
```

Previously, you would want to override `modelNameFromPayloadKey` to remove the
namespace:
```javascript {data-filename=app/serializers/post.js}
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  payloadKeyFromModelName(modelName) {
    return `api::v1::${modelName}`;
  }
});
```

You can remove this deprecation by refactoring your serializer to instead use
[`payloadTypeFromModelName`](http://emberjs.com/api/data/classes/DS.JSONAPISerializer.html#method_payloadTypeFromModelName):

```javascript {data-filename=app/serializers/post.js}
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  payloadTypeFromModelName(modelName) {
    return `api::v1::${modelName}`;
  }
});
```
