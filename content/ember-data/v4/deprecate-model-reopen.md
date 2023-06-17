---
displayId: ember-data:deprecate-model-reopen
title: Deprecate Model Reopen
until: 5.0
since: 4.7
---

For properties known ahead of time, instead of:

```ts
class User extends Model {
  @attr firstName;
}

User.reopen({ lastName: attr() });
```

Extend `User` again or include it in the initial definition:

```ts
class User extends Model {
  @attr firstName;
  @attr lastName;
}
```

For properties generated dynamically, consider registering a `SchemaDefinitionService` with the store, as such services are capable of dynamically adjusting their schemas, and utilize the `instantiateRecord` hook to create a Proxy based class that can react to the changes in the schema. Use `Foo extends Model` to extend your class instead.
