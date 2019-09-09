---
id: record.toJSON
title: Record toJSON usage
until: '4.0.0'
since: '3.12.0'
---

Users should avoid calling [`toJSON`](https://github.com/emberjs/data/blob/1be481a4924b2b4316c1cc151a58328c88903dcd/packages/store/addon/-private/system/model/model.js#L620) on a record instance since it uses the now deprecated `-default` serializer to create a JSON representation of a model.

To clear this deprecation users may call record.serialize() or implement their own toJSON instead.
