import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ShowController extends Controller {
  @tracked displayMobileToc = false;

  get content() {
    return this.model.query;
  }

  get version() {
    let version = this.content.query.version;
    return version.match(/[0-9].*/)[0];
  }

  get project() {
    let projects = {
      ember: 'Ember',
      'ember-cli': 'Ember CLI',
      'ember-data': 'Ember Data',
    };
    let project = this.content.query.path;
    return projects[project];
  }

  get renderIdOrUntil() {
    let version = this.content.query.version;
    let versionsWithoutId = ['v1.x'];

    return !versionsWithoutId.includes(version);
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
