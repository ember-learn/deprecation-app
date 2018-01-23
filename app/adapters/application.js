import DS from 'ember-data';
import { get } from '@ember/object';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let url;

    if (requestType === 'queryRecord') {
      url = [modelName, `${query.path}.json`];
    } else if(requestType === 'query') {
      url = [modelName, `${query.path}-${query.version}.json`];
    } else {
      return this._super(...arguments);
    }

    let host = get(this, 'host');
    let prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  },
});
