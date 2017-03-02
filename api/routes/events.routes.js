var events = require('../../api/controllers/events.controller');

module.exports = function(app) {

	app.route('/api/event/create')
		.post(events.create);
  
};
