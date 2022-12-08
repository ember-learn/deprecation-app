import semverCompare from 'semver-compare';

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

  results.sort((a, b) => semverCompare(a.since, b.since));
  let glimmer = results.find(({ since }) => since === GLIMMER);
  if (glimmer) results.push(results.shift());

  let upcoming = results.find(({ since }) => since === UPCOMING);
  if (upcoming) results.push(results.shift());

  return results;
}
