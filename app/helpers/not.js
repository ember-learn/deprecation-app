import { helper } from '@ember/component/helper';

function not([a]) {
  return Boolean(!a);
}

export default helper(not);
