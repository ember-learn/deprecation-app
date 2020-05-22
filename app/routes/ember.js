import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EmberRoute extends Route {
  @service resultProcessor;

  controllerName = 'show';
  templateName = 'show';

  async model(params) {
    return await this.store.query('content', {
      path: 'ember',
      version: params.version,
    });
  }
}
