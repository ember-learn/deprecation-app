import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({
  router: service(),

  tocLevel: computed('level', function() {
    return `level-${this.level}`;
  }),
  level: '1',

  id: computed('result.since', function() {

    let dasherizedSince = get(this, 'result.since').replace(/\./g,'-');

    return `toggle-dep-menu-${dasherizedSince}`;
  }),

  init() {
    this._super(...arguments);

    if (this.displayMobileToc) {
      set(this, 'open', this.displayMobileToc);
    }
  },

  actions: {
    navigateToLink() {
      this.toggleProperty('displayMobileToc');

      later(this, function() {
        if (typeof document !== 'undefined') {
          if (this.displayMobileToc) document.querySelector('body').classList.add('no-scroll');
          if (!this.displayMobileToc) document.querySelector('body').classList.remove('no-scroll');
        }
      }, 200);
    }
  }
});
