import Controller from '@ember/controller';
import { computed } from '@ember/object';
import semverCompare from 'semver-compare';

export default Controller.extend({
  queryParams: ['from', 'to'],

  from: null,
  to: null,

  flattenedDeprecations: computed('model.[]', function() {
    return this.model.reduce((acc, elem) => {
      let rawArray = elem.toArray();
      return acc.concat(rawArray);
    }, []);
  }),

  versions: computed('flattenedDeprecations.@each.since', function() {
    let versionsList = this.flattenedDeprecations.reduce((acc, elem) => {
      let version = elem.since;

      if (!acc.includes(version) && parseFloat(version)) {
        acc.push(version);
      }

      return acc;
    }, []);

    return versionsList.sort();
  }),

  fromVersions: computed('versions.[]', 'to', function() {
    return this.to ?
      this.versions.filter(version => version < this.to) :
      this.versions;
  }),

  toVersions: computed('versions.[]', 'from', function() {
    return this.from ?
      this.versions.filter(version => version > this.from) :
      this.versions;
  }),

  selectedFrom: computed('from', function() {
    if (!this.from) {
      return this.get('versions.firstObject');
    }

    return this.from;
  }),

  selectedTo: computed('to', function() {
    if(!this.to) {
      return this.get('versions.lastObject');
    }

    return this.to;
  }),


  filteredDeprecations: computed('flattenedDeprecations', 'from', 'to', function() {
    let deprecations = this.flattenedDeprecations;

    return deprecations.filter(deprecation => {
      return (deprecation.since >= this.selectedFrom) && (deprecation.since <= this.selectedTo);
    });
  }),
});
