import { hash } from '@ember/helper';

<template>
  {{#if (has-block)}}
    {{yield
      (hash
        sortedGroupedResults=this.sortedGroupedResults
        processResults=this.processResults
      )
    }}
  {{else}}
    {{yield}}
  {{/if}}
</template>
