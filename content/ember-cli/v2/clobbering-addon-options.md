---
id: clobbering-addon-options
title: Clobbering Addon#options
since: '2.12.0'
---

Clobbering `this.options` within an addon has been deprecated. If you would like to use `this.options`
for internal options within your addon, you must preserve the intitial options object that is present.

Instead of doing this:

```javascript
included() {
  this.options = { my-addons: { special: { options: 'here' } } };
}
```

You should do the following:

```javascript
included() {
  this.options = this.options || {};
  this.options['my-addons'] = { special: { options: 'here' } };
}
```
