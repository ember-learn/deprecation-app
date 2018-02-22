---
id: computed-properties-with-a-shared-getter-and-setter
title: Computed Properties With a Shared Getter And Setter
until: ''
since: '1.12'
---
Ember.js 1.12 introduces an improved syntax for computed properties with
a setter. Previously, computed properties with a setter implemented that
setter by inspecting the number of arguments passed to the computed
property's descriptor.

For example, this computed property splits a full name into two
parts when set:

```javascript
  fullName: Ember.computed("firstName", "lastName", function(key, newName) {
    if (arguments.length > 1) {
      var parts = newName.split(" ");
      this.setProperties({ firstName: parts[0], lastName: parts[1] });
      return newName;
    } else {
      return this.get("firstName") + " " + this.get("lastName");
    }
  });
```

These uses should be converted to use the new discrete getter and setter
syntax introduced in 1.12:

```javascript
  fullName: Ember.computed("firstName", "lastName", {
    get: function() {
      return this.get("firstName") + " " + this.get("lastName");
    },
    set: function(key, newName) {
      var parts = newName.split(" ");
      this.setProperties({ firstName: parts[0], lastName: parts[1] });
      return newName;
    }
  });
```

For further reading, review the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0011-improved-cp-syntax.md) describing this feature and the [pull request of the initial implementation](https://github.com/emberjs/ember.js/pull/9527).
