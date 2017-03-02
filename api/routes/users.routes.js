var users = require('../../api/controllers/users.controller');

module.exports = function(app) {

	app.route('/api/users/register')
		.post(users.register);

	app.route('/api/users/login')
		.post(users.login);
};
