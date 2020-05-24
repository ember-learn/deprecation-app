import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action, computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class TocSection extends Component {
  @service router;

  @tracked level = '1';

  @computed('level')
  get tocLevel() {
    return `level-${this.level}`;
  }

  @computed('result.since')
  get id() {
    let dasherizedSince = get(this, 'result.since').replace(/\./g,'-');

    return `toggle-dep-menu-${dasherizedSince}`;
  }

  constructor() {
    super(...arguments);

    if (this.displayMobileToc) {
      set(this, 'open', this.displayMobileToc);
    }
  }

  @action
  navigateToLink() {
    this.toggleProperty('displayMobileToc');

    let anchor = event.target.href.split('/').lastObject.split('#').lastObject;

    later(this, function() {
      if (typeof document !== 'undefined') {
        if (this.displayMobileToc) document.querySelector('body').classList.add('no-scroll');
        if (!this.displayMobileToc) document.querySelector('body').classList.remove('no-scroll');
        window.location.hash = anchor;
        document.querySelector(`#${anchor}`).scrollIntoView();
      }
    }, 200);
  }
}
