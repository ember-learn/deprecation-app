import Component from '@glimmer/component';
import { action, computed, set } from '@ember/object';
import { later } from '@ember/runloop';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp';
import { inject as service } from '@ember/service';

const SEARCH_DEBOUNCE_PERIOD = 300;

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

    this.setupSearch();
  }

  @action
  async setupSearch() {
    this.index = this.searchService.algolia.initIndex('ember-deprecations');
    this.searchFunction = denodeify(this.index.search.bind(this.index));

    later(this, function() {
      if (typeof document !== 'undefined') {
        document.addEventListener('click', (event) => {
          if (!event.target.closest('.ds-dropdown-results')) {
            set(this, 'response', null);
          }
        }, false);
      }
    }, 200);
  }

  @computed('page.pages.[]')
  get pageIndex() {
    let pages = this.page.pages.map((section) => {
      return section.pages.map(page => {
          return {
            section: section.title,
            page: page.title,
            fullTitle: `${section.title} > ${page.title}`,
            url: page.url.replace(/\/index$/, '')
          }
      })
    });

    return pages.reduce((a, b) => a.concat(b), []);
  }

  @task()
  search = function*(query) {
    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    if(!query) {
      return set(this, 'response', null);
    }

    const searchObj = {
      hitsPerPage: 15,
      query
    };

    let res = yield this.searchFunction(searchObj);

    return set(this, 'response', res);
  }

  @action
  oninput(value) {
    set(this, 'value', value);
    if(value) {
      this.search.perform(value);
    }
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
