import { click, settled, visit, waitFor } from "@ember/test-helpers";
import { percySnapshot } from "ember-percy";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | visual regression", function(hooks) {
  setupApplicationTest(hooks);

  test('visit all the pages', async function(assert) {
    await visit('/');

    await percySnapshot('home-page');

    await click('[data-test-ember-1-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember 1.x');
    await settled();

    await percySnapshot('ember-1.x');

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-2-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember 2.x');
    await settled();

    await percySnapshot('ember-2.x');

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-data-2-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember Data 2.x');
    await settled();

    await percySnapshot('ember-data-2.x');

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-cli-2-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember CLI 2.x');
    await settled();

    await percySnapshot('ember-cli-2.x');

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-3-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember 3.x');
    await settled();

    await percySnapshot('ember-3.x');

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-data-3-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember Data 3.x');
    await settled();

    await percySnapshot('ember-data-3.x');
  });
});
