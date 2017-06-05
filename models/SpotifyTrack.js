var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var SpotifyTrack = new keystone.List('SpotifyTrack',{
    defaultSort: 'createdAt',
});

SpotifyTrack.add({
  title: { type: String },
  artist: { type: String },
  spotifyId: { type: String, unique: true },
  spotifyUri: { type: String },
  attendee: { type: Types.Relationship, ref: 'Attendee' },
});

transform.toJSON(SpotifyTrack);

SpotifyTrack.defaultColumns = 'title, artist, attendee, spotifyUri';
SpotifyTrack.register();
