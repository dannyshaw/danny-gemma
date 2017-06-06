var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;
var Invitation = new keystone.List('Invitation',{
    track: true,
    defaultSort: '-firstAccessed',
    drilldown: 'attendees'
});

Invitation.add({
  code: { type: String, required: true, index: true, initial: true },
  address: { type: String },
  attendees: { type: Types.Relationship, ref: 'Attendee', many: true },
  attending: { type: Boolean, default: true },
  eta: { type: Types.Select, options: [
    { value: 'friday-eve', label: 'Friday Evening After 6' },
    { value: 'saturday-morning', label: 'Saturday Morning After 11' },
  ]},
  sunday: { type: Boolean, default: true },
  message: { type: Types.Textarea },
  accommodation: { type: Types.Select, options: [
    { value: 'dorm', label: 'Dorm Bunk' },
    { value: 'byocamp', label: 'BYO Camping' },
    { value: 'glamping', label: 'Glamping Bell Tent' },
    { value: 'caravanpark', label: 'Caravan Park Cabin' },
    { value: 'other', label: 'Other' },
  ]},
  firstAccessed: { type: Date, noedit: true, meta: true }
});

Invitation.schema.path('accommodation').set(function (newVal) {
  var originalVal = this.accommodation;
  this._weHaveAGlamper
  if (originalVal !== newVal && newVal === 'glamping') {
    this._weHaveAGlamper = newVal;
  }
  return newVal;
});

Invitation.schema.pre('save', function (next) {

  if (!this.firstAccessed) {
    this.firstAccessed = Date.now();
  }
  // we need to know the order of people selecting glampers incase we run out
  var Glamper = keystone.list('Glamper');
  if (this._weHaveAGlamper) {
    const save = new Glamper.model({
      who: this.attendees.map(attendee => attendee.name.first).join('&'),
      invitation: this,
    }).save((err) => {
      next()
    });
  } else {
    next()
  }
})

// transform.toJSON(Invitation);

Invitation.defaultColumns = 'code, attendees, attending, accommodation';
Invitation.register();
