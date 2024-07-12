import Route from '@ember/routing/route';
import processResults from '../utils/process-results';
import { inject as service } from '@ember/service';

export default class EmberRoute extends Route {
  @service store;

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
