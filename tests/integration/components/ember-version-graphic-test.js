import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember-version-graphic', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('textToPass', '1.x');
    await render(hbs`{{ember-version-graphic text=textToPass}}`);
    assert.equal(this.element.textContent.trim(), '1.x');

    // Template block usage:
    await render(hbs`
      {{#ember-version-graphic}}
        template block text
      {{/ember-version-graphic}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
