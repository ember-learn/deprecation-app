import { click, currentURL, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | search', function (hooks) {
  setupApplicationTest(hooks);

  /**
   * EmberTether moves the results out of the test root element.
   */
  function result(id) {
    return document.querySelector(`[data-test-search-result="${id}"] a`);
  }

  async function search(query) {
    await visit('/');
    await fillIn('#search-input', query);
  }

  function resultIds() {
    return Array.from(
      document.querySelectorAll('[data-test-search-result]'),
      (element) => element.dataset.testSearchResult
    );
  }

  test('an exact id ranks first', async function (assert) {
    await search('deprecated-evented');

    assert.strictEqual(resultIds()[0], 'deprecated-evented');
  });

  test('a display id ranks first', async function (assert) {
    await search('ember-data:model.toJSON');

    assert.strictEqual(resultIds()[0], 'ember-data-model-toJSON');
  });

  test('an id without separators ranks first', async function (assert) {
    await search('ember data model toJSON');

    assert.strictEqual(resultIds()[0], 'ember-data-model-toJSON');
  });

  test('title words rank first', async function (assert) {
    await search('secret adapter fallback');

    assert.strictEqual(
      resultIds()[0],
      'ember-data-deprecate-secret-adapter-fallback'
    );
  });

  test('every word must match', async function (assert) {
    await search('evented zzzqqq');

    assert.deepEqual(resultIds(), []);
    assert
      .dom('[data-test-search-no-results]', document)
      .hasText('No deprecations match your search.');
  });

  test('a result links to its guide', async function (assert) {
    await search('deprecated-evented');
    await click(result('deprecated-evented'));

    assert.strictEqual(currentURL(), '/id/deprecated-evented');
    assert.dom('[data-test-search-result]', document).doesNotExist();
  });
});
