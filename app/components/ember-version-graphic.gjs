import Component from '@glimmer/component';

export default class EmberVersionGraphic extends Component {
  get mascotName() {
    return this.args.mascot || 'tomster';
  }

  get textContent() {
    return this.args.text || '';
  }

  <template>
    <div class="ember-version-graphic {{this.mascotName}}">
      <span class="text">
        {{this.textContent}}
      </span>
    </div>
  </template>
}
