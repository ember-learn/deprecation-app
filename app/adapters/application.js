import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    if (requestType === 'queryRecord') {
      return `/${modelName}/${query.path}.json`;
    }
    return this._super(...arguments);
  },
});
