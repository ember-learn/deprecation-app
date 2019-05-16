import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import $ from 'jquery';

export default class DeprecationArticle extends Component {
  @service()
  prism;

  renderIdOrUntil = true;

  @computed('model.title')
  get idForTitle() {
    return `toc_${this.get('model.title')}`;
  }

  @computed('model.until')
  get idForUntil() {
    return `toc_until-${this.get('model.until')}`;
  }

  didRender() {
    let nodeList = this.$('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      nodeList.each((index, code) => {
        code.parentNode.classList.add('line-numbers');
      });
    }

    let filenameNodeList = this.$('pre > code');

    if (filenameNodeList) {
      filenameNodeList.each((index, code) => {
        let filename = code.attributes['data-filename']
          ? code.attributes['data-filename'].value
          : null;
        let match;

        if (filename) {
          match = filename.match(/\.(\w+)$/);
        }

        let ext = '';

        if (match && match[1]) {
          ext = match[1];
        } else {
          // pull file type from language
          if (code.classList.contains('handlebars')) {
            ext = 'hbs';
          } else if (code.classList.contains('javascript')) {
            ext = 'js';
          }
        }

        this.$(code.parentNode).wrap(
          `<div class="filename ${ext}" style="position: relative;"></div>`
        );

        if (filename) {
          this.$(code.parentNode.parentNode).prepend(
            this.$(`<span>${filename}</span>`)
          );
        }
        this.$(code.parentNode.parentNode).prepend(
          '<div class="ribbon"></div>'
        );
      });
    }

    this.$('.anchorable-toc').each(function() {
      let currentToc = $(this);

      currentToc.prepend(
        `<a class="toc-anchor" href="#${currentToc.attr('id')}"></a>`
      );
    });

    this.prism.highlight();
  }
}
