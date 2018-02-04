---
id: ember-reducecomputed-ember-arraycomputed
title: Ember.ReduceComputedProperty / Ember.ArrayComputedProperty
until: ''
since: '1.13'
---

In addition to `Ember.ReduceComputed` and `Ember.ArrayComputed` you were able to add a property function call, making use of
the ReduceComputedProperty and ArrayComputedProperty classes.
This usage is also deprecated.
For an example, consider a counter component that displays a total sum of values in an array.
Using `Ember.ReduceComputedProperty` would show the following:

```javascript
totalCount: Ember.reduceComputed({
  initialValue = 0;
  addedItem(totalValue, newValue) {
    return totalValue + newValue;
  },
  removedItem(totalValue, newValue) {
    return totalValue - newValue;
  }
}).property('values')
```

Now that these APIs are deprecated, use the native JavaScript reduce along with the [Ember.computed family of functions](http://emberjs.com/api/classes/Ember.computed.html):

```javascript
totalCount: Ember.computed('values.[]', function() {
  return this.get('values').reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  })
})
```