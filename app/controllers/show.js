import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const PROJECTS = {
  ember: 'Ember',
  'ember-cli': 'Ember CLI',
  'ember-data': 'Ember Data',
};

export default class ShowController extends Controller {
  @tracked displayMobileToc = false;

  get content() {
    return this.model.query;
  }

  get version() {
    return this.content.query.version.match(/[0-9].*/)[0];
  }

  get project() {
    return PROJECTS[this.content.query.path];
  }

  @action
  toggleToc() {
    this.displayMobileToc = !this.displayMobileToc;

    if (typeof document !== 'undefined') {
      if (this.displayMobileToc) {
        document.querySelector('body').classList.add('no-scroll');
      } else {
        document.querySelector('body').classList.remove('no-scroll');
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }
}
