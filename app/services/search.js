import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SearchService extends Service {
  @tracked algolia = null;
}
