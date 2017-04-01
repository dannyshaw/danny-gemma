var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Attendee = new keystone.List('Attendee',{
    defaultSort: 'createdAt'
});

Attendee.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, index: true },
  password: { type: Types.Password, initial: true },
  savethedatesent: { type: Boolean, label: 'Save The Date Sent' },
  savethedateopens: { type: Types.Number, label: 'Save The Date Opens', default: 0 },
  pagevisits: { type: Types.Number, label: 'Page Visits', default: 0 },
  createdAt: { type: Date, default: Date.now, noedit: true }
});

transform.toJSON(Attendee);

Attendee.defaultColumns = 'name, email, savethedatesent, savethedateopens, pagevisits';
Attendee.register();
