import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['ds-suggestion'],
  project: computed('result.path', function() {
    return this.result.path.split('/')[0]
  }),
  version: computed('result.path', function() {
    return this.result.path.split('/')[1]
  }),

  sectionTitle: computed('result.path', function() {
    return this.result.path;
  }),

  remainingHeadings: computed('result._highlightResult.headings.[]', function() {
     let returnedRemainingHeadings = this.result._highlightResult.headings.slice(1);
     let lastHeading = returnedRemainingHeadings[returnedRemainingHeadings.length-1].value;
     if(lastHeading.indexOf('id:') === 0) {
      returnedRemainingHeadings.splice(-1, 1);
     }
     return returnedRemainingHeadings;
  })
});
