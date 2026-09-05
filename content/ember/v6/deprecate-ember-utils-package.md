---
title: "@ember/utils package"
until: 7.0.0
since: 6.8.0
---

The `@ember/utils` package is now deprecated and will be removed in Ember 7.0.

## What is being deprecated

The entire `@ember/utils` package, which includes utility functions such as:

- `compare`
- `isBlank`
- `isEmpty`
- `isEqual`
- `isNone`
- `isPresent`
- `typeOf`

## Why is this being deprecated

The `@ember/utils` package was created as a way to provide utility functions that were previously available on the `Ember` global. With the move towards modern JavaScript and the deprecation of the `Ember` global, these utility functions are no longer needed as part of the core Ember framework.

## Migration path

### Option 1: Replace with native JavaScript alternatives (Recommended)

Most utility functions can be replaced with native JavaScript alternatives, which is the preferred approach for better performance and reduced bundle size. See below for examples.

### Option 2: Use @ember/legacy-utils (Fallback)

If you need to maintain the exact same API, you can install the `@ember/legacy-utils` addon:

```bash
ember install @ember/legacy-utils
```

Then update your imports:

```js
// Before
import { compare, isBlank, isEmpty, isEqual, isNone, isPresent, typeOf } from '@ember/utils';

// After
import { compare, isBlank, isEmpty, isEqual, isNone, isPresent, typeOf } from '@ember/legacy-utils';
```

Many of these utility functions can be replaced with native JavaScript alternatives:

#### `isBlank` and `isEmpty`

```js
// Before
import { isBlank, isEmpty } from '@ember/utils';

if (isBlank(value)) { /* ... */ }
if (isEmpty(value)) { /* ... */ }

// After
if (value == null || value === '') { /* ... */ }
if (value == null || value.length === 0) { /* ... */ }
```

#### `isPresent`

```js
// Before
import { isPresent } from '@ember/utils';

if (isPresent(value)) { /* ... */ }

// After
if (value != null && value !== '') { /* ... */ }
```

#### `isEqual`

```js
// Before
import { isEqual } from '@ember/utils';

if (isEqual(a, b)) { /* ... */ }

// After
if (a === b) { /* ... */ }
// or use a deep equality library like lodash.isEqual
```

#### `typeOf`

The `typeOf` function provides more detailed type checking than native `typeof`. Here are examples for different types:

```js
// Before
import { typeOf } from '@ember/utils';

if (typeOf(value) === 'string') { /* ... */ }
if (typeOf(value) === 'array') { /* ... */ }
if (typeOf(value) === 'date') { /* ... */ }
if (typeOf(value) === 'error') { /* ... */ }
if (typeOf(value) === 'null') { /* ... */ }

// After - Basic types
if (typeof value === 'string') { /* ... */ }
if (Array.isArray(value)) { /* ... */ }
if (value instanceof Date) { /* ... */ }
if (value instanceof Error) { /* ... */ }
if (value === null) { /* ... */ }

// After - More complex type checking
function getType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Error) return 'error';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'function') return 'function';
  return 'object';
}

if (getType(value) === 'string') { /* ... */ }
```

#### `compare`

```js
// Before
import { compare } from '@ember/utils';

array.sort((a, b) => compare(a, b));

// After
array.sort((a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});
```

## Computed Properties

If you're using `@ember/utils` functions in computed properties, you have two migration options:

### Option 1: Use tracked with getters (Recommended)

Replace computed properties that use `@ember/utils` functions with tracked properties and getters:

```js
// Before
import { computed } from '@ember/object';
import { isBlank, isEmpty } from '@ember/utils';

export default class MyComponent extends Component {
  @computed('name', 'description')
  get isValid() {
    return !isBlank(this.name) && !isEmpty(this.description);
  }
}

// After
import { tracked } from '@glimmer/tracking';

export default class MyComponent extends Component {
  @tracked name;
  @tracked description;

  get isValid() {
    return this.name != null && this.name !== '' && 
           this.description != null && this.description.length > 0;
  }
}
```

### Option 2: Use computed properties (Fallback)

If you need to maintain computed properties, you can still use them with native JavaScript:

```js
// Before
import { computed } from '@ember/object';
import { isBlank, isEmpty } from '@ember/utils';

export default class MyComponent extends Component {
  @computed('name', 'description')
  get isValid() {
    return !isBlank(this.name) && !isEmpty(this.description);
  }
}

// After
import { computed } from '@ember/object';

export default class MyComponent extends Component {
  @computed('name', 'description')
  get isValid() {
    return this.name != null && this.name !== '' && 
           this.description != null && this.description.length > 0;
  }
}
```

## References

- [@ember/legacy-utils addon](https://github.com/bertdeblock/ember-legacy-utils)
- [RFC 0334: Deprecate @ember/utils](https://github.com/emberjs/rfcs/blob/main/text/0334-deprecate-ember-utils.md)
