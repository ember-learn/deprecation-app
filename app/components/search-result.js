import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class SearchResult extends Component {
  @computed('args.result.path')
  get project() {
    return this.args.result.path.split('/')[0];
  }

  @computed('args.result.path')
  get version() {
    return this.args.result.path.split('/')[1];
  }

  @computed('args.result.path')
  get sectionTitle() {
    return this.args.result.path;
  }

  @computed('args.result._highlightResult.headings.[]')
  get remainingHeadings() {
     let returnedRemainingHeadings = this.args.result._highlightResult.headings.slice(1);
     let lastHeading = returnedRemainingHeadings[returnedRemainingHeadings.length-1].value;
     if(lastHeading.indexOf('id:') === 0) {
      returnedRemainingHeadings.splice(-1, 1);
     }
     return returnedRemainingHeadings;
  }
}
