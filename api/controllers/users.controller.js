var User = require('mongoose').model('User');

exports = module.exports = {};

exports.register = function(req, res){
  var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save(function(err){
			if(err){
				res.status(500).json({
					message: err.message
				})
			}else{
				User.findOne({email: user.email}, function(err, user){
					if(err){
						res.status(500).json({
							message: err.message
						})
					}

					if(!user){
						res.status(401).json({
							message: 'Authentication failed. User not found.'
						});
					}else{
						if(!user.validPassword(req.body.password)){
							res.status(401).json({
								success: false,
								message: 'Authentication failed. Wrong password.'
							});
						}else{
							var token = user.generateJwt();

							res.status(200).json({
							  	"token" : token,
						   		"username" : user.name
							});
						}
					}

				})
			}
	})
}

exports.login = function(req,res){
	var _email = req.body.email;
	User.findOne({email: _email}, function(err, user) {
		if(err){
			res.status(404).json(err);
			return;
		}

		//If there is no user with this email
		if(!user){
			res.status(401).json({
				success: false,
				message: 'Authentication failed. User not found.'
			});

		}else if(user){
			if(!user.validPassword(req.body.password)){
				res.status(401).json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			}else{
				var token = user.generateJwt();
				res.status(200);
				res.json({
				  	"token" : token,
			   		"username" : user.name
				});
			}
		}
	});
}

exports.update = function (req,res) {
		var user = req.decoded;
		var newEmail = req.body.email;
		if(typeof newEmail != 'undefined')
		User.findOne({email: newEmail}, function(err, user){
			if(!err){
				res.status(500).json({
					message: err.message
				})
			}
			if(!user){
				res.status(401).json({
					message: 'Authentication failed. User not found.'
				});
			}

			user.email = req.body.email;
			res.status(401).json({
				message: 'Email Update!'
			});

		});

		var newPassword = req.body.password;
		if(typeof newPassword != 'undefined')
		user.setPassword(req.body.password);


	
		user.save(function(err){
			if(err){
				res.status(500).json({
					message: err.message
				})
			}
		});
	}