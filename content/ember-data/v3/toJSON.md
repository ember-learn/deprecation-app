---
id: record.toJSON
title: Record toJSON usage
until: '4.0.0'
since: '3.12.0'
---

Users should avoid calling [`toJSON`](https://github.com/emberjs/data/blob/1be481a4924b2b4316c1cc151a58328c88903dcd/packages/store/addon/-private/system/model/model.js#L620) on a record instance since it uses the now deprecated `-default` serializer to create a JSON representation of a model.

To clear this deprecation users may call record.serialize() or implement their own toJSON instead. The simplest 1:1 refactor is to import a serializer and define a `toJSON` method that returns the serialized data from the model, but users may want to consider implementing a custom "serialize" method that outputs relevant data.

An example of the simple refactor is below:
### before

```js
  //app/models/post.js
  import Model from '@ember-data/model';

  export default class Post extends Model {};

  //other app code
  const record = store.peekRecord('post');
  // users the default serializer, will have a deprecation warning
  const output = record.toJSON();
```

### after
```js
  //app/models/post.js
  import Model from '@ember-data/model';
  import { JSONAPISerializer } from '@ember-data/serializers';

  export default class Post extends Model {
    toJSON(options) {
      /* Create a JSON object with relevant data by either:
          - iterating the attributes / relationships of the record into a POJO
          - calling this.serialize and then munge output into the desired shape
      */
    }
  };

  //other app code
  const record = store.peekRecord('post');
  // users the default serializer
  const output = record.toJSON();
```
