import hrefTo from 'ember-href-to/helpers/href-to';
import { on } from '@ember/modifier';

<template>
  <div
    class="algolia-docsearch-suggestion algolia-docsearch-suggestion__secondary ds-suggestion"
    data-test-search-result={{@result.id}}
  >
    <div class="algolia-docsearch-suggestion--wrapper">
      <div class="algolia-docsearch-suggestion--subcategory-column">
        <span class="algolia-docsearch-suggestion--subcategory-column-text">
          {{@result.projectName}}
          {{@result.since}}
        </span>
      </div>
      <div class="algolia-docsearch-suggestion--content">
        <a href={{hrefTo "id" @result.id}} {{on "click" @onSelect}}>
          <div class="algolia-docsearch-suggestion--title">
            {{@result.title}}
          </div>
          <div class="algolia-docsearch-suggestion--text search-result-id">
            {{@result.displayId}}
          </div>
          {{#if @result.snippet}}
            <div class="algolia-docsearch-suggestion--text">
              {{@result.snippet}}
            </div>
          {{/if}}
        </a>
      </div>
    </div>
  </div>
</template>
