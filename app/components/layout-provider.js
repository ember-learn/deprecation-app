import Component from '@ember/component';
import EmberObject, { set } from '@ember/object';
import semverCompare from 'semver-compare';
import { task } from 'ember-concurrency'

export default Component.extend({
  sortedGroupedResults: null,

  didInsertElement() {
    this._super(...arguments);

    this.processResults.perform();
  },

  processResults: task(function*() {
    let result = [];
    for (const item of this.content.toArray()) {
      let since = result.findBy('since', item.get('since'));
      if(!since) {
         result.pushObject(EmberObject.create({
            since: item.get('since'),
            contents: []
         }));
      }
      yield result.findBy('since', item.get('since')).get('contents').pushObject(item);
    }

    let sorted = result.sort((a, b) => semverCompare(a.since, b.since));
    let match = sorted[0].since.match(/Upcoming Features/)
    if (match && match[0] == "Upcoming Features") {
      let upComingFeatures = sorted.shift();
      sorted.push(upComingFeatures);
    }

    set(this, 'sortedGroupedResults', sorted);
  }),
});