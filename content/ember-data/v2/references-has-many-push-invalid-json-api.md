---
id: hasmanyreference-push-invalid-data
title: HasManyReference.push Invalid Data
until: '4.0.0'
since: 'Upcoming Features'
---
#### feature: ds-overhaul-references

In previous versions of Ember Data, `HasManyReference#push` supported pushing
data that was almost formatted as a [JSON API Relationship
Object](http://jsonapi.org/format/#document-resource-object-relationships), but
wasn't quite correct. Pushing data that is formatted this way has been
deprecated. You should refactor your code to instead push a properly formatted
JSON API Relationship Object.

For example, if you previously had something like:

```javascript
let commentsData = {
  data: [
    { data: { type: 'comment', id: 1 } },
    { data: { type: 'comment', id: 2 } }
  ]
};

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
