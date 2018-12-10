import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember-decorators/object';

@tagName('ol')
export default class TableOfContents extends Component {
  elementId = 'toc-list';

  @computed('level')
  get tocLevel() {
    return `level-${this.level}`;
  }

  level = '1';
}
