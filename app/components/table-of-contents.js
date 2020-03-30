import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';


export default Component.extend({
    router: service(),
    // elementId: 'toc-list',
    tagName: 'ol',
    tocLevel: computed('level', function() {
      return `level-${this.level}`;
    }),
    level: '1',

    actions: {
      toggleToc() {
        this.toggleProperty('isToc');

        let anchor = event.target.href.split('/').lastObject.split('#').lastObject;
        later(this, function() {
          document.querySelector(`#${anchor}`).scrollIntoView();
        }, 200);
      }
    }
});
