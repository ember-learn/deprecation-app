import { className, classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classNames('ember-version-graphic')
export default class EmberVersionGraphic extends Component {
  @className
  mascot = 'tomster';

  text = '0.x';
}
