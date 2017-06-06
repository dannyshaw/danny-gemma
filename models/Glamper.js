var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Glamper = new keystone.List('Glamper',{
    defaultSort: 'createdAt',
});

Glamper.add({
  who: { type: String, noedit: true },
  createdAt: { type: Date, default: Date.now, noedit: true }
});


transform.toJSON(Glamper);
Glamper.defaultColumns = '';
Glamper.register();
