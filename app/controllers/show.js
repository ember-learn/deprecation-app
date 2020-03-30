import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import semverCompare from 'semver-compare';

export default Controller.extend({
  isToc: false,
  content: alias('model'),
  init() {
    this._super(...arguments);
  },
  groupedResults: computed('content.[]', function() {
    let result = [];
    this.content.forEach(function(item) {
      let since = result.findBy('since', item.get('since'));
      if(!since) {
         result.pushObject(EmberObject.create({
            since: item.get('since'),
            contents: []
         }));
      }
      result.findBy('since', item.get('since')).get('contents').pushObject(item);
    });
    return result;
  }),
  sortedGroupedResults: computed('groupedResults', function() {
    let sorted = this.groupedResults.sort((a, b) => semverCompare(a.since, b.since));
    let match = sorted[0].since.match(/Upcoming Features/)
    if (match && match[0] == "Upcoming Features") {
      let upComingFeatures = sorted.shift();
      sorted.push(upComingFeatures);
    }
    return sorted;
  }),
  version: computed('content', function() {
    let version = this.get('content.query.version');
    return version.match(/[0-9].*/)[0];
  }),
  project: computed('content', function() {
    let projects = {
      'ember': 'Ember',
      'ember-cli': 'Ember CLI',
      'ember-data': 'Ember Data'
    }
    let project = this.get('content.query.path');
    return projects[project];
  }),
  renderIdOrUntil: computed('content', function() {
    let version = this.get('content.query.version');
    let versionsWithoutId = ['v1.x'];
    if (versionsWithoutId.includes(version)) {
      return false;
    } else {
      return true;
    }
  }),

  actions: {
    toggleToc() {
      this.toggleProperty('isToc');

      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }
});

