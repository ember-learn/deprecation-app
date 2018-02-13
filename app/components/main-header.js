import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  actions: {
    focus(id) {
      later(this, () => {
        document.getElementById(id).focus();
      }, 500)
    }
  }
});
