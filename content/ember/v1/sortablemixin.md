---
id: sortablemixin
title: SortableMixin
until: ''
since: '1.13'
---

Along with `Ember.ArrayController`, `Ember.SortableMixin` will be removed in Ember 2.0.

You can migrate away from using `Ember.SortableMixin` by using `Ember.computed.sort`. Using this example:

```javascript
const SongsController = Ember.ArrayController.extend(Ember.SortableMixin, {
  model: null,
  sortProperties: ['trackNumber'],
  sortAscending: false
});

let songsController = SongsController.create({ songs: songList });
```

You can transition to using `Ember.computed.sort` like this:

```javascript
const SongsController = Ember.Controller.extend({
  model: null,
  sortedSongs: Ember.computed.sort('model', 'songSorting'),
  songSorting: ['trackNumber:desc']
});

let songsController = SongsController.create({ songs: songList });
```

You can [read more about Ember.computed.sort in the Ember API documentation](http://emberjs.com/api/classes/Ember.computed.html#method_sort)

Legacy support of `Ember.SortableMixin` will be provided via the [ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers) addon.
