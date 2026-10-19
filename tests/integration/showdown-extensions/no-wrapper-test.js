import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Showdown extensions | no-wrapper', function (hooks) {
  setupRenderingTest(hooks);

  test("it doesn't render a paragraph wrapper", async function (assert) {
    await render(hbs`<MarkdownToHtml @markdown="some markdown" />`);

    assert.dom('p').exists().hasText('some markdown');

    await render(
      hbs`<MarkdownToHtml @markdown="some markdown" @extensions="no-wrapper" />`
    );
    assert.dom('p').doesNotExist();
    assert.dom(this.element).containsText('some markdown');
  });

  test('it converts `backticks` to code blocks', async function (assert) {
    this.set('markdown', 'some `{{helper-name}}` in backticks');
    await render(
      hbs`<MarkdownToHtml @markdown={{this.markdown}} @extensions="no-wrapper" />`
    );
    assert.dom('code').exists().containsText('{{helper-name}}');
  });
});
