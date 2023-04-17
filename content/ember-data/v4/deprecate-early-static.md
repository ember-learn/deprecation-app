---
id: ember-data:deprecate-early-static
title: Deprecate Early Static
until: '5.0'
since: '4.7'
---

#### TODO

Accessing schema information on Models without looking up the model via the store is deprecated.
Use store.modelFor (or better Snapshots or the store.getSchemaDefinitionService() apis) instead.

[RFC 741](https://rfcs.emberjs.com/id/0741-ember-data-deprecate-model-static-field-access-without-lookup)
