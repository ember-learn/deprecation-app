import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    elementId: 'toc-list',
    tagName: 'ol',
    tocLevel: computed('level', function() {
      return `level-${this.level}`;
    }),
    level: '1',
});
