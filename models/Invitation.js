var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Invitation = new keystone.List('Invitation',{
    defaultSort: 'createdAt',
    track: true,
    drilldown: 'attendees',
});

Invitation.add({
  code: { type: String, required: true, index: true, initial: true },
  address: { type: String },
  attendees: { type: Types.Relationship, ref: 'Attendee', many: true },
  attending: { type: Boolean },
  eta: { type: Types.Select, options: [
    { value: 'friday-eve', label: 'Friday Evening After 6' },
    { value: 'saturday-morning', label: 'Saturday Morning After 11' },
  ]},
  sunday: { type: Boolean },
  message: { type: Types.Textarea },
  accommodation: { type: Types.Select, options: [
    { value: 'dorm', label: 'Dorm Bunk' },
    { value: 'byocamp', label: 'BYO Camping' },
    { value: 'glamping', label: 'Glamping Bell Tent' },
    { value: 'caravanpark', label: 'Caravan Park Cabin' },
    { value: 'other', label: 'Other' },
  ]}
});

// transform.toJSON(Invitation);

Invitation.defaultColumns = 'code, attendees';
Invitation.register();
