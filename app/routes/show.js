import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp'

export default class ShowRoute extends Route {
  @service resultProcessor;

  async model(params) {
    let query = await this.store.query('content', {
      path: params.project,
      version: params.version,
    });

    let sorted = await this.resultProcessor.processResults.perform(query);

    return RSVP.hash({
      query,
      sorted
    });
  }
}
