---
id: events.inherited-function-listeners
title: Prototype Function Listeners
until: '3.9.0'
since: 'Upcoming Features'
---

Currently, function listeners and string listeners behave identically to each
other. Their inheritance and removal structure is the same, and they can be used
interchangeably for the most part. However, function listeners can be much more
expensive as they maintain a reference to the function.

Function listeners also have limited utility outside of _per instance_ usage.
Consider the following example which the same listener using strings and using
function references:

```js
class Foo {
  method() {}
}

addListener(Foo, 'event', null, 'method');
addListener(Foo, 'event', null, Foo.prototype.method);
```

It's clear that the string version is much more succinct and preferable. A more
common alternative would be adding the listener to the instance in the
constructor:

```js
class Foo {
  constructor() {
    addListener(this, 'event', this, this.method);
  }

  method() {}
}
```

But in this case, the listener doesn't need to be applied to the prototype
either.

#### Updating

In cases where function listeners have been added to a prototype, and those
functions _do_ exist on the prototype, replace them with string listeners:

Before:

```js
class Foo {
  method() {}
}

addListener(Foo, 'event', null, Foo.prototype.method);
```

After:

```js
class Foo {
  method() {}
}

addListener(Foo, 'event', null, 'method');
```

In cases where function listeners have been added to a prototype for _arbitrary_
functions which do not exist on the prototype, you can convert the function to a
method, create a wrapper function, or add the listener on the instance instead:

Before:

```js
function foo() {}

class Foo {}

addListener(Foo, 'event', null, foo);
```

After:

```js
class Foo {
  foo() {}
}

addListener(Foo, 'event', null, 'foo');

// OR
function originalFoo() {}

class Foo {
  foo() {
    originalFoo();
  }
}

addListener(Foo, 'event', null, 'foo');

// OR
function foo() {}

class Foo {
  constructor() {
    addListener(this, 'event', this, foo);
  }
}
```
