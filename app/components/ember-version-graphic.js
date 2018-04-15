import Component from '@ember/component';

export default Component.extend({

  classNameBindings: ['mascot'],
  classNames: ['ember-version-graphic'],
  mascot: 'tomster',
  text: '0.x',

});
