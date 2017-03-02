var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	//mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);
	//Adding Schemas to DB
	require('../api/models/user.js');
	require('../api/models/events.js');
	return db;
};
