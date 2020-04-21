---
id: ds.references.belongs-to.push-record
title: BelongsToReference.push(DS.Model)
until: '4.0.0'
since: 'Upcoming Features'
---
#### feature: ds-overhaul-references

Passing an instance of
[`DS.Model`](http://emberjs.com/api/data/classes/DS.Model.html) to
`BelongsToReference#push` has been deprecated. You should instead follow the
pattern of `model.set('relationship', value)` to update a `belongsTo`
relationship with an instance of `DS.Model`.

For example, if you have something like:

```javascript
let post = this.store.peekRecord('post', 123);
let author = this.store.peekRecord('user', 456);

post.belongsTo('author').push(author);
```

You can remove this deprecation by refactoring your code to:

```javascript
let post = this.store.peekRecord('post', 123);
let author = this.store.peekRecord('user', 456);

post.set('author', author);
```
