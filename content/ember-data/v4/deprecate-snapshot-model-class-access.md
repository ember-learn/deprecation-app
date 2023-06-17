---
id: ember-data:deprecate-snapshot-model-class-access
title: Deprecate Snapshot Model Class Access
until: '5.0'
since: '4.5'
---

Deprecates accessing the factory class for a given resource type via properties on various classes.

Guards:

- SnapshotRecordArray.type
- Snapshot.type
- RecordArray.type

Use `store.modelFor(<resource-type>)` instead.
