---
id: component-manager-string-lookup
title: Component Manager Factory Function
until: '4.0.0'
since: '3.8'
---

`setComponentManager` no longer takes a string to associate the custom component class and the component manager. Instead you must pass a factory function that produces an instance of the component manager.

Before:

```js
import { setComponentManager } from '@ember/component';
import BasicComponent from './component-class';

setComponentManager('basic', BasicComponent);
```

After:

```js
import { setComponentManager } from '@ember/component';
import BasicComponent from './component-class';
import BasicManager from './component-manager';

setComponentManager(owner => {
  return new BasicManager(owner)
}, BasicComponent);
```
