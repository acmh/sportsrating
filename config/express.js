var express    = require('express');        // call express

var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var jwt = require('jsonwebtoken');




var port = process.env.PORT || 8080;        // set our port

module.exports = function(){
  var app        = express();   // define our app using express

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  //Put other routes definitions here
  require('../api/routes/users.routes.js')(app);
  require('../api/routes/events.routes.js')(app);

  return app;
};
