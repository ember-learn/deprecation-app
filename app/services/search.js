import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import search, { queryTerms } from '../utils/search';

const SEARCH_DEBOUNCE_PERIOD = 150;

export default class SearchService extends Service {
  @tracked searchResults = null;
  @tracked searchTerms = [];

  #index = null;

  @action
  loadIndex() {
    if (!this.#index) {
      let { rootURL } =
        getOwner(this).resolveRegistration('config:environment');

      this.#index = fetch(`${rootURL}search-index.json`)
        .then((response) => response.json())
        .catch((error) => {
          this.#index = null;
          throw error;
        });
    }

    return this.#index;
  }

  @restartableTask
  search = function* (query) {
    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    if (!query?.trim()) {
      this.searchResults = null;
      return;
    }

    let entries = yield this.loadIndex();

    this.searchTerms = queryTerms(query);
    this.searchResults = search(entries, query);
  };
}
