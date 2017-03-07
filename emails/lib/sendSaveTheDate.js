var Email = require('keystone-email');
var async = require('async');


module.exports = function sendSaveTheDate(attendees, done){

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
