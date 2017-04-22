var babelify = require('babelify');
var browserify = require('browserify-middleware');
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

var routes = {
  api: importRoutes('./api'),
  views: importRoutes('./views'),
};


// Setup Route Bindings
exports = module.exports = function(app) {

  keystone.pre('routes', middleware.initLocals);

  app.use('/js', browserify('./client/scripts', {
    transform: [
      babelify.configure({
        presets: ["es2015", "react", 'stage-0']
      })
    ]
  }));

  // API
  // app.get('/api/attendees/list', keystone.middleware.api, routes.api.attendees.list);
  app.get('/api/attendees/sendSaveTheDate', keystone.middleware.api, routes.api.attendees.sendSaveTheDate);
  app.get('/api/attendees/:id/open.gif', routes.api.attendees.trackSaveTheDateOpened);
  app.get('/api/attendees/:id', keystone.middleware.api, routes.api.attendees.get);

  app.post('/api/invitation/:code', keystone.middleware.api, routes.api.invitation.update);
  app.get('/api/invitation/:code', keystone.middleware.api, routes.api.invitation.get);
  // app.get('/api/tracks', keystone.middleware.api, routes.api.invitation.getTracks);

  // Index and
  app.get('/t/:id', middleware.trackAttendeePageView, routes.views.index);
  app.use(routes.views.index);
};
