---
id: migrating-from-_lookupfactory-to-factoryfor
title: Migrating from _lookupFactory to factoryFor
until: '2.13.0'
since: '2.12'
---

The private API method `_lookupFactory` is deprecated and replaced by `factoryFor` in public API. This API will return the original base class registered into or resolved by the container and a `create` function to generate a dependency-injected instance.

Addon creators and maintainers can use [ember-factory-for-polyfill](https://github.com/rwjblue/ember-factory-for-polyfill) for addons supporting versions 2.3+, or [ember-getowner-polyfill](https://github.com/rwjblue/ember-getowner-polyfill) for 1.10+.

Before:

```javascript
export default Component.extend(
  init() {
    this._super(...arguments);
    let Factory = getOwner(this)._lookupFactory('logger:main');
    this.logger = Factory.create({ level: 'low' });
  }
});
```

After:

```javascript
export default Component.extend(
  init() {
    this._super(...arguments);
    let factory = getOwner(this).factoryFor('logger:main');
    this.logger = factory.create({ level: 'low' });
  }
});
```

Any methods or properties of the factory can be accessed through the `class` property when using `factoryFor`.

```javascript
let factory = owner.factoryFor('widget:slow');
let klass = factory.class;
klass.hasSpeed('slow'); // true
```
