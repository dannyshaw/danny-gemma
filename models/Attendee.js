var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Attendee = new keystone.List('Attendee',{
    defaultSort: 'createdAt',
});

Attendee.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, index: true },
  dietaryprefs: { type: Types.Select, options: [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenfree', label: 'Gluten Free' },
    { value: 'vegan-glutenfree', label: 'Vegan & Gluten Free' },
    { value: 'other', label: 'Other' }
  ], default: 'vegetarian'},
  dietaryother: { type: String },
  stitchin: { type: Boolean, label: 'Up for knitting some yarn bomb'},
  createdAt: { type: Date, default: Date.now, noedit: true }
});


Attendee.relationship({ path: 'tracks', ref: 'SpotifyTrack', refPath: 'attendee' });

transform.toJSON(Attendee);

Attendee.defaultColumns = 'name, email, savethedatesent, dietaryprefs';
Attendee.register();
