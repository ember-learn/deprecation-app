import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';
import semverCompare from 'semver-compare';

export default class Show extends Controller {
  @alias('model')
  content;

  init() {
    super.init(...arguments);
  }

  @computed('content.[]')
  get groupedResults() {
    let result = [];
    this.content.forEach(function(item) {
      let since = result.findBy('since', item.get('since'));
      if (!since) {
        result.pushObject(
          EmberObject.create({
            since: item.get('since'),
            contents: []
          })
        );
      }
      result
        .findBy('since', item.get('since'))
        .get('contents')
        .pushObject(item);
    });
    return result;
  }

  @computed('groupedResults')
  get sortedGroupedResults() {
    let sorted = this.groupedResults.sort((a, b) =>
      semverCompare(a.since, b.since)
    );
    let match = sorted[0].since.match(/Upcoming Features/);
    if (match && match[0] == 'Upcoming Features') {
      let upComingFeatures = sorted.shift();
      sorted.push(upComingFeatures);
    }
    return sorted;
  }

  @computed('content')
  get version() {
    let version = this.get('content.query.version');
    return version.match(/[0-9].*/)[0];
  }

  @computed('content')
  get project() {
    let projects = {
      ember: 'Ember',
      'ember-cli': 'Ember CLI',
      'ember-data': 'Ember Data'
    };
    let project = this.get('content.query.path');
    return projects[project];
  }

  @computed('content')
  get renderIdOrUntil() {
    let version = this.get('content.query.version');
    let versionsWithoutId = ['v1.x'];
    if (versionsWithoutId.includes(version)) {
      return false;
    } else {
      return true;
    }
  }
}
