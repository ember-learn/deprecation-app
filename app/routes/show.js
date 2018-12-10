import Route from '@ember/routing/route';

export default class Show extends Route {
  model(params) {
    return this.store.query('content', {
      path: params.project,
      version: params.version
    });
  }
}
