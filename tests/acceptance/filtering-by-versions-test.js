import { module, test } from 'qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { select } from 'deprecation-app/tests/helpers/x-select';

const countDeprecationArticles = () => {
  return findAll('[data-test-deprecation-article').length;
};

module('Acceptance | filtering by versions', function(hooks) {
  setupApplicationTest(hooks);

  test('filtering', async function(assert) {
    await visit('/filters');

    assert.equal(currentURL(), '/filters', 'we start out with no query params');
    assert.dom('select[data-test-select-from]').hasValue('1.11.0');
    assert.dom('[data-test-deprecation-article]').exists();

    let itemsCount = countDeprecationArticles();

    await select('[data-test-select-from]', '2.0.0');

    assert.equal(currentURL(), '/filters?from=2.0.0', 'selecting a "from" range updates the query param');

    let fromCount = countDeprecationArticles();

    assert.ok(itemsCount > fromCount, 'There should be fewer deprecations showing now that we\'ve filtered');

    await select('[data-test-select-to]', '2.8.0');

    assert.equal(currentURL(), '/filters?from=2.0.0&to=2.8.0', 'selecting a "to" range updates the query param');

    let toCount = countDeprecationArticles();

    assert.ok(fromCount > toCount, 'Adding to `to` filter should reduce the number of visible items even further');
  });
});
