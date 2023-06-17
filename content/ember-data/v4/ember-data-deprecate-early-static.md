---
displayId: ember-data:deprecate-early-static
title: Deprecate Early Static
until: '5.0'
since: '4.7'
---

This deprecation triggers if static computed properties or methods are triggered without looking up the record via the store service's `modelFor` hook. Accessing this static information without looking up the model via the store most commonly occurs when:

- using ember-cli-mirage (to fix, refactor to not use its auto-discovery of ember-data models)
- importing a model class and accessing its static information via the import

Instead of:

```js
import User from 'my-app/models/user';

const relationships = User.relationshipsByName;
```

Do _at least_ this:

```js
const relationships = store.modelFor('user').relationshipsByName;
```

However, the much more future proof refactor is to not use `modelFor` at all, but instead to utilize the schema service for this static information:

```js
const relationships = store
  .getSchemaDefinitionService()
  .relationshipsDefinitionFor({ type: 'user' });
```
