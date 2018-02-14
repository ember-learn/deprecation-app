import Component from '@ember/component';

export default Component.extend({
  tagName: 'footer',
  classNames: ['footer'],
  currentYear: new Date().getFullYear()
});
