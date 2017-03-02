var users = require('../../api/controllers/users.controller');

module.exports = function(router) {

	router.route('/users/register')
		.post(users.register);

	router.route('/users/login')
		.post(users.login);
};
