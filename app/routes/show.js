import Route from '@ember/routing/route';

export default class ShowRoute extends Route {
  async model(params) {
    return await this.store.query('content', {
      path: params.project,
      version: params.version,
    });
  }
}
