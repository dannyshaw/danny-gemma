var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Accommodation = new keystone.List('Accommodation',{
    defaultSort: 'createdAt'
});

Accommodation.add({
  name: { type: String, required: true, initial: true },
  description: { type: Types.Textarea, required: true, initial: true },
  price: { type: Types.Money, default: 0 }
});

// transform.toJSON(Invitation);

Accommodation.defaultColumns = 'code, antendees';
Accommodation.register();
