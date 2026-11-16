import { modifier } from 'ember-modifier';

const HIGHLIGHT_NAME = 'search-match';

/**
 * Marks every occurrence of each term in the element's text
 * with the CSS Custom Highlight API, styled by `::highlight(search-match)`.
 *
 * `results` is not read. It is an argument so that the highlight
 * runs again after the results render.
 */
export default modifier(function highlightMatches(
  element,
  [terms] /*, { results } */
) {
  if (!globalThis.CSS?.highlights) {
    return;
  }

  let highlight = new Highlight();
  let walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    let text = node.data.toLowerCase();

    for (let term of terms) {
      for (
        let index = text.indexOf(term);
        index !== -1;
        index = text.indexOf(term, index + term.length)
      ) {
        let range = new Range();

        range.setStart(node, index);
        range.setEnd(node, index + term.length);
        highlight.add(range);
      }
    }
  }

  CSS.highlights.set(HIGHLIGHT_NAME, highlight);

  return () => CSS.highlights.delete(HIGHLIGHT_NAME);
});
