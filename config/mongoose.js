var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	//mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);

	require('../api/models/user.js');

	return db;
};
