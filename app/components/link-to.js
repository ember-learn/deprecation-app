import { LinkComponent } from '@ember/legacy-built-in-components';

export default class CustomLinkComponent extends LinkComponent {
  click() {
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }
}
