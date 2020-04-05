import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({
    router: service(),
    tagName: 'ol',
    tocLevel: computed('level', function() {
      return `level-${this.level}`;
    }),
    level: '1',

    actions: {
      toggleToc() {
        this.toggleProperty('displayMobileToc');

        let anchor = event.target.href.split('/').lastObject.split('#').lastObject;
        later(this, function() {
          if (typeof document !== 'undefined') {
            document.querySelector(`#${anchor}`).scrollIntoView();
          }
        }, 200);
      }
    }
});
