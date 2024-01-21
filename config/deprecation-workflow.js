/* eslint-disable */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-global' },
    { handler: 'silence', matchId: 'manager-capabilities.modifiers-3-13' },
    { handler: 'silence', matchId: 'ember.built-in-components.import' },
    { handler: 'silence', matchId: 'this-property-fallback' },
  ],
};
