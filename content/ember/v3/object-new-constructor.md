---
id: object.new-constructor
title: new EmberObject
until: '3.9.0'
since: '3.6'
---

We are deprecating usage of `new EmberObject()` to construct instances of
`EmberObject` and it's subclasses. This affects all classes that extend from
`EmberObject` as well, including user defined classes and Ember classes such as:

* `Component`
* `Controller`
* `Service`
* `Route`
* `Model`

Instead, you should use `EmberObject.create()` to create new instances of
classes that extend from `EmberObject`. If you are using native class syntax
instead of `EmberObject.extend()` to define your classes, you can also refactor
to _not_ extend from `EmberObject`, and continue to use `new` syntax.

#### Refactoring to use `create()` instead of `new`

Before this deprecation, `new EmberObject()` and `EmberObject.create()` were
functionally the same, with one difference - `new EmberObject()` could only
receive 1 argument, whereas `EmberObject.create()` could receive several.
Because `new` was strictly less powerful, you can safely refactor existing code
to call `create` with the same arguments as before:

Before:

```js
let obj1 = new EmberObject();
let obj2 = new EmberObject({ prop: 'value' });

const Foo = EmberObject.extend();
let foo = new Foo({ bar: 123 });
```

After:

```js
let obj1 = EmberObject.create();
let obj2 = EmberObject.create({ prop: 'value' });

const Foo = EmberObject.extend();
let foo = Foo.create({ bar: 123 })
```

#### Refactoring native classes to not extend from EmberObject

If you are using native `class` syntax to extend from `EmberObject`, you can
instead define your classes _without_ a base class. This means that you will
have to write your own `constructor` function:

Before:

```js
class Person extends EmberObject {}

let rwjblue = new Person({ firstName: 'Rob', lastName: 'Jackson' });
```

After:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let rwjblue = new Person('Rob', 'Jackson');
```

This is closer to the way native classes are meant to work, and can help with
low level performance concerns such as shaping. It also enforces clear
interfaces which can help define the purpose of a class more transparently.

