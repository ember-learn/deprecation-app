/* eslint-disable ember/no-classic-components */
/* eslint-disable ember/require-tagless-components */
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class TocSection extends Component {
  @service router;

  @tracked level = '1';

  get tocLevel() {
    return `level-${this.level}`;
  }

  get id() {
    let dasherizedSince = this.result.since.replace(/\./g, '-');

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
    set(this, 'displayMobileToc', !this.displayMobileToc);

    later(
      this,
      function () {
        if (typeof document !== 'undefined') {
          if (this.displayMobileToc)
            document.querySelector('body').classList.add('no-scroll');
          if (!this.displayMobileToc)
            document.querySelector('body').classList.remove('no-scroll');
        }
      },
      200
    );
  }
}

/* eslint-enable ember/no-classic-components */
/* eslint-enable ember/require-tagless-components */
