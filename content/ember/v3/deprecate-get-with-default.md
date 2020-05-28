---
id: ember-metal.get-with-default
title: Use Ember getter and explicitly check for undefined
until: '4.0.0'
since: '3.20'
---

Deprecate support for `getWithDefault` in Ember's Object module (@ember/object) – both the [function](https://api.emberjs.com/ember/release/functions/@ember%2Fobject/getWithDefault) and the [class method](https://api.emberjs.com/ember/release/classes/EmberObject/methods/getWithDefault?anchor=getWithDefault) – because its expected behaviour is confusing to Ember developers.

- The API will only return the default value when the value of the property retrieved is `undefined`. This behaviour is often overlooked when using the function where a developer might expect that `null` or other _falsey_ values will also return the default value.
- The native JavaScript [Nullish Coalescing Operator `??`](https://github.com/tc39/proposal-nullish-coalescing) could be used to handle this case if we also take `null` as a _falsey_ value to show the default value

Before:

```js
import { getWithDefault } from '@ember/object';

let result = getWithDefault(obj, 'some.key', defaultValue);
```

After:

```js
import { get } from '@ember/object';

let result = get(obj, 'some.key');
if (result === undefined) {
  result = defaultValue;
}
```

#### Using Nullish Coalescing Operator

We cannot codemod directly into the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) since the expected behaviour of `getWithDefault` is to only return the default value if it is strictly `undefined`. The nullish coalescing operator accepts either `null` or `undefined` to show the default value.

The function `getWithDefault` **will not return** the default value if the provided value is `null`. The function will **only return** the default value for `undefined`:

```js
let defaultValue = 1;
let obj = {
  nullValue: null,
  falseValue: false,
};

// Returns defaultValue 1, undefinedKey = 1
let undefinedValue = getWithDefault(obj, 'undefinedKey', defaultValue);

// Returns null, nullValue = null
let nullValue = getWithDefault(obj, 'nullValue', defaultValue);

// Returns obj's falseValue, falseValue = false
let falseValue = getWithDefault(obj, 'falseValue', defaultValue);
```

The nullish coalescing operator (`??`) **will return** the default value when the provided value is `undefined` or `null`:

```js
let defaultValue = 1;
let obj = {
  nullValue: null,
  falseValue: false,
};

// Returns defaultValue 1, undefinedKey = 1
let undefinedValue = get(obj, 'undefinedKey') ?? defaultValue;

// Returns defaultValue 1, nullValue = 1
let nullValue = get(obj, 'nullValue') ?? defaultValue;

// Returns obj's falseValue, falseValue = false
let falseValue = get(obj, 'falseValue') ?? defaultValue;
```

For any given usage of `getWithDefault`, using nullish coalescing might work very well, but keep in mind that either `null` or `undefined` will return the default value.

Please review the deprecation RFC over at
[emberjs/rfcs](https://emberjs.github.io/rfcs/0554-deprecate-getwithdefault.html)
for more details.
