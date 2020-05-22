import { helper } from '@ember/component/helper';

export function idForDeprecation([id, anchor]) {
  if (anchor) {
    return anchor;
  }

  let idString = id;
  idString = idString.replace(/\s+/g, '');
  let replacedIdString = idString.replace(/\.|,|:/g, '-');
  return `toc_${replacedIdString}`;
}

export default helper(idForDeprecation);
