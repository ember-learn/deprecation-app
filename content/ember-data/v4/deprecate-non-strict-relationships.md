---
id: ember-data:deprecate-non-strict-relationships
title: Deprecate Non Strict Relationships
until: '5.0'
since: '4.7'
---

Deprecates when belongsTo and hasMany relationships are defined without specifying whether the relationship is asynchronous.

The current behavior is that relationships which do not define this setting are aschronous (`{ async: true }`).

Instead of:

```js
class Company extends Model {
  @hasMany('employee') employees;
}

class Employee extends Model {
  @belongsTo('company') company;
}
```

Use:

```js
class Company extends Model {
  @hasMany('employee', { async: true, inverse: 'company' }) employees;
}

class Employee extends Model {
  @belongsTo('company', { async: true, inverse: 'employees' }) company;
}
```
