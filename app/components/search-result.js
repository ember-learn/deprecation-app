import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SearchResult extends Component {
  @computed('result.path')
  get project() {
    return this.result.path.split('/')[0]
  }

  @computed('result.path')
  get version() {
    return this.result.path.split('/')[1]
  }

  @computed('result.path')
  get sectionTitle() {
    return this.result.path;
  }

  @computed('result._highlightResult.headings.[]')
  get remainingHeadings() {
     let returnedRemainingHeadings = this.result._highlightResult.headings.slice(1);
     let lastHeading = returnedRemainingHeadings[returnedRemainingHeadings.length-1].value;
     if(lastHeading.indexOf('id:') === 0) {
      returnedRemainingHeadings.splice(-1, 1);
     }
     return returnedRemainingHeadings;
  }
}
