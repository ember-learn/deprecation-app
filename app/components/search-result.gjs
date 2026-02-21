import Component from '@glimmer/component';
import hrefTo from 'ember-href-to/helpers/href-to';
import { htmlSafe as templateHtmlSafe } from '@ember/template';
import { helper } from '@ember/component/helper';

// We can't use plain functions as helpers yet, so wrap this:
const htmlSafe = helper(templateHtmlSafe);

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
    let returnedRemainingHeadings =
      this.args.result._highlightResult.headings.slice(1);
    let lastHeading =
      returnedRemainingHeadings[returnedRemainingHeadings.length - 1].value;
    if (lastHeading.indexOf('id:') === 0) {
      returnedRemainingHeadings.splice(-1, 1);
    }
    return returnedRemainingHeadings;
  }

  <template>
    {{#if this.version}}
      <div
        class="algolia-docsearch-suggestion algolia-docsearch-suggestion__secondary ds-suggestion"
      >
        <div class="algolia-docsearch-suggestion--wrapper">
          <div class="algolia-docsearch-suggestion--subcategory-column">
            <span
              class="algolia-docsearch-suggestion--subcategory-column-text"
            >{{this.sectionTitle}}</span>
          </div>
          <div class="algolia-docsearch-suggestion--content">
            <a
              href="{{hrefTo
                'show'
                this.project
                this.version
              }}#{{@result.anchor}}"
              data-href-to-ignore
            >
              <div class="algolia-docsearch-suggestion--title">
                {{#each this.remainingHeadings as |heading index|}}
                  {{#if index}}
                    >
                  {{/if}}
                  {{htmlSafe heading.value}}
                {{/each}}
              </div>
            </a>
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}
