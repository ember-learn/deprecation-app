import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({
  groupedResults: computed('sortedResults.[]', function() {
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
  sortDefinition: ['since'],
  sortedResults: computed.sort('content.[]', 'sortDefinition')
});
