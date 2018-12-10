import LinkComponent from '@ember/routing/link-component';

export default class LinkTo extends LinkComponent {
  click() {
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }
}
