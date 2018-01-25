/* global Prism */
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  idForTitle: computed('model.title', function() {
    return `toc_${this.get('model.title')}`;
  }),
  idForUntil: computed('model.until', function() {
    return `toc_until-${this.get('model.until')}`;
  }),
  idForDeprecation: computed('model.id', function() {
    let idString = this.get('model.id');
    idString = idString.replace(/\s+/g, '');
    let replacedIdString = idString.replace(/\.|,/g, '-');
    return `toc_id-${replacedIdString}`;
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
          this.$(code.parentNode.parentNode).prepend(this.$(`<span>${'filename'}</span>`));
        }
        this.$(code.parentNode.parentNode).prepend('<div class="ribbon"></div>');
      });
    }

    Prism.highlightAll();
  }
});
