import { click, isSettled, visit, waitFor } from "@ember/test-helpers";
import { percySnapshot } from "ember-percy";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";
import FakeTimers from '@sinonjs/fake-timers';

module("Acceptance | visual regression", function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.clock = FakeTimers.install({shouldAdvanceTime: true, advanceTimeDelta: 40});
  });

  hooks.afterEach(function() {
    this.clock.uninstall();
  });

  test('visit all the pages', async function(assert) {
    await visit('/');

    await percySnapshot('home-page');

    await click('[data-test-ember-1-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember 1.x');
    await isSettled();

    this.clock.setTimeout(async function () {
      await percySnapshot('ember-1.x');
    }, 3);
    this.clock.tick(3);

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-2-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember 2.x');
    await isSettled();

    this.clock.setTimeout(async function () {
      await percySnapshot('ember-2.x');
    }, 3);
    this.clock.tick(3);

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-data-2-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember Data 2.x');
    await isSettled();

    this.clock.setTimeout(async function () {
      await percySnapshot('ember-data-2.x');
    }, 3);
    this.clock.tick(3);


    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-cli-2-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember CLI 2.x');
    await isSettled();

    this.clock.setTimeout(async function () {
      await percySnapshot('ember-cli-2.x');
    }, 3);
    this.clock.tick(3);

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-3-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember 3.x');
    await isSettled();

    this.clock.setTimeout(async function () {
      await percySnapshot('ember-3.x');
    }, 3);
    this.clock.tick(3);

    await click ('[data-test-main-deprecations-link]');

    await click('[data-test-ember-data-3-link] > a');

    await waitFor('[data-test-deprecations-added-in]');
    assert.dom('[data-test-deprecations-added-in]').includesText('Deprecations Added in Ember Data 3.x');
    await isSettled();

    this.clock.setTimeout(async function () {
      await percySnapshot('ember-data-3.x');
    }, 3);
    this.clock.tick(3);
  });
});
