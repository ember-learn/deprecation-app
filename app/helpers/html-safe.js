import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function htmlSafeHelper([input]) {
  return htmlSafe(input);
}

export default helper(htmlSafeHelper);
