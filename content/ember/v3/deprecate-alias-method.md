---
id: object.alias-method
title: Deprecate `@ember/object#aliasMethod`
until: '4.0.0'
since: '3.9'
---

`@ember/object#aliasMethod` is a little known and rarely used method that allows
user's to add aliases to objects defined with `EmberObject`:

```js
import EmberObject, { aliasMethod } from '@ember/object';

export default EmberObject.extend({
  foo: 123,
  bar() {
    console.log(this.foo);
  },
  baz: aliasMethod('bar'),
});
```

This can be refactored into having one function call the other directly:

```js
import EmberObject from '@ember/object';

export default EmberObject.extend({
  foo: 123,
  bar() {
    console.log(this.foo);
  },
  baz() {
    this.bar(...arguments);
  },
});
```

Avoid defining methods directly on the class definition, since this will not
translate well into native class syntax in the future:

```js
// Do not use this, this is an antipattern! 🛑
import EmberObject from '@ember/object';

function logFoo() {
  console.log(this.foo);
}

export default EmberObject.extend({
  foo: 123,
  bar: logFoo,
  baz: logFoo,
});
```
