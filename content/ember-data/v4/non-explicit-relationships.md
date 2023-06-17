---
displayId: ember-data:non-explicit-relationships
title: Non Explicit Relationships
until: '5.0'
since: '4.7'
---

Deprecates when polymorphic relationships are detected via inheritance or mixins and no polymorphic relationship configuration has been setup.

For further reading please review [RFC#793](https://rfcs.emberjs.com/id/0793-polymporphic-relations-without-inheritance) which introduced support for explicit relationship polymorphism without mixins or inheritance.

You may still use mixins and inheritance to setup your polymorphism; however, the class structure is no longer what drives the design. Instead polymorphism is "traits" based or "structural": so long as each model which can satisfy the polymorphic relationship defines the inverse in the same way they work.

Notably: `inverse: null` relationships can receive any type as a record with no additional configuration at all.

Example Polymorphic Relationship Configuration:

```js
// polymorphic relationship
class Tag extends Model {
  @hasMany('taggable', { async: false, polymorphic: true, inverse: 'tags' })
  tagged;
}

// an inverse concrete relationship (e.g. satisfies "taggable")
class Post extends Model {
  @hasMany('tag', { async: false, inverse: 'tagged', as: 'taggable' }) tags;
}
```
