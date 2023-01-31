import Route from '@ember/routing/route';
import processResults from '../utils/process-results';

export default class EmberRoute extends Route {
  controllerName = 'show';
  templateName = 'show';

  async model(params) {
    let query = await this.store.query('content', {
      path: 'ember',
      version: params.version,
    });

    return {
      query,
      sorted: processResults(query),
    };
  }
}
