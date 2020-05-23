import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class SearchInput extends Component {
  @service('search') searchService;

  _resultTetherConstraints = Object.freeze([
    {
      to: 'window',
      pin: ['left','right']
    }
  ]);

  constructor() {
    super(...arguments);

    this.setup();
  }

  @action
  async setup() {
    await this.searchService.setupSearch();

    later(this, function() {
      if (typeof document !== 'undefined') {
        document.addEventListener('click', (event) => {
          if (!event.target.closest('.ds-dropdown-results')) {
            this.searchService.searchResults = null;
          }
        }, false);
      }
    }, 200);
  }

  @action
  onfocus() {
    set(this, '_focused', true);
  }

  @action
  onblur() {
    later(this, function () {
      set(this, '_focused', false);
    }, 200);
  }
}
