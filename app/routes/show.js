import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ShowRoute extends Route {
  @service resultProcessor;

  async model(params) {
    return await this.store.query('content', {
      path: params.project,
      version: params.version,
    });
  }
}
