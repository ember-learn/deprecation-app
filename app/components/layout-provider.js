import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import EmberObject, { set } from '@ember/object';
import semverCompare from 'semver-compare';
import { task } from 'ember-concurrency-decorators'
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class LayoutProviderComponent extends Component {
  @service() router;

  @tracked sortedGroupedResults = null;

  constructor() {
    super(...arguments);

    this.processResults.perform();
  }

  @task
  processResults = function*() {
    let result = [];
    for (const item of this.args.content.toArray()) {
      let since = result.findBy('since', item.get('since'));
      if(!since) {
         result.pushObject(EmberObject.create({
            since: item.get('since'),
            contents: []
         }));
      }
      yield result.findBy('since', item.get('since')).get('contents').pushObject(item);
    }

    let sorted = result.sort((a, b) => semverCompare(a.since, b.since));
    let match = sorted[0].since.match(/Upcoming Features/)
    if (match && match[0] == "Upcoming Features") {
      let upComingFeatures = sorted.shift();
      sorted.push(upComingFeatures);
    }

    set(this, 'sortedGroupedResults', sorted);

    later(this, function() {
      if (typeof document !== 'undefined' && window.location.hash) {
        document.querySelector(window.location.hash).scrollIntoView();
      }
    }, 200);
  }
}
