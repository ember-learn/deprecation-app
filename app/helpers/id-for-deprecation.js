import { helper } from '@ember/component/helper';

export function idForDeprecation(params) {
  let idString = params[0];
  idString = idString.replace(/\s+/g, '');
  let replacedIdString = idString.replace(/\.|,/g, '-');
  return `toc_id-${replacedIdString}`;
}

export default helper(idForDeprecation);
