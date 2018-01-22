import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  idForTitle: computed('model.title', function() {
    return `toc_${this.get('model.title')}`;
  }),
  idForUntil: computed('model.until', function() {
    return `toc_until-${this.get('model.until')}`;
  }),
  idForDeprecation: computed('model.id', function() {
    let idString = this.get('model.id');
    idString = idString.replace(/\s+/g, '');
    let replacedIdString = idString.replace(/\.|,/g, '-');
    return `toc_id-${replacedIdString}`;
  })
});
