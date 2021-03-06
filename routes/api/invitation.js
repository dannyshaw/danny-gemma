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
          delete att.email;
          attendees.push(att);
          callback()
        })
      }, (err) => {
        if (err) {
          return res.apiError('not found');
        }
        // such hack
        const invite = invitation.toObject();
        delete invite.address;
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
  }).exec((err, existingTrack) => {
    if (err) {
      return res.apiError('database error', err);
    }
    debugger

    if(!existingTrack) {
      const newTrack = SpotifyTrack.model(track)
      newTrack.attendee = attendee;
      newTrack.save();
    }
  })
}


exports.getTracks = function(req, res) {
  SpotifyTrack.model
    .find()
    .populate('attendee')
    .exec((err, tracks) => {
      if (err) {
        return res.apiError('database error', err);
      }

      res.apiResponse({ tunes: tracks });

    })
}

function getInvites(where, callback) {
  Invitation.model
    .find(where)
    .populate('attendees')
    .exec((err, invitations) => {
      if (err) {
        return res.apiError('database error', err);
      }

      const emails = invitations.reduce((acc, invitation) => {
        return acc.concat(invitation.attendees.map(attendee => attendee.email))
      }, [])

      callback(emails)
    })
  ;
}

exports.getNoResponse = function(req, res) {
  const epoch = new Date('2017/6/07 01:00')
  getInvites({ updatedAt: { $lt: epoch } }, emails => {
    res.apiResponse({ emails: emails });
  })
}

exports.getAccomSet = function(req, res) {
  const epoch = new Date('2017/6/07 01:00')
  getInvites({
    updatedAt: { $gt: epoch },
    accommodation: { $ne: null },
  }, emails => {
    res.apiResponse({ emails: emails });
  })
}

exports.getNoAccomSet = function(req, res) {
  const epoch = new Date('2017/6/07 01:00')
  getInvites({
    updatedAt: { $gt: epoch },
    accommodation: null,
  }, emails => {
    res.apiResponse({ emails: emails });
  })
}

