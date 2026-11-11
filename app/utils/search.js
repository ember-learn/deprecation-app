const MAX_RESULTS = 15;
const SNIPPET_BEFORE = 40;
const SNIPPET_LENGTH = 140;

const PROJECT_NAMES = {
  ember: 'Ember',
  'ember-data': 'Ember Data',
  'ember-cli': 'Ember CLI',
};

/**
 * Drops separators, so that "ember data model toJSON",
 * "ember-data:model.toJSON", and "ember-data-model-toJSON" compare equal.
 */
function compact(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function snippet(text, index) {
  let start = Math.max(0, index - SNIPPET_BEFORE);
  let end = start + SNIPPET_LENGTH;
  let prefix = start > 0 ? '…' : '';
  let suffix = end < text.length ? '…' : '';

  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

/**
 * `since` can also be a label, such as "Upcoming Features".
 * Labels sort after every version.
 */
function sinceParts(since) {
  return /^\d/.test(since) ? since.split('.').map(Number) : [];
}

function compareSinceNewestFirst(a, b) {
  let left = sinceParts(a.since);
  let right = sinceParts(b.since);

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    let difference = (right[i] ?? -1) - (left[i] ?? -1);

    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
}

function score(entry, query, terms) {
  let id = entry.id.toLowerCase();
  let displayId = entry.displayId.toLowerCase();
  let title = entry.title.toLowerCase();
  let text = entry.text.toLowerCase();
  let ids = `${id} ${displayId}`;
  let total = 0;
  let firstTextMatch = -1;

  for (let term of terms) {
    if (ids.includes(term)) {
      total += 40;
    } else if (title.includes(term)) {
      total += 20;
    } else {
      let index = text.indexOf(term);

      if (index === -1) {
        return null;
      }

      total += 2;

      if (firstTextMatch === -1) {
        firstTextMatch = index;
      }
    }
  }

  let compactQuery = compact(query);

  if (query === id || query === displayId) {
    total += 1000;
  } else if (
    compactQuery === compact(id) ||
    compactQuery === compact(displayId)
  ) {
    total += 900;
  } else if (
    compactQuery.length > 2 &&
    (compact(id).includes(compactQuery) ||
      compact(displayId).includes(compactQuery))
  ) {
    total += 200;
  }

  if (title === query) {
    total += 500;
  } else if (title.includes(query)) {
    total += 100;
  }

  return {
    score: total,
    snippet: firstTextMatch === -1 ? null : snippet(entry.text, firstTextMatch),
  };
}

export function queryTerms(query) {
  let trimmed = query.trim().toLowerCase();

  return trimmed ? trimmed.split(/\s+/) : [];
}

/**
 * Every word in the query must appear in the id, the title, or the text.
 * Id matches rank above title matches, and title matches rank above
 * matches in the text. Newer deprecations win ties.
 */
export default function search(entries, rawQuery) {
  let query = rawQuery.trim().toLowerCase();

  if (!query) {
    return [];
  }

  let terms = queryTerms(query);
  let results = [];

  for (let entry of entries) {
    let match = score(entry, query, terms);

    if (match) {
      results.push({
        ...entry,
        projectName: PROJECT_NAMES[entry.project] ?? entry.project,
        score: match.score,
        snippet: match.snippet,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score || compareSinceNewestFirst(a, b))
    .slice(0, MAX_RESULTS);
}
