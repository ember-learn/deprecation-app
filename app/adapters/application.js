import JSONAPIAdapter from '@ember-data/adapter/json-api';
export default class ApplicationAdapter extends JSONAPIAdapter {
  urlForFindRecord(id, modelName) {
    return `/${modelName}/${id}.json`;
  }

  urlForQuery(query, modelName) {
    return `/${modelName}/${query.path}-${query.version}.json`;
  }
}
