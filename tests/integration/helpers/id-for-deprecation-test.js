import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | id-for-deprecation', function(hooks) {
  setupRenderingTest(hooks);

  module('no optional anchor id', function() {
    test('anchor id is prefixed with toc_', async function(assert) {
      this.set('inputValue', 'toJSON');
  
      await render(hbs`{{id-for-deprecation inputValue}}`);
  
      assert.equal(this.element.textContent.trim(), 'toc_toJSON');
    });
    test('anchor id has periods, commas, and colons replaced with dashes', async function(assert) {
      this.set('inputValue', 'ember-data:object.init,constructor');
  
      await render(hbs`{{id-for-deprecation inputValue}}`);
  
      assert.equal(this.element.textContent.trim(), 'toc_ember-data-object-init-constructor');
    });    
    test('anchor id has whitespace stripped out', async function(assert) {
      this.set('inputValue', 'ember_object.some property');
  
      await render(hbs`{{id-for-deprecation inputValue}}`);
  
      assert.equal(this.element.textContent.trim(), 'toc_ember_object-someproperty');
    });    
  })

  test('uses optional anchor id if present', async function(assert) {
    let anchor = 'my-sweet-deprecation'
    this.set('deprecationId', 'my-deprecation');
    this.set('optionalAnchorId', anchor);

    await render(hbs`{{id-for-deprecation deprecationId optionalAnchorId}}`);

    assert.equal(this.element.textContent.trim(), anchor);
  });
});
