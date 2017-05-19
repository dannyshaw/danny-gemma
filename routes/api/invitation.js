var keystone = require('keystone');
var Invitation = keystone.list('Invitation');
var SpotifyTrack = keystone.list('SpotifyTrack');
var _ = require('underscore');
var async = require('async');

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

      const attendees = [];
      async.eachOf(invitation.attendees, (attendee, index, callback) => {
        SpotifyTrack.model.find().where('attendee', attendee.id).exec((err, tracks) => {
          const att = attendee.toObject();
          att.tracks = tracks;
          attendees.push(att);
          callback()
        })
      }, (err) => {
        if (err) {
          return res.apiError('not found');
        }
        // such hack
        const invite = invitation.toObject();
        invite.attendees = attendees;
        res.apiResponse({
          invitation: invite
        });
      })

    });
}

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
    invitation.eta = data.eta;
    invitation.sunday = data.sunday;


    async.eachOf(invitation.attendees, (attendee, index, callback) => {
      const attendeeData = _.find(data.attendees, att => att._id == attendee._id);
      SpotifyTrack.model.find().where('attendee', attendee.id).exec((err, existingTracks) => {
        processAttendee(attendee, attendeeData, existingTracks);
      })
    })
    invitation.save();
    return true;
}

function processAttendee(attendee, data, existingTracks) {
  attendee.dietaryprefs = data.dietaryprefs
  attendee.dietaryother = attendee.dietaryprefs === 'other'
    ? data.dietaryother
    : null
  ;
  attendee.stitchin = data.stitchin;
  attendee.save();

  // delete tracks not in the incoming list
  const newIds = data.tracks.map(track => track.id);
  async.eachOf(existingTracks, (track, index, callback) => {
    if (newIds.indexOf(track.id) < 0)
      track.remove((err) => {
        callback();
      });
  });

  //save the rest (no dups will be created)
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
      const newTrack = SpotifyTrack.model(track)
      newTrack.attendee = attendee;
      newTrack.save();
    }
  })
}

