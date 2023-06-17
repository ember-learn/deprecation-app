---
displayId: ember-data:deprecate-non-strict-relationships
title: Deprecate Non Strict Relationships
until: 5.0
since: 4.7
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

Also deprecates when belongsTo and hasMany relationships are defined without specifying the inverse field on the related type.

The current behavior is that relationships which do not define this setting have their inverse determined at runtime, which is potentially non-deterministic when mixins and polymorphism are involved.

If an inverse relationship exists and you wish changes on one side to reflect onto the other side, use the inverse key. If you wish to not have changes reflected or no inverse relationship exists, specify `inverse: null`.

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

Instead of:

```js
class Company extends Model {
  @hasMany('employee') employees;
}
class Employee extends Model {
  @attr name;
}
```

Use:

```js
class Company extends Model {
  @hasMany('employee', { async: true, inverse: null }) employees;
}

class Employee extends Model {
  @attr name;
}
```

And also deprecates when belongsTo and hasMany relationships are defined without specifying the inverse record's type.

Instead of

```js
class Company extends Model {
  @hasMany() employees;
}

class Employee extends Model {
  @belongsTo() company;
}
```

Use

```js
class Company extends Model {
  @hasMany('employee', { async: true, inverse: 'company' }) employees;
}

class Employee extends Model {
  @belongsTo('company', { async: true, inverse: 'employees' }) company;
}
```
