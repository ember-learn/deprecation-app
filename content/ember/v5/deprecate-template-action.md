---
title: Action helper and modifier 
until: 6.0.0
since: 5.10.0
---

### Scenario: `action` is passed a string

Before:
```hbs
<button type="button" {{action "plusOne"}}>
  Click Me
</button>
```

After

```hbs
<button type="button" {{on 'click' this.plusOne}}>
  Click Me
</button>
```
or, if `plusOne` is passed in as an argument 
```hbs
<button type="button" {{on 'click' @plusOne}}>
  Click Me
</button>
```

If the `plusOne` action is in an actions object, it needs to move out:

Before:
```js
import Component from '@glimmer/component';

export default class Demo extends Component {
    actions = {
        plusOne() {
           /* ... */ 
        }
    }
}
```
or
```js
import Component from '@ember/component';

export default class Demo extends Component {
    actions = {
        plusOne() {
           /* ... */ 
        }
    }
}
```
or
```js
import Component from '@ember/component';

export default Component.extend({
    actions: {
        plusOne() {
           /* ... */ 
        }
    }
})
```

After:
```js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Demo extends Component {
    @action
    plusOne() {
       /* ... */ 
    }
}
```

Note that `@action` is completely different from `(action)` or `{{action}}` (and is partly a motivator for deprecating `(action)` and `{{action}}`, to reduce ambiguity).

`@action` is binds the `this` on the method to the instance of the class. 

### Scenario: `action` is passed a function reference

Before:
```hbs
<SomeComponent @update={{action this.plusOne}} />
```

After

```hbs
<SomeComponent @update={{this.plusOne}} />
```

### Scenario: `action` is passed parameters

Before:
```hbs
<SomeComponent @update={{action this.plus 1}} />
```

After:
```hbs
<SomeComponent @update={{fn this.plus 1}} />
```

### Scenario: `action` is used with `mut` 

Before:
```hbs
<SomeComponent @update={{action (mut @value.property}} />
```
After:
```js
// parent.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SomeComponent extends Component {
    @action
    handleUpdate(value) {
        this.args.property = value; 
    }
}
```
```hbs
{{! parent.hbs }}
<SomeComponent @update={{this.handleUpdate}} />
```

Related, [Combining function arguments with action functions](https://guides.emberjs.com/release/components/component-state-and-actions/#toc_combining-arguments-and-actions)


For more background, read the [RFC](https://github.com/emberjs/rfcs/pull/1006)
