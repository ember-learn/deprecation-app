import semverCompare from 'semver/functions/compare';
import semverValid from 'semver/functions/valid';

const UPCOMING = 'Upcoming Features';
const GLIMMER = 'Glimmer Internals';

export default function processResults(query) {
  let results = query.toArray().reduce((results, item) => {
    let since = results.find((result) => result.since === item.since);
    if (!since) {
      since = { since: item.since, contents: [] };
      results.push(since);
    }
    since.contents.push(item);
    return results;
  }, []);

  // Valid versions at the top
  let sorted = results.filter((item) => semverValid(item.since));
  sorted.sort((a, b) => semverCompare(a.since, b.since));

  // Special cases at the bottom
  let glimmer = results.find(({ since }) => since === GLIMMER);
  if (glimmer) sorted.push(glimmer);

  let upcoming = results.find(({ since }) => since === UPCOMING);
  if (upcoming) sorted.push(upcoming);

  return sorted;
}
