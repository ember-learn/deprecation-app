import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { later } from '@ember/runloop';
import algoliasearch from 'algoliasearch';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp';


const SEARCH_DEBOUNCE_PERIOD = 300;

export default Component.extend({
  classNames: ['search-input'],

  _resultTetherConstraints: Object.freeze([
    {
      to: 'window',
      pin: ['left','right']
    }
  ]),

  init() {
    this._super(...arguments);
    const config = getOwner(this).resolveRegistration('config:environment');

    const { algoliaId, algoliaKey } = config['algolia'];

    this.client = algoliasearch(algoliaId, algoliaKey);
    this.index = this.client.initIndex('ember-deprecations');
    this.searchFunction = denodeify(this.index.search.bind(this.index));
  },

  pageIndex: computed('page.pages.[]', function() {
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
  }),

  search: task(function * (query) {
    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    if(!query) {
      return set(this, 'response', null);
    }

    const searchObj = {
      hitsPerPage: 15,
    };

    let res = yield this.searchFunction('query', searchObj);

    return set(this, 'response', res);
  }).restartable(),

  actions: {
    oninput(value) {
      set(this, 'value', value);
      if(value) {
        this.search.perform(value);
      }
    },

    onfocus() {
      set(this, '_focused', true);
    },

    onblur() {
      later(this, function () {
        set(this, '_focused', false);
      }, 200);
    }

  }
});
