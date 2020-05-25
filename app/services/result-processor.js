import Service from '@ember/service';
import EmberObject, { get } from '@ember/object';
import semverCompare from 'semver-compare';
import { task } from 'ember-concurrency-decorators';

export default class ResultProcessorService extends Service {
  @task
  * processResults(query) {
    let result = [];

    for (const item of query.toArray()) {
      let since = result.findBy('since', get(item, 'since'));
      if(!since) {
         result.pushObject(EmberObject.create({
            since: get(item, 'since'),
            contents: []
         }));
      }
      yield result.findBy('since', get(item, 'since')).contents.pushObject(item);
    }

    let sorted = result.sort((a, b) => semverCompare(a.since, b.since));
    let match = sorted[0].since.match(/Upcoming Features/)
    if (match && match[0] == "Upcoming Features") {
      let upComingFeatures = sorted.shift();
      sorted.push(upComingFeatures);
    }

    return sorted;
  }
}
