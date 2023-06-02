---
id: hasmanyreference-push-array
title: HasManyReference.push(array)
until: '4.0.0'
since: 'Upcoming Features'
---
#### feature: ds-overhaul-references

#### Deprecations Added in Pending Features

Passing an array to a `HasManyReference#push` has been deprecated. You should
refactor your code to instead pass a [JSON API Relationship
Object](http://jsonapi.org/format/#document-resource-object-relationships).

For example, if you previously had something like:

```javascript
let commentsData = [
  { data: { type: 'comment', id: 1 } },
  { data: { type: 'comment', id: 2 } }
];

let post = this.store.peekRecord('post', 123);

post.hasMany('comments').push(commentsData);
```

You could remove this deprecation by refactoring your code to:

```javascript
let commentsData = {
  data: [
    { type: 'comment', id: 1 },
    { type: 'comment', id: 2 }
  ]
};

let post = this.store.peekRecord('post', 123);

post.hasMany('comments').push(commentsData);
```
