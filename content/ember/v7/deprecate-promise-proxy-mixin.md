---
title: 'PromiseProxyMixin'
until: 8.0.0
since: 7.4.0
---

`PromiseProxyMixin` from `@ember/object/promise-proxy-mixin` is deprecated. Use `async/await` with tracked state instead.

Before:

```gjs
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

const proxy = PromiseObject.create({
  promise: fetchSettings(),
});

<template>
  {{#if proxy.isPending}}
    Loading...
  {{else if proxy.isFulfilled}}
    Value: {{proxy.content.value}}
  {{else if proxy.isRejected}}
    Error: {{proxy.reason}}
  {{/if}}
</template>
```

### After: tracked properties and `async/await`

Manage the state of the asynchronous operation in the class that needs it:

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Settings extends Component {
  @tracked isLoading = true;
  @tracked error = null;
  @tracked content = null;

  constructor() {
    super(...arguments);
    this.loadData();
  }

  async loadData() {
    try {
      this.content = await fetchSettings();
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }

  <template>
    {{#if this.isLoading}}
      Loading...
    {{else if this.error}}
      Error: {{this.error}}
    {{else}}
      Value: {{this.content.value}}
    {{/if}}
  </template>
}
```

### After: an ember-concurrency task

For user-initiated or cancellable work, [ember-concurrency](https://ember-concurrency.com/docs/introduction) tasks expose the same lifecycle state that `PromiseProxyMixin` provided, along with cancellation and concurrency control:

```gjs
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

export default class Settings extends Component {
  load = () => void this.loadData.perform();

  loadData = task(async () => {
    return await fetchSettings();
  });

  <template>
    <button {{on "click" this.load}}>Load</button>

    {{#if this.loadData.isRunning}}
      Loading...
    {{else if this.loadData.last.error}}
      Error: {{this.loadData.last.error}}
    {{else if this.loadData.last.isSuccessful}}
      Value: {{this.loadData.last.value}}
    {{/if}}
  </template>
}
```

### Migration strategy

Pick a replacement based on the use case:

1. For user-initiated async tasks (button clicks, form submissions), use ember-concurrency.
2. For data loading, consider [WarpDrive](https://warp-drive.io) (formerly Ember Data), whose `getRequestState` tracks request state for you (see also: [`getPromiseState`](https://reactive.nullvoxpopuli.com/functions/get-promise-state.getPromiseState.html) if not using WarpDrive).

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
