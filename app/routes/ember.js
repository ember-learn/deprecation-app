import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp'

export default class EmberRoute extends Route {
  @service resultProcessor;

  controllerName = 'show';
  templateName = 'show';

  async model(params) {
    let query = await this.store.query('content', {
      path: 'ember',
      version: params.version,
    })

    let sorted = await this.resultProcessor.processResults.perform(query);

    return RSVP.hash({
      query,
      sorted
    });
  }
}
