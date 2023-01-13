import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import config from 'deprecation-app/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service fastboot;

  /**
   *  FastBoot shouldn't know the host since we use prember
   *  & it can't find the resources at the API host during build time.
   */
  get host() {
    let isFastBoot = this.fastboot.isFastBoot;
    return isFastBoot ? '' : config.apiHost;
  }

  // TODO put this back, maybe as urlForQuery
  //
  // buildURL(modelName, id, snapshot, requestType, query) {
  //   let url;

  //   if (requestType === 'queryRecord') {
  //     url = [modelName, `${query.path}.json`];
  //   } else if (requestType === 'query') {
  //     url = [modelName, `${query.path}-${query.version}.json`];
  //   } else {
  //     return this.super;
  //   }

  //   let host = this.host;
  //   let prefix = this.urlPrefix();

  //   if (prefix) {
  //     url.unshift(prefix);
  //   }

  //   url = url.join('/');
  //   if (!host && url && url.charAt(0) !== '/') {
  //     url = '/' + url;
  //   }

  //   return url;
  // }

  urlForFindRecord(id, modelName) {
    return `/${modelName}/${id}.json`;
  }
}
