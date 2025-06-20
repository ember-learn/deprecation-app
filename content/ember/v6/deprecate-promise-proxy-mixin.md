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

```javascript
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
}
```

And in your template:

```handlebars
{{#let this.loadData.last as |taskInstance|}}
  {{#if taskInstance.isRunning}}
    Loading...
  {{else if taskInstance.isSuccessful}}
    Value: {{taskInstance.value.value}}
  {{else if taskInstance.error}}
    Error: {{taskInstance.error}}
  {{/if}}
{{/let}}
```

For simpler cases where you don't need the full power of a library like `ember-concurrency`, you can manage the state manually with `@tracked` properties:

```javascript
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
}
```

With a corresponding template:

```handlebars
{{#if this.isLoading}}
  Loading...
{{else if this.content}}
  Value: {{this.content.value}}
{{else if this.error}}
  Error: {{this.error}}
{{/if}}
```

Using a library like [ember-concurrency](https://ember-concurrency.com/docs/introduction) is highly recommended for managing asynchronous tasks in Ember applications, as it provides robust solutions for handling loading/error states, cancellation, and more.
