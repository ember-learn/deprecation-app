/* eslint-disable ember/no-runloop */
import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import SearchResult from './search-result';
import EmberTether from 'ember-tether/components/ember-tether';
import { on } from '@ember/modifier';
import perform from 'ember-concurrency/helpers/perform';
import highlightMatches from '../modifiers/highlight-matches';

export default class SearchInput extends Component {
  @service('search') searchService;

  _resultTetherConstraints = Object.freeze([
    {
      to: 'window',
      pin: ['left', 'right'],
    },
  ]);

  constructor() {
    super(...arguments);

    this.setup();
  }

  @action
  setup() {
    later(
      this,
      function () {
        if (typeof document !== 'undefined') {
          document.addEventListener(
            'click',
            (event) => {
              if (!event.target.closest('.ds-dropdown-results')) {
                this.searchService.searchResults = null;
              }
            },
            false
          );
        }
      },
      200
    );
  }

  get showResults() {
    return this.searchService.searchResults !== null;
  }

  @action
  clearResults() {
    this.searchService.searchResults = null;
  }

  @action
  onfocus() {
    set(this, '_focused', true);
  }

  @action
  onblur() {
    later(
      this,
      function () {
        set(this, '_focused', false);
      },
      200
    );
  }

  <template>
    <div class="search-input">
      <label class="visually-hidden" for="search-input">Search</label>
      <input
        id="search-input"
        type="search"
        placeholder="Search deprecations"
        autocomplete="off"
        {{on "input" (perform this.searchService.search value="target.value")}}
        {{on "focus" this.searchService.loadIndex}}
      />
    </div>

    {{! Search results dropdown }}
    <EmberTether
      @target="#search-input"
      @targetAttachment="bottom left"
      @attachment="top left"
      @constraints={{this._resultTetherConstraints}}
      class="ds-dropdown-results"
    >
      {{#if this.showResults}}
        <span
          class="ds-suggestions ds-dropdown-menu"
          {{highlightMatches
            this.searchService.searchTerms
            results=this.searchService.searchResults
          }}
        >
          <div class="ds-suggestion">
            <div
              class="algolia-docsearch-suggestion algolia-docsearch-suggestion__main"
            >
              <div class="algolia-docsearch-suggestion--category-header">
                <span
                  class="algolia-docsearch-suggestion--category-header-lvl0"
                >
                  Search Results
                </span>
              </div>
              <div class="algolia-docsearch-suggestion--wrapper"></div>
            </div>
          </div>
          {{#each this.searchService.searchResults as |result|}}
            <SearchResult @result={{result}} @onSelect={{this.clearResults}} />
          {{else}}
            <div
              class="algolia-docsearch-suggestion ds-suggestion"
              data-test-search-no-results
            >
              <div class="algolia-docsearch-suggestion--content">
                No deprecations match your search.
              </div>
            </div>
          {{/each}}
        </span>
      {{/if}}
    </EmberTether>
  </template>
}
/* eslint-enable ember/no-runloop */
