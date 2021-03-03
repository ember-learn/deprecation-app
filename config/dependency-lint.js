'use strict';

module.exports = {
  allowedVersions: {
    // TODO: The exception is due to ember-qunit using 2.6.0 and
    // ember-styleguide using 2.7.1. When you upgrade these addons,
    // please check if we no longer need to make this exception.
    'ember-assign-polyfill': '2.6.0 || 2.7.1',
  },
};
