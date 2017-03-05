var keystone = require('keystone');
var Attendee = keystone.list('Attendee');
/**
    Initialises the standard view locals.
*/
exports.initLocals = function(req, res, next) {
  var locals = res.locals;
  locals.rsvpEmail = process.env.RSVP_ADDRESS || ''
  locals.user = req.user;
  next();
};

// if a user tracking parameter is found, log a page visit and redirect to root
exports.trackAttendeePageView = function(req, res, next) {
  if(req.params.id) {
    Attendee.model.findById(req.params.id).exec(function(err, attendee) {
      if (err) return res.apiError('database error', err);
      if (attendee) {
        data = { pagevisits: attendee.pagevisits + 1 }
        attendee.getUpdateHandler(req).process(data);
        res.cookie('attendeeId', attendee._id.toHexString())
        res.redirect(302, '/');
        return
      } else {
        res.cookie('attendeeId', null)
      }
    });
  } else {
    next();
  }
}
