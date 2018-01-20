import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({
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
  sortedGroupedResults: computed.sort('groupedResults', 'sortDefinition'),
});
