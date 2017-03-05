var keystone = require('keystone');
var Email = require('keystone-email');
var async = require('async');

var Attendee = keystone.list('Attendee');

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
    if (!attendee) return res.apiError('not found');

    res.apiResponse({
      attendee: attendee
    });

  });
}


function sendSaveTheDate(attendees, req, done){

  var nodemailerTransport = {
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME || '',
        pass: process.env.GMAIL_PASSWORD || ''
    }
  };
  var mailer = new Email('savethedate.pug', {
    transport: 'nodemailer',
    root: 'emails',
  });

  async.series(attendees.map(attendee => callback => {
    if (!attendee.savethedatesent) {
      var options = {
        from: process.env.FROM_ADDRESS || "test@example.com",
        to: {
          email: attendee.email,
          name: `${attendee.name.first} ${attendee.name.last}`,
        },
        subject: 'Save The Date!',
        nodemailerConfig: nodemailerTransport,
      };

      const attendeeId = attendee._id.toHexString();
      const baseUrl = process.env.BASE_URL;

      mailer.send({
        name: attendee.name,
        webUrl: baseUrl,
        personalisedUrl: `${baseUrl}/t/${attendeeId}`,
        openTracker: `${baseUrl}/api/attendees/${attendeeId}/open.gif`,
      }, options, (err) => {
        if (!err) {
          attendee.savethedatesent = true
          attendee.save(function (err) {
            callback(null, `Email sent to ${attendee.email}`);
          })
        } else {
          callback(err);
        }
      });
    }
    else {
      callback(null, `Already sent to ${attendee.email}`);
    }
  }), function(err, res) {
    done(err, res)
  });
}

exports.sendSaveTheDate = function(req, res) {
  Attendee.model
    .find()
    .where('email', process.env.TEST_EMAIL || '') //TODO remove
    .exec(function(err, attendees) {

      sendSaveTheDate(attendees, req, function (errors, results) {
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
