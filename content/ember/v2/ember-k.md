---
id: code-ember-k-code
title: 'Ember.K'
until: '3.0.0'
since: '2.12'
---

Using `Ember.K` is deprecated in favor of defining a function inline. See [RFC #178](https://github.com/emberjs/rfcs/blob/master/text/0178-deprecate-ember-k.md).

You can use the addon [ember-watson](https://github.com/abuiles/ember-watson#remove-usages-of-emberk) to automate the removal of `Ember.K` from your application.

Example object:

```javascript
Ember.Object.extend({
  someFun: Ember.K
});
```

Command:

```sh
ember watson:remove-ember-k --empty
```

The result will be:

```javascript
Ember.Object.extend({
  someFun() {}
});
```

If for some reason your app depends on the ability to chain `Ember.K` invocations, you can use the flag `--return-this`. It will replace `Ember.K` with a function that returns `this`.
