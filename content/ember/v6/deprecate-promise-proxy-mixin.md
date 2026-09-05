---
title: Deprecation of PromiseProxyMixin
until: 7.0.0
since: 6.5.0
---

`PromiseProxyMixin` is deprecated. You should use native `async/await` and Promises directly to manage asynchronous operations and their state.

`PromiseProxyMixin` was used to create proxy objects that represented the eventual result of a promise, with properties to track the promise's lifecycle (`isPending`, `isFulfilled`, etc.).

### Replacing `PromiseProxyMixin`

The modern approach is to use a class (like a component or service) to manage the state of the asynchronous operation.

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

const promise = new Promise(resolve => resolve({ value: 42 }));
const proxy = PromiseObject.create({ promise });

// In a template, you might have:
// {{#if proxy.isPending}}
//   Loading...
// {{else if proxy.isFulfilled}}
//   Value: {{proxy.content.value}}
// {{else if proxy.isRejected}}
//   Error: {{proxy.reason}}
// {{/if}}
```

After (using `async/await` and tracked properties in a component):

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class MyComponent extends Component {
  @task
  *loadData() {
    try {
      const promise = new Promise(resolve => resolve({ value: 42 }));
      const content = yield promise;
      return content;
    } catch (e) {
      // ember-concurrency provides its own error state
      throw e;
    }
  }

  get lastTask() {
    return this.loadData.last;
  }

  <template>
    {{#if this.lastTask.isRunning}}
      Loading...
    {{else if this.lastTask.isSuccessful}}
      Value: {{this.lastTask.value}}
    {{else if this.lastTask.error}}
      Error: {{this.lastTask.error}}
    {{/if}}
  </template>
}
```

For simpler cases where you don't need the full power of a library like `ember-concurrency`, you can manage the state manually with `@tracked` properties:

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MyComponent extends Component {
  @tracked isLoading = true;
  @tracked error = null;
  @tracked content = null;

  constructor() {
    super(...arguments);
    this.loadData();
  }

  async loadData() {
    try {
      this.isLoading = true;
      const promise = new Promise(resolve => resolve({ value: 42 }));
      this.content = await promise;
    } catch (e) {
      this.error = e;
    } finally {
      this.isLoading = false;
    }
  }

  <template>
    {{#if this.isLoading}}
      Loading...
    {{else if this.content}}
      Value: {{this.content.value}}
    {{else if this.error}}
      Error: {{this.error}}
    {{/if}}
  </template>
}
```

Using a library like [ember-concurrency](https://ember-concurrency.com/docs/introduction) is highly recommended for managing concurrent asynchronous user-initiated tasks in Ember applications, as it provides robust solutions for handling loading/error states, cancellation, and more.

For data loading specifically, you may also want to consider using [WarpDrive](https://warp-drive.io) (formerly Ember Data) which provides a number of utilities around tracking for data.

## Migration Strategy

When migrating from `PromiseProxyMixin`, consider:

1. **First choice**: Use `ember-concurrency` for user-initiated async tasks (button clicks, form submissions)
2. **For data loading**: Consider `getRequestState` from warp-drive for request state management
3. **For simple cases**: Use `@tracked` properties with `async/await` and manual state management

The modern Ember approach uses explicit async/await patterns and proper state management libraries rather than proxy-based promise wrappers.
