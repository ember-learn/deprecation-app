import Controller from '@ember/controller';
import { computed } from '@ember/object';
import semver from 'semver';

export default Controller.extend({
  queryParams: ['from', 'to'],

  from: null,
  to: null,

  // The model is initially an array of arrays, one for each project/version pair
  // (e.g. `ember-data-2.x`), so we need to flatten it to make filtering easier
  flattenedDeprecations: computed('model.[]', function() {
    return this.model.reduce((acc, elem) => {
      let rawArray = elem.toArray();
      return acc.concat(rawArray);
    }, []);
  }),

  // Create a deduped list of semver-coerced versions from all the deprecations that were loaded.
  // We'll use this as the basis for our filter dropdowns
  versions: computed('flattenedDeprecations.@each.since', function() {
    let versionsList = this.flattenedDeprecations.reduce((acc, elem) => {
      let coerced = semver.coerce(elem.since);
      let version = coerced && coerced.version;

      if (!acc.includes(version) && parseFloat(version)) {
        acc.push(version);
      }

      return acc;
    }, []);

    return versionsList.sort();
  }),

  // `fromVersions` is the list of versions that the `from` dropdown uses. It's restricted so that
  // you can't select a `from` version that is higher than your `to` version.
  fromVersions: computed('versions.[]', 'to', function() {
    return this.to ?
      this.versions.filter(version => semver.lt(version, this.to)) :
      this.versions;
  }),

  // `toVersions` is the list of versions that the `to` dropdown uses. It's restricted so that
  // you can't select a `to` version that is lower than your `from` version.
  toVersions: computed('versions.[]', 'from', function() {
    return this.from ?
      this.versions.filter(version => semver.gt(version, this.from)) :
      this.versions;
  }),

  // This will usually just mirror the `from` query param, but in case that param is empty,
  // this lets us just use the lowest possible version as a default
  selectedFrom: computed('from', function() {
    return this.from || this.get('versions.firstObject');
  }),

  // This will usually just mirror the `to` query param, but in case that param is empty,
  // this lets us just use the highest possible version as a default
  selectedTo: computed('to', function() {
    return this.to || this.get('versions.lastObject');
  }),

  filteredDeprecations: computed('flattenedDeprecations', 'from', 'to', function() {
    let deprecations = this.flattenedDeprecations;

    return deprecations.filter(deprecation => {
      let coerced = semver.coerce(deprecation.since);
      let version =  coerced && coerced.version;

      // In case we're not able to get an actual semver version (like, if the version is a bunch
      // of words or something) we just return false immediately rather than trying to pass it
      // into the `semver` functions.
      if (!version) {
        return false;
      }

      return semver.gte(version, this.selectedFrom) && semver.lte(version, this.selectedTo);
    });
  }),
});
