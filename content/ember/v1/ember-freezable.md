---
id: ember-freezable
title: Ember Freezable
until: ''
since: '1.13'
---
The Freezable Mixin has been deprecated because the spec has been added to
the javascript core.

```javascript
Contact = Ember.Object.extend(Ember.Freezable, {
  firstName: null,
  lastName: null,

  // swaps the names
  swapNames: function() {
    if (this.get('isFrozen')) throw Ember.FROZEN_ERROR;
    var tmp = this.get('firstName');
    this.set('firstName', this.get('lastName'));
    this.set('lastName', tmp);
    return this;
  }

});

c = Contact.create({ firstName: "John", lastName: "Doe" });
c.swapNames();  // returns c
c.freeze();
c.swapNames();  // EXCEPTION
```

Replace code above with this:

```javascript
Contact = Ember.Object.extend({
  firstName: null,
  lastName: null,

  // swaps the names
  swapNames: function() {
    if (Object.isFrozen(this)) throw Ember.FROZEN_ERROR;
    var tmp = this.get('firstName');
    this.set('firstName', this.get('lastName'));
    this.set('lastName', tmp);
    return this;
  }

});

c = Contact.create({ firstName: "John", lastName: "Doe" });
c.swapNames();  // returns c
Object.freeze(c);
c.swapNames();  // EXCEPTION
```
