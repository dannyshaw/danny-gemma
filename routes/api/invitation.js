var keystone = require('keystone');
var Invitation = keystone.list('Invitation');
var SpotifyTrack = keystone.list('SpotifyTrack');
var _ = require('underscore');

exports.get = function(req, res) {
  Invitation.model
    .findOne({'code': req.params.code})
    .populate('attendees')
    .exec(function(err, invitation) {
      if (err) {
        return res.apiError('database error', err);
      }
      if (!invitation) {
        return res.apiError('not found');
      }

      res.apiResponse({
        invitation: invitation
      });

    });
}

/**
 * Update Invitation with RSVP data

 {
    attending: true,
    accommodation: 'glamping',
    allsame: true,
    attendees: [
      '12gh1g2f4jh1gf24': {
        dietaryprefs: 'other'
        dietaryother: 'ojnkjnw'
      },
      'kjhfkjwhefkwejhf': {
        dietaryprefs: 'vegan'
      }
    ]
 }

 */



exports.update = function(req, res) {
  Invitation.model
    .findOne({'code': req.params.code})
    .populate('attendees')
    .exec(function(err, invitation) {
      if (err) {
        return res.apiError('database error', err);
      }
      if (!invitation) {
        return res.apiError('not found');
      }
      if(processRsvp(invitation, req.body)) {
        return res.apiResponse("OK")
      } else {
        return res.apiError('error saving');
      }
    })
  ;
}

function processRsvp(invitation, data) {
    invitation.attending = data.attending;
    invitation.message = data.message;
    invitation.accommodation = data.accommodation;
    invitation.attendees.forEach(attendee => {
      const attendeeData = _.find(data.attendees, att => att.id == attendee._id);
      processAttendee(attendee, attendeeData);
    })
    invitation.save();
    return true;
}

function processAttendee(attendee, data) {
  attendee.dietaryprefs = data.dietaryprefs
  attendee.dietaryother = attendee.dietaryprefs === 'other'
    ? data.dietaryother
    : null
  ;
  attendee.save();

  if (data.tracks && data.tracks.length) {
    data.tracks.forEach(track => {
      saveTrack(track, attendee);
    });
  }
}

function saveTrack(track, attendee) {
  SpotifyTrack.model.findOne({
    'spotifyId': track.spotifyId
  }).exec((err, invitation) => {
    if (err) {
      return res.apiError('database error', err);
    }

    if(!invitation) {
      const newTrack = Spotify.model(track)
      newTrack.attendee = attendee;
      newTrack.save();
    }
  })
}

