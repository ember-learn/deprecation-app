import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ContentModel extends Model {
  @attr content;
  @attr title;
  @attr until;
  @attr since;
  @attr anchor;
  @attr displayId;
  @belongsTo('content', { inverse: 'children', async: false }) parent;
  @hasMany('content', { inverse: 'parent', async: false }) children;

  // v1 has different meta, so conditionally render it
  get renderUntil() {
    return !this.since.startsWith('1.');
  }
}
