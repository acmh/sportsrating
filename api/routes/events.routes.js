var events = require('../../api/controllers/events.controller');

module.exports = function(app) {
  app.route('/api/events/delete')
		.post(events.delete);
};
