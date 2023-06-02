---
id: arguments-in-component-lifecycle-hooks
title: Arguments in Component Lifecycle Hooks
until: '2.13.0'
since: '2.12'
---

Previously, it was possible for component lifecycle hooks `didInitAttrs`, `didReceiveAttrs`, and `didUpdateAttrs` to receive arguments. However, this functionality was part of private API. Using the arguments is harmful to component performance, so they will trigger a deprecation. Alternative approaches for all three hooks are below:

#### `didInitAttrs` arguments

Since this lifecycle hook is [already deprecated](http://emberjs.com/deprecations/v2.x/#toc_ember-component-didinitattrs), we suggest taking this chance to address two deprecations at the same time.

Imagine you have a component that stores a timestamp when it is initialized.

Before:

```javascript
Ember.Component.extend({
  didInitAttrs({ attrs }) {
    this.set('initialTimestamp', attrs.timestamp);
  }
});
```

After:

```javascript
Ember.Component.extend({
  init() {
    this._super(...arguments);

    this.set('initialTimestamp', this.get('timestamp'));
  }
});
```
#### `didReceiveAttrs` and `didUpdateAttrs` arguments

This example for `didReceiveAttrs` below also applies to `didUpdateAttrs`, a similar hook that only runs on re-renders. Let's say you want to animate a thermometer widget showing the change between today's high and low temperatures.

Before:

```javascript
Ember.Component.extend({
  didReceiveAttrs({ oldAttrs, newAttrs }) {
    if (oldAttrs.temp !== newAttrs.temp) {
      this.thermometer.move({ from: oldAttrs.temp, to: newAttrs.temp });
    }
  }
});
```

After:

```javascript
Ember.Component.extend({
  didReceiveAttrs() {
    let oldTemp = this.get('_oldTemp');
    let newTemp = this.get('temp');

    if (oldTemp && oldTemp !== newTemp) {
      this.thermometer.move({ from: oldTemp, to: newTemp });
    }
    this.set('_oldTemp', newTemp);
  }
});
```

Additionally, [ember-diff-attrs](https://github.com/workmanw/ember-diff-attrs) is an addon that spun out of the discussions on the RFC. It provides a dry way to track attribute changes for this lifecycle hook.
