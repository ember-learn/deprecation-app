import { module, test } from 'qunit';
import { setupRenderingTest } from 'deprecation-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sem-ver', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders patch by default', async function (assert) {
    await render(hbs`<SemVer @version="1.2.3" />`);
    assert.dom(this.element).hasText('1.2.3');
  });

  test('it renders major precision', async function (assert) {
    await render(hbs`<SemVer @version="1.2.3" @precision="major" />`);
    assert.dom(this.element).hasText('1');
  });

  test('it renders minor precision', async function (assert) {
    await render(hbs`<SemVer @version="1.2.3" @precision="minor" />`);
    assert.dom(this.element).hasText('1.2');
  });

  test('it renders patch precision', async function (assert) {
    await render(hbs`<SemVer @version="1.2.3" @precision="patch" />`);
    assert.dom(this.element).hasText('1.2.3');
  });

  test('it renders non-versions', async function (assert) {
    const INVALIDS = ['Glimmer Internals', '1', '1.2.3.4.5', '99.0'];
    for await (let ver of INVALIDS) {
      this.set('ver', ver);

      await render(hbs`<SemVer @version={{this.ver}} />`);
      assert.dom(this.element).hasText(ver);
    }
  });
});
