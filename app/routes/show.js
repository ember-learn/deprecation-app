import Route from '@ember/routing/route';
import processResults from '../utils/process-results';

export default class ShowRoute extends Route {
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
