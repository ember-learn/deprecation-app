---
id: restserializer-keyforpolymorphictype
title: RESTSerializer.keyForPolymorphicType
until: '3.0.0'
since: '2.3'
---

Previous versions of the
[`RESTSerializer`](http://emberjs.com/api/data/classes/DS.RESTSerializer.html)
relied on
[`keyForAttribute`](http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_keyForAttribute)
to determine the type key used for serializing polymorphic relationships. This
behavior has been deprecated in favor of using
[`keyForPolymorphicType`](http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_keyForPolymorphicType).
The benefit of having this additional hook is that you can customize the type
key separately from the key used for the relationship.

For example, given the following model:

```javascript {data-filename=app/models/comment.js}
import DS from 'ember-data';

export default DS.Model.extend({
  commentable: belongsTo('commentable', { polymorphic: true }),
  body: DS.attr('string')
});
```

When using the `RESTSerializer`, Ember Data expects a payload that looks similar
the following:

```javascript
{
  "comment": {
    "id": "1",
    "commentable": "123",
    "commentableType": "movie", // ${keyForAttribute}Type
    "body": "I'll be back"
  },
  "movie": {
    "id": "123",
    "title": "The Terminator"
  }
}
```

If your API instead responds with a key that doesn't follow the pattern of
`${keyForAttribute}Type`:

```javascript
{
  "comment": {
    "id": "1",
    "commentable": "123",
    "commentKind": "movie", // custom keyForPolymorphicType needed
    "body": "I'll be back"
  },
  "movie": {
    "id": "123",
    "title": "The Terminator"
  }
}
```

You can now override the `keyForPolymorphicType` hook in your serializer to
accommodate:

```javascript
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForPolymorphicType: function() {
    return 'commentKind';
  }
});
```
