---
id: ember-metal.deprecate-propertyWillChange, ember-metal.deprecate-propertyDidChange
title: Use notifyPropertyChange instead of propertyWillChange and propertyDidChange
until: '3.5.0'
since: '3.1'
---

Ember.Application#registry / Ember.ApplicationInstance#registry

The private APIs `propertyWillChange` and `propertyDidChange` will be removed after the first
LTS of the 3.x cycle. You should remove any calls to `propertyWillChange` and replace any
calls to `propertyDidChange` with `notifyPropertyChange`. This applies to both the Ember global
version and the EmberObject method version.

For example, the following:

```javascript
Ember.propertyWillChange(object, 'someProperty');
doStuff(object);
Ember.propertyDidChange(object, 'someProperty');

object.propertyWillChange('someProperty');
doStuff(object);
object.propertyDidChange('someProperty');
```

Should be changed to:

```javascript
doStuff(object);
Ember.notifyPropertyChange(object, 'someProperty');

doStuff(object);
object.notifyPropertyChange('someProperty');
```
