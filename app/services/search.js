import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { denodeify } from 'rsvp';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

const SEARCH_DEBOUNCE_PERIOD = 300;

export default class SearchService extends Service {
  @tracked algolia = null;
  @tracked index = null;
  @tracked searchFunction = null;
  @tracked searchResults = null;

  async setupSearch() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const { algoliaId, algoliaKey } = config['algolia'];

    /**
     * In order to prevent algoliasearch from crashing, we must define process on window.
     * https://stackoverflow.com/questions/50313745/angular-6-process-is-not-defined-when-trying-to-serve-application
     */
    window.process = {
      env: { DEBUG: undefined }
    };
    let module = await import('algoliasearch');
    this.algolia = module.default(
      algoliaId,
      algoliaKey
    );

    this.index = this.algolia.initIndex('ember-deprecations');
    this.searchFunction = denodeify(this.index.search.bind(this.index));
  }

  @task()
  search = function*(query) {
    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    if(!query) {
      return null;
    }

    const searchObj = {
      hitsPerPage: 15,
      query
    };

    let results = yield this.searchFunction(searchObj);

    this.searchResults = results;
  }
}
