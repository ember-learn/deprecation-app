import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  title: DS.attr('string'),
  until: DS.attr('string'),
  since: DS.attr('string')
});
