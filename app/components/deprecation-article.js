import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class DeprecationArticle extends Component {
  @tracked showChildDeprecations = false;

  get idForTitle() {
    return `toc_${this.args.model.title}`;
  }

  get idForUntil() {
    return `toc_until-${this.args.model.until}`;
  }

  @action
  toggleChildDeprecations() {
    this.showChildDeprecations = !this.showChildDeprecations;
  }
}
