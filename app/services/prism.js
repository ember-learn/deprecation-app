/* global Prism */
import Service from '@ember/service';
import { debounce } from '@ember/runloop';

export default class PrismService extends Service {
  _highlightAll() {
    Prism.highlightAll();
  }

  highlight() {
    debounce(null, this._highlightAll, 500);
  }
}
