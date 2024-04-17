---
title: Action helper and modifier 
until: 6.0.0
since: 5.9.0
---

### Scenario: `action` is passed a string

Before:
```handlebars
<button type="button" {{action "plusOne"}}>
  Click Me
</button>
```

After:
```handlebars
<button type="button" {{on 'click' this.plusOne}}>
  Click Me
</button>
```

or, if `plusOne` is passed in as an argument:
```handlebars
<button type="button" {{on 'click' @plusOne}}>
  Click Me
</button>
```

If the `plusOne` action is in an actions object, it needs to move out:

#### For Glimmer components

Before:
```javascript
import Component from '@glimmer/component';

export default class Demo extends Component {
    actions = {
        plusOne() {
           /* ... */ 
        }
    }
}
```

After:
```javascript
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Demo extends Component {
    @action
    plusOne() {
       /* ... */ 
    }
}
```

or

#### For Classic Components with native classes

Before:
```javascript
import Component from '@ember/component';

export default class Demo extends Component {
    doMath() {
      this.send('plusOne');
    }

    actions = {
        plusOne() {
           /* ... */ 
        }
    }
}
```

After:
```javascript
import Component from '@ember/component';
import { action } from '@ember/object';

export default class Demo extends Component {
    doMath() {
      this.plusOne();
    }

    @action
    plusOne() {
       /* ... */ 
    }
}
```

or

#### For Classic Components with EmberObject.extend

Before:
```javascript
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
```javascript
import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  plusOne: action(function() {
      /* ... */ 
  }),
})
```

If `(action)` or `{{action}}` is passed a string, it's _possible_ that the referenced method is declared on the caller, and _not_ the immediate component -- that is, `(action)` and `{{action}}` bubble up the render tree from route templates -> controllers -> routes.

Note that `@action` is completely different from `(action)` or `{{action}}` (and is partly a motivator for deprecating `(action)` and `{{action}}`, to reduce ambiguity).

`@action` is binds the `this` on the method to the instance of the class. 


### Scenario: `action` is passed a function reference

Before:
```handlebars
<SomeComponent @update={{action this.plusOne}} />
```

After

```handlebars
<SomeComponent @update={{this.plusOne}} />
```

### Scenario: `action` is passed parameters

Before:
```handlebars
<SomeComponent @update={{action this.plus 1}} />
```

After:
```handlebars
<SomeComponent @update={{fn this.plus 1}} />
```

### Scenario: `action` is used with `mut` 

Before:
```handlebars
<SomeComponent @update={{action (mut @value.property}} />
```
After:
```javascript
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
```handlebars
{{! parent.hbs }}
<SomeComponent @update={{this.handleUpdate}} />
```

Related, [Combining function arguments with action functions](https://guides.emberjs.com/release/components/component-state-and-actions/#toc_combining-arguments-and-actions)


For more background, read the [RFC](https://github.com/emberjs/rfcs/pull/1006)
