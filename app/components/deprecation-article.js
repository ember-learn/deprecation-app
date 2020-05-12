import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DeprecationArticle extends Component {
  @service prism;

  @tracked renderIdOrUntil = true;

  @computed('model.title')
  get idForTitle() {
    return `toc_${get(this, 'model.title')}`;
  }

  @computed('model.until')
  get idForUntil() {
    return `toc_until-${get(this, 'model.until')}`;
  }

  setupCodeSnippets() {
    let nodeList = document.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      nodeList.forEach((code) => {
        code.parentNode.classList.add("line-numbers")
      });
    }

    let filenameNodeList = document.querySelectorAll('pre > code');

    if (filenameNodeList) {
      filenameNodeList.forEach((code) => {
        code.tabIndex = 0;
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

        let wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('filename');
        if (ext) {
          wrapperDiv.classList.add(ext);
        }
        wrapperDiv.style.position = 'relative';

        code.parentNode.parentNode.appendChild(wrapperDiv);
        wrapperDiv.appendChild(code.parentNode);

        if (filename) {
          let span = document.createElement('span');
          span.innerHTML = filename;
          code.parentNode.parentNode.prepend(span);
        }
        let ribbonDiv = document.createElement('div');
        ribbonDiv.classList.add('ribbon');
        code.parentNode.parentNode.prepend(ribbonDiv);
      });
    }

    document.querySelectorAll(".anchorable-toc").forEach(function (anchorable) {
      let currentToc = $(this);

      let link = document.createElement('a');
      currentToc.wrap(`<a class="bg-none toc-anchor" href="#${currentToc.attr('id')}"></a>`)

    })

    this.prism.highlight();
  }
}
