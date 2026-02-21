import Component from '@glimmer/component';
import semverParse from 'semver/functions/parse';
import semverValid from 'semver/functions/valid';

export default class SemVer extends Component {
  get displayVersion() {
    if (!semverValid(this.args.version)) {
      return this.args.version;
    }

    let precision = this.args.precision;
    let display = this.args.version;
    let parsed = semverParse(this.args.version, {}, false);
    // Parse returns null if it can't parse
    if (parsed) {
      switch (precision) {
        case 'major':
          display = `${parsed.major}`;
          break;
        case 'minor':
          display = `${parsed.major}.${parsed.minor}`;
          break;
        case 'patch':
        default:
          display = `${parsed.major}.${parsed.minor}.${parsed.patch}`;
      }
    }

    return display;
  }
}
