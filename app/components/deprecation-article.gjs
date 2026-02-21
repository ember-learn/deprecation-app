import Component from '@glimmer/component';
import MarkdownToHtml from 'ember-cli-showdown/components/markdown-to-html';
import or from '../helpers/or';

export default class DeprecationArticle extends Component {
  get idForTitle() {
    return `toc_${this.args.model.title}`;
  }

  get idForUntil() {
    return `toc_until-${this.args.model.until}`;
  }

  <template>
    <div class="padding-vertical-small bg-light-muted rounded-sm">
      {{yield}}
      <div class="my-2">
        {{#if @model.renderUntil}}
          <div><span class="bold">until: </span>{{@model.until}}</div>
          <div><span class="bold">id: </span>{{or
              @model.displayId
              @model.id
            }}</div>
        {{/if}}
      </div>
      <section>
        <MarkdownToHtml @markdown={{@model.content}} />
      </section>
    </div>
  </template>
}
