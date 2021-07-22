import Component from '@glimmer/component';
export default class DeprecationArticle extends Component {
  get idForTitle() {
    return `toc_${this.args.model.title}`;
  }

  get idForUntil() {
    return `toc_until-${this.args.model.until}`;
  }
}
