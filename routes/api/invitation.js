var keystone = require('keystone');
var Invitation = keystone.list('Invitation');
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
      attendee.dietaryprefs = attendeeData.dietaryprefs
      attendee.dietaryother = attendee.dietaryprefs === 'other'
        ? attendeeData.dietaryother
        : null
      ;
      attendee.save();
    })
    invitation.save();
    return true;
}

