import Route from '@ember/routing/route';

export default class IdPRoute extends Route {
  model(params) {
    return this.store.findRecord('content', params.id);
  }
}
