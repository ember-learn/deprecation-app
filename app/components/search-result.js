import Component from '@glimmer/component';

export default class SearchResult extends Component {
  get project() {
    return this.args.result.path.split('/')[0];
  }

  get version() {
    return this.args.result.path.split('/')[1];
  }

  get sectionTitle() {
    return this.args.result.path;
  }

  get remainingHeadings() {
    let returnedRemainingHeadings = this.args.result._highlightResult.headings.slice(
      1
    );
    let lastHeading =
      returnedRemainingHeadings[returnedRemainingHeadings.length - 1].value;
    if (lastHeading.indexOf('id:') === 0) {
      returnedRemainingHeadings.splice(-1, 1);
    }
    return returnedRemainingHeadings;
  }
}
