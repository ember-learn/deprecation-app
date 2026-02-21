/* eslint-disable ember/no-runloop */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import not from '../helpers/not';
import idForDeprecation from '../helpers/id-for-deprecation';
import SemVer from './sem-ver';

export default class TocSection extends Component {
  @service router;

  @tracked level = '1';

  get tocLevel() {
    return `level-${this.level}`;
  }

  get id() {
    let dasherizedSince = this.args.result.since.replace(/\./g, '-');

    return `toggle-dep-menu-${dasherizedSince}`;
  }

  constructor() {
    super(...arguments);

    if (this.displayMobileToc) {
      set(this, 'open', this.displayMobileToc);
    }
  }

  @action
  navigateToLink() {
    set(this, 'displayMobileToc', !this.displayMobileToc);

    later(
      this,
      function () {
        if (typeof document !== 'undefined') {
          if (this.displayMobileToc)
            document.querySelector('body').classList.add('no-scroll');
          if (!this.displayMobileToc)
            document.querySelector('body').classList.remove('no-scroll');
        }
      },
      200
    );
  }

  <template>
    <div ...attributes>
      <button
        id={{this.id}}
        class="level-1 list-unstyled"
        aria-label={{concat "deprecations for version " @result.since}}
        aria-expanded={{if this.open "true" "false"}}
        type="button"
        data-test-toc-list-item
        {{on "click" (fn (mut this.open) (not this.open))}}
      >
        <SemVer @version={{@result.since}} @precision="minor" />

      </button>

      {{#if this.open}}
        <div>
          <ul aria-labelledby={{this.id}} class="level-3 list-unstyled">
            {{#each @result.contents as |content index|}}
              <li class={{if index "mt-2"}}>
                <a
                  class="bg-none"
                  href="#{{idForDeprecation content.id content.anchor}}"
                  {{on "click" this.navigateToLink}}
                >
                  {{content.title}}
                </a>
              </li>
            {{/each}}
          </ul>
        </div>
      {{/if}}
    </div>
  </template>
}

/* eslint-enable ember/no-runloop */
