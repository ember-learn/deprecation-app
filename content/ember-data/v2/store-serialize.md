---
id: store-serialize
title: Store.serialize
until: '3.0.0'
since: '2.11'
---

`Store.serialize` has been deprecated in favor of
[`Model.serialize`](http://emberjs.com/api/data/classes/DS.Model.html#method_serialize)
as part of an effort to reduce duplication and API surface area.

Before:

```javascript
let post = this.store.peekRecord('post', 123);
this.store.serialize(post);
```

After:

```javascript
let post = this.store.peekRecord('post', 123);

post.serialize();
```
