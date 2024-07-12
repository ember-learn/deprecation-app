---
title: Mutation After Consumption
until: 4.0.0
since: Glimmer Internals
displayId: autotracking.mutation-after-consumption
---


Older versions of Ember failed to detect errors in certain cases where an autotracked property was both read from and written to during rendering. This was buggy and could cause infinite loops, as with all such combined read-write operations during rendering. A common case was reading from and writing to a `@tracked` property in a `constructor`, usually for making a local copy of a value from `args`:

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Example extends Component {
  @tracked aLocalCopy;

  constructor() {
    super(...arguments);
    if (this.args.aLocalCopy !== this.args.inboundValue) {
      this.args.aLocalCopy = this.args.inboundValue;
    }
  }

  @action updateLocal(newValue) {
    this.aLocalCopy = newValue;
  }
}
```

(Note that this behavior also did not have the intended effect: `constructor`s only run once for any given component instance!)

The fix is usually to *derive* state instead. If you need to allow local state to diverge, you can do that with a *separate* tracked property. For example:

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Example extends Component {
  @tracked aLocalCopy;

  get localData() {
    return this.aLocalCopy ?? this.args.inboundValue;
  }

  @action updateLocal(newValue) {
    this.aLocalCopy = newValue;
  }
}
```
