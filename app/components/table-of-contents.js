import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
    init() {
      this._super(...arguments);
      this.sortDefinition = ['since'];
    },
    elementId: 'toc-list',
    tagName: 'ol',
    tocLevel: computed('level', function() {
      return `level-${get(this, 'level')}`;
    }),
    level: '1',
    sortedGroupedResults: computed.sort('groupedResults', 'sortDefinition')
});
