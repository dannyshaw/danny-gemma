var keystone = require('keystone');
var Request = require('superagent');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);

  var clientId = process.env.SPOTIFY_CLIENT_ID;
  var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

	var auth = new Buffer(clientId + ':' + clientSecret).toString('base64')
	debugger
  Request
    .post('https://accounts.spotify.com/api/token')
    .set('Authorization', `Basic ${auth}`)
    // .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('grant_type=client_credentials')
      // client_id: process.env.SPOTIFY_CLIENT_ID,
      // client_secret: process.env.SPOTIFY_SECRET_KEY,
    // })
    .end((err, result) => {
      if (err) {
        doRender()
      } else {
        doRender(result.body.access_token)
      }
    })
  ;

  function doRender(token) {
  	const locals = res.locals;
  	locals.spotifyToken = token;
  	view.render('index');
  }
};
