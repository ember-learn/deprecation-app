import { visit } from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | visual regression', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting all the routes', async function(assert) {
    let pagesToLookup = {
      'home-page': '/',
      'ember-1.x': '/v1.x',
      'ember-2.x': '/v2.x',
      'ember-3.x': '/v3.x',
      'ember-data-2.x': '/ember-data/v2.x',
      'ember-cli-2.x': '/ember-cli/v2.x',
    }

    await Object.keys(pagesToLookup).map(async (page) => {
      await visit(pagesToLookup[page]);
      percySnapshot(page);
    });

    assert.expect(0);
  });
});
