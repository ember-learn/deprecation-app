import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IdPRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('content', params.id);
  }
}
