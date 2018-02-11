import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import semverCompare from 'semver-compare';

export default Controller.extend({
  content: alias('model'),
  init() {
    this._super(...arguments);
    this.sortDefinition = ['since'];
  },
  groupedResults: computed('content.[]', function() {
    let result = [];
    this.get('content').forEach(function(item) {
      let since = result.findBy('since', item.get('since'));
      if(!since) {
         result.pushObject(EmberObject.create({
            since: item.get('since'),
            contents: []
         }));
      }
      result.findBy('since', item.get('since')).get('contents').pushObject(item);
    });
    return result;
  }),
  sortedGroupedResults: computed('groupedResults', function() {
    let sorted = this.get('groupedResults').sort((a, b) => semverCompare(a.since, b.since));
    let upComingFeatures = sorted.shift();
    sorted.push(upComingFeatures);
    return sorted;
  })
});

