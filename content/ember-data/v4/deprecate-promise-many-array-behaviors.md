---
displayId: ember-data:deprecate-promise-many-array-behaviors
title: Deprecate Promise Many Array Behaviors
until: '5.0'
since: '4.7'
---

[RFC Documentation](https://rfcs.emberjs.com/id/0745-ember-data-deprecate-methods-on-promise-many-array)

This deprecation deprecates accessing values on the asynchronous proxy in favor of first "resolving" or "awaiting" the promise to retrieve a synchronous value.

Template iteration of the asynchronous value will still work and not trigger the deprecation, but all JS access should be avoided and HBS access for anything but `{{#each}}` should also be refactored.

Recommended approaches include using the addon `ember-promise-helpers`, using Ember's `resource` pattern (including potentially the addon `ember-data-resources`), resolving the value in routes/provider components, or using the references API.

An example of using the [hasMany](https://api.emberjs.com/ember-data/4.11/classes/Model/methods/hasMany?anchor=hasMany) [reference API](https://api.emberjs.com/ember-data/release/classes/HasManyReference):

```js
// get the synchronous "ManyArray" value for the asynchronous "friends" relationship.
// note, this will return `null` if the relationship has not been loaded yet
const value = person.hasMany('friends').value();

// to get just the list of related IDs
const ids = person.hasMany('friends').ids();
```

References participate in autotracking and getters/cached getters etc. which consume them will recompute if the value changes.
