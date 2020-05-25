import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ShowController extends Controller {
  displayMobileToc = false;

  @alias('model.query') content;

  @computed('content')
  get version() {
    let version = this.get('content.query.version');
    return version.match(/[0-9].*/)[0];
  }

  @computed('content')
  get project() {
    let projects = {
      'ember': 'Ember',
      'ember-cli': 'Ember CLI',
      'ember-data': 'Ember Data'
    }
    let project = this.get('content.query.path');
    return projects[project];
  }

  @computed('content')
  get renderIdOrUntil() {
    let version = this.get('content.query.version');
    let versionsWithoutId = ['v1.x'];
    if (versionsWithoutId.includes(version)) {
      return false;
    } else {
      return true;
    }
  }

  @action
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
