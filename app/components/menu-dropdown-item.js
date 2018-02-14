import Component from '@ember/component';
import { get } from '@ember/object';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'li',
  didRender() {
    next(this, function() {
      if (get(this, 'autoFocus')) {
        this.$('a').focus();
      }
    })
  }
});
