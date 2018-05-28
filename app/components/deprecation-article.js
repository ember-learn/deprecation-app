import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  prism: service(),
  renderIdOrUntil: true,
  idForTitle: computed('model.title', function() {
    return `toc_${this.get('model.title')}`;
  }),
  idForUntil: computed('model.until', function() {
    return `toc_until-${this.get('model.until')}`;
  }),

  didRender() {
    let nodeList = this.$('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      nodeList.each((index, code) => {
        code.parentNode.classList.add("line-numbers")
      });
    }

    let filenameNodeList = this.$('pre > code');

    if (filenameNodeList) {
      filenameNodeList.each((index, code) => {
        let filename = code.attributes['data-filename'] ? code.attributes['data-filename'].value : null;
        let match;

        if (filename) {
          match = filename.match(/\.(\w+)$/);
        }

        let ext = '';

        if (match && match[1]) {
          ext = match[1];
        } else {
          // pull file type from language
          if(code.classList.contains('handlebars')) {
            ext = 'hbs';
          } else if (code.classList.contains('javascript')) {
            ext = 'js';
          }
        }

        this.$(code.parentNode).wrap(`<div class="filename ${ext}" style="position: relative;"></div>`);

        if (filename) {
          this.$(code.parentNode.parentNode).prepend(this.$(`<span>${filename}</span>`));
        }
        this.$(code.parentNode.parentNode).prepend('<div class="ribbon"></div>');
      });
    }

    this.$(".anchorable-toc").each(function () {
      let currentToc = $(this);

      currentToc.prepend(`<a class="toc-anchor" href="#${currentToc.attr('id')}"></a>`)
    })

    this.prism.highlight();
  }
});
