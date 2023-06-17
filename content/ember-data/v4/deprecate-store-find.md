---
id: ember-data:deprecate-promise-many-array-behaviors
title: Deprecate Promise Many Array Behaviors
until: '5.0'
since: '4.5'
---

Deprecates `store.hasRecordForId(type, id)` in favor of `store.peekRecord({ type, id }) !== null`.

Broadly speaking, while the ability to query for presence is important, a key distinction exists between these methods that make relying on `hasRecordForId` unsafe, as it may report `true` for a record which is not-yet loaded and un-peekable. `peekRecord` offers a safe mechanism by which to check for whether a record is present in a usable manner.
