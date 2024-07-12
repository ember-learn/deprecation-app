import Route from '@ember/routing/route';
import processResults from '../utils/process-results';
import { inject as service } from '@ember/service';

export default class ShowRoute extends Route {
  @service store;

  async model(params) {
    let query = await this.store.query('content', {
      path: params.project,
      version: params.version,
    });

    return {
      query,
      sorted: processResults(query),
    };
  }
}
