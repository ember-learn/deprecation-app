---
id: ember-component.send-action
title: Use closure actions instead of `sendAction`
until: '4.0.0'
since: '3.4'
---

In Ember 1.13 closure actions were introduced as a recommended replacement for `sendAction`.
With `sendAction` the developer passes the name of an action, and when `sendAction` is called Ember.js
would look up that action in the parent context and invoke it if present.
This had a handful of caveats:

- Since the action is not looked up until it's about to be invoked, it's easier for a typo in the action's name
to go undetected.

- Using `sendAction` you cannot receive the return value of the invoked action.

Closure actions solve those problems and on top are also more intuitive to use.

```js {data-filename=app/controllers/index.js}
export default Controller.extend({
  actions: {
    sendData(data) {
      fetch('/endpoint', { body: JSON.stringify(data) });
    }
  }
})
```

```handlebars {data-filename=app/templates/index.hbs}
{{my-component submit="sendData"}}
```

```js {data-filename=app/components/my-component.js}
this.sendAction('submit');
```

Should be changed to:

```js {data-filename=app/controllers/index.js}
export default Controller.extend({
  actions: {
    sendData(data) {
      fetch('/endpoint', { body: JSON.stringify(data) });
    }
  }
})
```

```handlebars {data-filename=app/templates/index.hbs}
{{my-component submit=(action "sendData")}}
```

```js {data-filename=app/components/my-component.js}
export default Component.extend({
  click() {
    this.submit();
  }
});
```

Note that with this approach the component MUST receive that `submit` property, while with `sendAction` if
it didn't it would silently do nothing.

If you don't want `submit` to be mandatory, you have to check for the presence of the action before calling it:

```js
export default Component.extend({
  click() {
    if (this.submit) {
      this.submit();
    }
  }
});
```

Another alternative is to define an empty action on the component, which helps clarify that the function
is not mandatory:

```js {data-filename=app/components/my-component.js}
export default Component.extend({
  submit: () => {},
  //...
  click() {
    this.submit();
  }
});
```

This deprecation also affects the built-in `{{input}}` helper that used to allow passing actions as
strings:

```handlebars
{{input enter="handleEnter"}}
```

Since this uses `sendAction` underneath it is also deprecated and must also be replaced by closure actions:

```handlebars
{{input enter=(action "handleEnter")}}
```

