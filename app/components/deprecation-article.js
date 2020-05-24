import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DeprecationArticle extends Component {
  @service prism;

  get idForTitle() {
    return `toc_${this.args.model.title}`;
  }

  get idForUntil() {
    return `toc_until-${this.args.model.until}`;
  }

  @action
  setupCodeSnippets(element) {
    let nodeList = element.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      nodeList.forEach((code) => {
        code.parentNode.classList.add("line-numbers")
      });
    }

    let filenameNodeList = element.querySelectorAll('pre > code');

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

        code.parentNode.previousElementSibling.append(wrapperDiv);
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

    element.querySelectorAll(".anchorable-toc").forEach(function (currentToc) {
      let link = document.createElement('a');
      link.classList.add('bg-none', 'toc-anchor');
      link.setAttribute('href', `#${currentToc.getAttribute('id')}`);
      link.appendChild(currentToc);
      element.prepend(link);
    });

    this.prism.highlight();
  }
}
