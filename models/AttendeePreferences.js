var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var AttendeePreferences = new keystone.List('AttendeePreferences',{
    defaultSort: 'createdAt',

});

AttendeePreferences.add({
  attendee: { type: Types.Relationship, ref: 'Attendee', required: true, initial:true },
  dietary: { type: Types.Select, numeric: true, options: [
    { value: 'whatever', label: 'Whatever' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenfree', label: 'Gluten Free' },
    { value: 'other', label: 'Other' }
  ]},
  createdAt: { type: Date, default: Date.now, noedit: true },
});

// transform.toJSON(AttendeePreferences);

AttendeePreferences.defaultColumns = 'code, antendees';
AttendeePreferences.register();
