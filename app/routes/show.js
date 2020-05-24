import Route from '@ember/routing/route';

export default class ShowRoute extends Route {
  model(params) {
    return this.store.query('content', {
      path: params.project,
      version: params.version,
    });
  }
}
