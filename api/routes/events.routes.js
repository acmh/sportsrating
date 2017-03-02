var events = require('../../api/controllers/events.controller');

module.exports = function(router) {

	router.route('/event/create')
		.post(events.create);

};
