---
id: events.remove-all-listeners
title: Remove All Listeners/Observers
until: '3.9.0'
since: '3.6'
---

When using both the `removeListener` and `removeObserver` methods, users can
omit the final string or method argument to trigger an undocumented codepath
that will remove _all_ event listeners/observers for the given key:

```js
let foo = {
  method1() {}
  method2() {}
};

addListener(foo, 'init', 'method1');
addListener(foo, 'init', 'method2');

removeListener(foo, 'init');
```

This functionality will be removed since it is uncommonly used, undocumented,
and adds a fair amount of complexity to a critical path. To update, users should
remove each listener individually:

```js
let foo = {
  method1() {}
  method2() {}
};

addListener(foo, 'init', 'method1');
addListener(foo, 'init', 'method2');

removeListener(foo, 'init', 'method1');
removeListener(foo, 'init', 'method2');
```
