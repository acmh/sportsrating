var users = require('../../api/controllers/users.controller');

module.exports = function(app) {

	app.route('/register')
		.post(users.register);

	app.route('/login')
		.post(users.login);
};
