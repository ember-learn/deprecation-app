import { helper } from '@ember/component/helper';

function or([a, b]) {
  return a || b;
}

export default helper(or);
