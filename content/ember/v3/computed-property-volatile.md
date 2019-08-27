---
id: computed-property.volatile
title: Computed Property Volatility
until: '4.0.0'
since: '3.9'
---

*NOTE*: There is a bug in Native Getters in 3.9 that was fixed in 3.10. To upgrade to 3.9 directly, just add this to your deprecation workflow, and make the recommended fixes when you move to 3.10 or beyond.


`.volatile()` is a computed property modifier which makes a computed property
recalculate every time it is accessed, instead of caching. It also prevents
property notifications from ever occuring on the property, which is generally
not the behavior that developers are after. Volatile properties are usually used
to simulate the behavior of native getters, which means that they would
otherwise behave like normal properties.

To update, use native getters directly instead:

Before:

```js
const Person = EmberObject.extend({
  fullName: computed(function() {
    return `${this.firstName} ${this.lastName}`;
  }).volatile()
});
```

After:

```js
const Person = EmberObject.extend({
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});
```
