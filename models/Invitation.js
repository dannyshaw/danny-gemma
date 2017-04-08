var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Invitation = new keystone.List('Invitation',{
    defaultSort: 'createdAt'
});

Invitation.add({
  code: { type: String, required: true, index: true, initial: true },
  attendees: { type: Types.Relationship, ref: 'Attendee', many: true },
  attending: { type: Boolean },
  accommodation: { type: Types.Select, options: [
    { value: 'dorm', label: 'Dorm Bunk' },
    { value: 'byocamp', label: 'BYO Camping' },
    { value: 'glamping', label: 'Glamping Bell Tent' },
    { value: 'caravanpark', label: 'Caravan Park Cabin' },
    { value: 'notstaying', label: 'Not Staying' },
  ]},
  createdAt: { type: Date, default: Date.now, noedit: true },
});

// transform.toJSON(Invitation);

Invitation.defaultColumns = 'code, attendees';
Invitation.register();