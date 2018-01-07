import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
    elementId: 'toc-list',
    tagName: 'ol',
    tocLevel: computed('level', function() {
      return `level-${get(this, 'level')}`;
    }),
    level: '1',
    sortDefinition: ['since'],
    sortedGroupedResults: computed.sort('groupedResults', 'sortDefinition')
});
