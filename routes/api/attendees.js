var keystone = require('keystone');
var Attendee = keystone.list('Attendee');
var sendSaveTheDate = require('../../emails/lib/sendSaveTheDate');
/**
 * List Attendees
 */

//TODO: needs auth
// exports.list = function(req, res) {
//   Attendee.model.find(function(err, items) {

//     if (err) return res.apiError('database error', err);

//     res.apiResponse({
//       attendees: items
//     });

//   });
// };


exports.get = function(req, res) {
  Attendee.model.findById(req.params.id).exec(function(err, attendee) {
    if (err) return res.apiError('database error', err);
    if (!attendee) return res.apiError('That invite code was not found.');

    res.apiResponse({
      attendee: attendee
    });

  });
}


exports.sendSaveTheDate = function(req, res) {
  Attendee.model
    .find(
      // {
      //   email: {
      //     $in: [
      //       'technix@gmail.com',
      //       'gemma.neylon.84@gmail.com',
      //     ]
      //   }
      // }
    )
    // .where('email', process.env.TEST_EMAIL || '') //TODO remove
    .exec(function(err, attendees) {
      sendSaveTheDate(attendees, function (errors, results) {
        res.apiResponse({
          err: errors,
          results: results,
        });
      });
    });
}


exports.trackSaveTheDateOpened = function(req, res) {

  // 1x1 transparent gif
  var buf = new Buffer(35);
  buf.write("R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");

  Attendee.model.findById(req.params.id).exec(function(err, attendee) {
    if (attendee) {
      attendee.savethedateopens++;
      attendee.save(function(err) {
        res.send(buf, { 'Content-Type': 'image/gif' }, 200);
      })
    } else {
      res.send(buf, { 'Content-Type': 'image/gif' }, 200);
    }
  });
}
