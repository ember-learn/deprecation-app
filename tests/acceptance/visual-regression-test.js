import { click, visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | visual regression', function (hooks) {
  setupApplicationTest(hooks);

  test('visit all the pages', async function (assert) {
    // Homepage
    await visit('/');
    await percySnapshot('home-page');

    // v1.x Ember
    await click('[data-test-ember-1-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember 1.x');

    await percySnapshot('ember-1.x');

    // v2.x Ember
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-2-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember 2.x');

    await percySnapshot('ember-2.x');

    // v2.x Ember Data
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-data-2-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember Data 2.x');

    await percySnapshot('ember-data-2.x');

    // v2.x Ember CLI
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-cli-2-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember CLI 2.x');

    await percySnapshot('ember-cli-2.x');

    // v3.x Ember
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-3-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember 3.x');

    await percySnapshot('ember-3.x');

    // v3.x Ember Data
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-data-3-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember Data 3.x');

    await percySnapshot('ember-data-3.x');

    // v4.x Ember
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-4-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember 4.x');

    await percySnapshot('ember-4.x');

    // v4.x Ember CLI
    await click('[data-test-main-deprecations-link]');
    await click('[data-test-ember-cli-4-link] > a');

    assert
      .dom('[data-test-deprecations-added-in]')
      .hasText('Deprecations Added in Ember CLI 4.x');

    await percySnapshot('ember-cli-4.x');

    await visit('/id/ember-polyfills-deprecate-assign');
    assert.dom('h1').hasText('Deprecation Guide for Ember.assign');
    await percySnapshot('individual-deprecation-page');
  });
});
