---
id: jsonapiserializer-payloadkeyfrommodelname-for-resource
title: JSONAPISerializer.payloadKeyFromModelName for Resource
until: '4.0.0'
since: 'Upcoming Features'
---
#### feature: ds-payload-type-hooks

Using `JSONAPISerializer.payloadKeyFromModelName` to serialize the type of a
model has been deprecated in favor of
[`JSONAPISerializer.payloadTypeFromModelName`](http://emberjs.com/api/data/classes/DS.JSONAPISerializer.html#method_payloadTypeFromModelName).

For example, if your API expects a namespaced resource type in the payload that
is sent when you create a `post` model:

```javascript
// POST /api/posts/1

{
  "data": {
    "id": 1,
    "type": "api::v1::post"
  }
}
```

Previously, you would want to override `payloadKeyFromModelName` to add the
namespace to the `modelName`:

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
