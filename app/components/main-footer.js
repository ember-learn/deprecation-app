import Component from '@ember/component';

export default Component.extend({
  classNames: ['container'],
  currentYear: new Date().getFullYear()
});
