import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default class ApplicationRoute extends Route {
  @service search;

  async beforeModel() {
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
    this.search.algolia = module.default(
      algoliaId,
      algoliaKey
    );
  }
}
