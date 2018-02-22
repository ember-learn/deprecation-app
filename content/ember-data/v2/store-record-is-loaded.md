---
id: recordisloaded
title: recordIsLoaded
until: '3.0.0'
since: '2.11'
---

`recordIsLoaded` has been deprecated and is an alias for `hasRecordForId`, which should be used instead.

If you have this:

```javascript
store.recordIsLoaded('post', 1); // false
store.findRecord('post', 1).then(function() {
  store.recordIsLoaded('post', 1); // true
});
```

You can change it to this:

```javascript
store.hasRecordForId('post', 1); // false
store.findRecord('post', 1).then(function() {
  store.hasRecordForId('post', 1); // true
});
```


When using
[`DS.RESTSerializer`](http://emberjs.com/api/data/classes/DS.RESTSerializer.html)
with previous versions of Ember Data,
[`store.queryRecord`](http://emberjs.com/api/data/classes/DS.Store.html#method_queryRecord)
provided support for normalizing payloads containing an array of primary data.
This behavior has been deprecated because it is basically the same as using
[`store.query`](http://emberjs.com/api/data/classes/DS.Store.html#method_query)
and returning the first model.

Deprecated payload example with an array as the primary data:

```javascript
// GET /users?username="GummyBear"

{
  "users": [{
    "id": "1",
    "username": "GummyBear"
  }]
}
```

Expected payload example with a single object as the primary data:

```javascript
// GET /users?username="GummyBear"

{
  "user": {
    "id": "1",
    "username": "GummyBear",
  }
}
```

If you need to support an API that responds with an array as the primary data,
you have a few options. The simplest option is to use
[`store.query`](http://emberjs.com/api/data/classes/DS.Store.html#method_query)
instead of
[`store.queryRecord`](http://emberjs.com/api/data/classes/DS.Store.html#method_queryRecord):

```javascript
this.store.query('user', { username: 'GummyBear' }).then((users) => {
  return users.objectAt(0);
});
```

Another option is to override
[`normalizeQueryRecordResponse`](http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_normalizeQueryRecordResponse)
in your serializer, manipulating the payload so it matches the expected format:

```javascript {data-filename=app/serializers/user.js}
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeQueryRecordResponse(store, primaryModelClass, payload) {
    if (payload.users) {
      payload.user = payload.users[0];
      delete payload.users;
    }

    return this._super(...arguments);
  }
});
```

Another option is to customize the URL of the request made by
[`store.queryRecord`](http://emberjs.com/api/data/classes/DS.Store.html#method_queryRecord)
so that it makes a request that returns the expected payload with a single
object as its primary data. This can be done by overriding
[`urlForQueryRecord`](http://emberjs.com/api/data/classes/DS.RESTAdapter.html#method_urlForQueryRecord)
in your adapter:

```javascript {data-filename=app/adapters/user.js}
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlForQueryRecord() {
    let baseURL = this.buildURL();
    return `${baseURL}/user-query`;
  }
});
```
