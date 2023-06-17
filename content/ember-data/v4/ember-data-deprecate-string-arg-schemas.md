---
displayId: ember-data:deprecate-string-arg-schemas
title: Deprecate String Arg Schemas
until: '5.0'
since: '4.5'
---

Deprecates `schema.attributesDefinitionFor(type)` and `schema.relationshipsDefinitionFor(type)` in favor of a consistent object signature (`identifier | { type }`).

To resolve change:

```diff
- store.getSchemaDefinitionService().attributesDefinitionFor('user')
+ store.getSchemaDefinitionService().attributesDefinitionFor({ type: 'user' })
```
