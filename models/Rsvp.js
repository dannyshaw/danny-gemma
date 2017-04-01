var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Rsvp = new keystone.List('Rsvp',{
    defaultSort: 'createdAt'
});

Rsvp.add({
  invitation: { type: Types.Relationship, ref: 'Invitation', required: true, initial:true },
  attendeePreferences: { type: Types.Relationship, ref: 'AttendeePreferences', many: true},
  attending: { type: Boolean, required: true, default: true },
  accommodation: { type: Types.Relationship, ref: 'Accommodation' },
  createdAt: { type: Date, default: Date.now, noedit: true },
});

// transform.toJSON(Rsvp);

Rsvp.defaultColumns = 'code, antendees';
Rsvp.register();
