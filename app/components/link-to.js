import LinkComponent from '@ember/routing/link-component';

export default class CustomLinkComponent extends LinkComponent {
  click() {
    if(window.scrollTo) {
      window.scrollTo(0,0);
    }
  }
}
