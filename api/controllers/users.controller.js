var User = require('mongoose').model('User');

exports = module.exports = {};

exports.register = function(req, res){
  var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
  user.nickname = req.body.nickname;
	user.rating = req.body.rating;
  user.position = req.body.position;
	user.last_game = new Date(req.body.last_game);
  user.entry_date = new Date(req.body.entry_date);
	user.goals = req.body.goals;
  user.matches = req.body.matches;
  user.cards = req.body.cards;
  user.age = req.body.age;
  user.weight = req.body.weight;
  user.height = req.body.height;
  user.assists = req.body.assists;
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

exports.profile_nickname = function(req, res){
  var nickname = req.params.nickname;

  User.findOne({nickname: nickname}, function(err, user){
    if(err){
      res.status(404).json({erro: err.message});
      return;
    }

    if(!user){
      res.status(401).json({
        message: "Authentication failed. User not found."
      })
    }
    else if(user){
      var goals_match = 0;

      if(user.matches > 0){
        goals_match = user.goals/user.matches
      }

      res.status(200).json({
        nickname: user.nickname,
        email: user.email,
        rating: user.rating,
        position: user.position,
        last_game: user.last_game,
        entry_date: user.entry_date,
        age: user.age,
        weight: user.weight,
        height: user.height,
        assists: user.assists,
        goals_match: goals_match
      });
    }
  });
}
