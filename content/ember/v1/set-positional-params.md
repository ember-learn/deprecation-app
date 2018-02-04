---
id: set-code-positionalparams-code-as-a-static-property-on-the-class
title: Set positionalParams as a static property on the class
until: ''
since: '1.13'
---

Setting `positionalParams` within `.extend` is deprecated. It has to be set as a static property on the class itself (`.reopenClass`).

Please change this:

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  positionalParams: [ 'a', 'b' ]
});
```

to this:

```javascript
import Ember from 'ember';

var Thing = Ember.Component.extend();
Thing.reopenClass({
  positionalParams: [ 'a', 'b' ]
});

```