import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | result-processor', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:result-processor');
    assert.ok(service);
  });
});
