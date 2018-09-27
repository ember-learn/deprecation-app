import Route from '@ember/routing/route';
import config from 'deprecation-app/config/environment';
import { all } from 'rsvp';

export default Route.extend({
  model() {
    let contentFolders = config.contentFolders.map(folder => {
      let [ path, version ] = folder.split('/');

      return {
        path,
        version: `${version}.x`
      };
    });

    let queryObjectPromises = contentFolders.map(version => {
      return this.store.query('content', version);
    });

    return all(queryObjectPromises);
  }
});
