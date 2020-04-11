import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({
    router: service(),
    tocLevel: computed('level', function() {
      return `level-${this.level}`;
    }),
    level: '1',

    actions: {
      navigateToLink(event) {
        this.toggleProperty('displayMobileToc');

        let anchor = event.target.href.split('/').lastObject.split('#').lastObject;

        later(this, function() {
          if (typeof document !== 'undefined') {
            if (this.displayMobileToc) document.querySelector('body').classList.add('no-scroll');
            if (!this.displayMobileToc) document.querySelector('body').classList.remove('no-scroll');
            window.location.hash = anchor;
            document.querySelector(`#${anchor}`).scrollIntoView();
          }
        }, 200);
      }
    }
});
