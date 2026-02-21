---
title: Reopening Classic Component Super Class
until: 4.0.0
since: 3.27.0
displayId: ember.component.reopen
---


Reopening the `Ember.Component` super class has far-reaching consequences. For example, it may unexpectedly break addons that are not expecting the changes.

To respond to DOM events globally, consider instead using global event listeners.

Before:
``` javascript
import Component from '@ember/component';

Component.reopen({
  click() {
    console.log('Clicked on a classic component');
  }
});
```


After:
``` javascript
document.addEventListener('click', event => {
  if (event.target.classList.contains('my-component')) {
    console.log('Clicked on a classic component');
  }
});
```


Alternatively, you can create a custom subclass of `Ember.Component` with the behavior you want and subclass from that component in your app. That way, only those components which explicitly opted into the changes will be affected.

Before:
``` javascript
import Component from '@ember/component';

Component.reopen({
  attributeBindings: ['metadata:data-my-metadata'],
  metadata: ''
});
```


After:
``` javascript
// app/components/base.js
import Component from '@ember/component';

// Subclass from this in your app, instead of subclassing from Ember.Component
export default Component.extend({
  attributeBindings: ['metadata:data-my-metadata'],
  metadata: ''
});
```
