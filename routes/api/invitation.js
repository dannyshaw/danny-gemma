
var keystone = require('keystone');
var Invitation = keystone.list('Invitation');

exports.get = function(req, res) {
  Invitation.model
  	.find()
  	.where('code', req.params.code)
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
