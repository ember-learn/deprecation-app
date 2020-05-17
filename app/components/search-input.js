import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { action, computed, set } from '@ember/object';
import { later } from '@ember/runloop';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp';

const SEARCH_DEBOUNCE_PERIOD = 300;

export default class SearchInput extends Component {
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

  async setupSearch() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const { algoliaId, algoliaKey } = config['algolia'];
    let algoliasearch;

    /**
     * In order to prevent algoliasearch from crashing, we must define process on window.
     * https://stackoverflow.com/questions/50313745/angular-6-process-is-not-defined-when-trying-to-serve-application
     */
    window.process = {
      env: { DEBUG: undefined }
    };

    try {
      algoliasearch = await import('algoliasearch');
    } catch(e) {
      return;
    }

    this.client = algoliasearch.default(algoliaId, algoliaKey);
    this.index = this.client.initIndex('ember-deprecations');
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

  @task({ restartable: true })
  * search(query) {
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
