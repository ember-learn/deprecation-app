import Component from '@glimmer/component';

export default class EmberVersionGraphic extends Component {
  get mascotName() {
    return this.args.mascot || 'tomster';
  }

  get textContent() {
    return this.args.text || '0.x';
  }
}
