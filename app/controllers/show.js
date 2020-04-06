import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import semverCompare from 'semver-compare';

export default Controller.extend({
  displayMobileToc: false,
  content: alias('model'),

  version: computed('content', function() {
    let version = this.get('content.query.version');
    return version.match(/[0-9].*/)[0];
  }),

  project: computed('content', function() {
    let projects = {
      'ember': 'Ember',
      'ember-cli': 'Ember CLI',
      'ember-data': 'Ember Data'
    }
    let project = this.get('content.query.path');
    return projects[project];
  }),

  renderIdOrUntil: computed('content', function() {
    let version = this.get('content.query.version');
    let versionsWithoutId = ['v1.x'];
    if (versionsWithoutId.includes(version)) {
      return false;
    } else {
      return true;
    }
  }),

  actions: {
    toggleToc() {
      this.toggleProperty('displayMobileToc');

      if (typeof document !== 'undefined') {
        if (this.displayMobileToc) document.querySelector('body').classList.add('no-scroll');
        if (!this.displayMobileToc) document.querySelector('body').classList.remove('no-scroll');
      }

      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }
});
