---
title: 3.4 Component Manager Capabilities
until: 4.0.0
since: 3.26.0
displayId: manager-capabilities.components-3-4
---


Any component managers using the `3.4` capabilities should update to the most
recent component capabilities that are available, currently `3.13`. In `3.13`,
the only major change is that update hooks are no longer called by default. If
you need update hooks, use the `updateHook` capability:

```js
capabilities({
  updateHook: true,
});
```
