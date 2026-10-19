---
title: 'Computed macros'
until: 9.0.0
since: 7.5.0
---

These macros from `@ember/object/computed` are deprecated:

```text
alias, and, bool, deprecatingAlias, equal, gt, gte, lt, lte,
match, not, oneWay, or, readOnly, reads
```

Each macro has an equivalent in native JavaScript. Replace the macro with a getter. A getter updates automatically when it reads `@tracked` properties, so it needs no dependent keys.

The [Octane migration guide](https://guides.emberjs.com/release/upgrading/current-edition/) explains tracked properties and native getters in more detail, with more before and after examples.

The other macros of `@ember/object/computed` have their own guides:

- [`empty`, `notEmpty` and `none`](/id/deprecate-ember-utils)
- [the array macros](/id/deprecate-array-computed-macros)

### Before

```javascript
import { tracked } from '@glimmer/tracking';
import { alias, and, equal, gt, not } from '@ember/object/computed';

class Order {
  @tracked customer;
  @tracked total = 0;
  @tracked status = 'open';

  @alias('customer.name') customerName;
  @gt('total', 100) hasFreeShipping;
  @equal('status', 'paid') isPaid;
  @not('isPaid') isUnpaid;
  @and('isPaid', 'hasFreeShipping') shipsToday;
}
```

### After

```javascript
import { tracked } from '@glimmer/tracking';

class Order {
  @tracked customer;
  @tracked total = 0;
  @tracked status = 'open';

  get customerName() {
    return this.customer.name;
  }

  set customerName(value) {
    this.customer.name = value;
  }

  get hasFreeShipping() {
    return this.total > 100;
  }

  get isPaid() {
    return this.status === 'paid';
  }

  get isUnpaid() {
    return !this.isPaid;
  }

  get shipsToday() {
    return this.isPaid && this.hasFreeShipping;
  }
}
```

A getter runs each time it is read. If a getter does expensive work, add `@cached` from `@glimmer/tracking`.

### The equivalent of each macro

Each line is the body of a getter. In these examples, `a`, `b` and `value` are properties on the same object.

```javascript
// @not('value')
!this.value;

// @bool('value')
Boolean(this.value);

// @equal('value', 'open')
this.value === 'open';

// @gt('value', 10)
this.value > 10;

// @gte('value', 10)
this.value >= 10;

// @lt('value', 10)
this.value < 10;

// @lte('value', 10)
this.value <= 10;

// @match('value', /^\d+$/)
/^\d+$/.test(this.value);

// @and('a', 'b')
this.a && this.b;

// @or('a', 'b')
this.a || this.b;
```

### `alias`

An alias reads and writes another property. Use a getter and a setter.

```javascript
// Before
import { alias } from '@ember/object/computed';

class Person {
  @alias('address.city') city;
}
```

```javascript
// After
class Person {
  get city() {
    return this.address.city;
  }

  set city(value) {
    this.address.city = value;
  }
}
```

A write only causes an update when the property that it writes to is `@tracked`.

### `readOnly`

A read-only alias is a getter with no setter. An assignment to it throws an error in a class or a module, because both use strict mode.

```javascript
// Before
import { readOnly } from '@ember/object/computed';

class Person {
  @readOnly('address.city') city;
}
```

```javascript
// After
class Person {
  get city() {
    return this.address.city;
  }
}
```

### `oneWay` and `reads`

These macros read another property until you set a value. After that, they return the value that you set, and the other property does not change.

Use a tracked field for the local value.

```javascript
// Before
import { reads } from '@ember/object/computed';

class Editor {
  @reads('user.name') draftName;
}
```

```javascript
// After
import { tracked } from '@glimmer/tracking';

class Editor {
  @tracked localDraftName;

  get draftName() {
    return this.localDraftName ?? this.user.name;
  }

  set draftName(value) {
    this.localDraftName = value;
  }
}
```

### `deprecatingAlias`

Use a getter and a setter that call `deprecate` from `@ember/debug`.

```javascript
// Before
import { deprecatingAlias } from '@ember/object/computed';

class Hamster {
  @deprecatingAlias('cavendishCount', {
    id: 'hamster.deprecate-banana',
    until: '3.0.0',
    for: 'hamster-app',
    since: { available: '2.0.0', enabled: '2.0.0' },
  })
  bananaCount;
}
```

```javascript
// After
import { deprecate } from '@ember/debug';

const DEPRECATION = {
  id: 'hamster.deprecate-banana',
  until: '3.0.0',
  for: 'hamster-app',
  since: { available: '2.0.0', enabled: '2.0.0' },
};

class Hamster {
  get bananaCount() {
    deprecate('Usage of `bananaCount` is deprecated, use `cavendishCount` instead.', false, DEPRECATION);

    return this.cavendishCount;
  }

  set bananaCount(value) {
    deprecate('Usage of `bananaCount` is deprecated, use `cavendishCount` instead.', false, DEPRECATION);

    this.cavendishCount = value;
  }
}
```

### Classic computed properties that depend on the getter

A classic computed property with dependent keys does not see changes of a native getter. If such a property depends on a getter that replaced a macro, replace that computed property with a native getter too.
