import Route from '@ember/routing/route';
import config from 'deprecation-app/config/environment';
import { all } from 'rsvp';

export default Route.extend({
  model() {
    // Since we currently load the deprecation files in project/version buckets
    // (e.g. ember-data-2.x), we need to instead get ahold of all of the deprecations at once
    // so we can do more fine-grained filtering.

    // Read the `contentFolders` config used to serve all the markdown files as static JSON assets
    // and transform them in `store.query` param objects
    let contentFolders = config.contentFolders.map(folder => {
      let [ path, version ] = folder.split('/');

      return {
        path,
        version: `${version}.x`
      };
    });

    // Fire off queries for all the different project/version combinations.
    // These will be flattened and filtered in the controller.
    let queryObjectPromises = contentFolders.map(version => {
      return this.store.query('content', version);
    });

    return all(queryObjectPromises);
  }
});
