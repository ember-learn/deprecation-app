import Model, { attr } from '@ember-data/model';

export default class ContentModel extends Model {
  @attr content;
  @attr title;
  @attr until;
  @attr since;
  @attr anchor;
}
