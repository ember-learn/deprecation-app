import DS from 'ember-data';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import config from '../config/environment';


export default DS.JSONAPIAdapter.extend({

  fastboot: service(),

  /**
   *  FastBoot shouldn't know the host since we use prember
   *  & it can't find the resources at the API host during build time.
   */
  host: computed('fastboot.isFastBoot', function() {
    let isFastBoot = get(this, 'fastboot.isFastBoot');
    return isFastBoot ? '' : config.apiHost;
  }),

  buildURL(modelName, id, snapshot, requestType, query) {
    let url;

    if (requestType === 'queryRecord') {
      url = [modelName, `${query.path}.json`];
    } else if(requestType === 'query') {
      url = [modelName, `${query.path}-${query.version}.json`];
    } else {
      return this._super(...arguments);
    }

    let host = this.host;
    let prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  },
});
