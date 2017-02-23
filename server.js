// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var jwt = require('jsonwebtoken');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port




var User = require('./api/models/user.js');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    res.status(200).json({ message: 'hooray! welcome to our api!' });
});


router.post('/users/register', function(req, res){
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

})

router.post('/users/login',function(req,res){
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
});

router.get('/users/profile',function(req,res){
	if(req.decoded){
		res.status(200).json({
			name: req.decoded.name
		})
	}else{
		res.status(404).json({
			message: "Profile not found"
		})
	}
})
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api/users/profile', function(req, res, next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token){
			jwt.verify(token, 'MY_SECRET', function(err, decoded){
				if(err){
					res.status(500).json({
							message: 'Failed to authenticate token.'
					})
				}else{
					req.decoded = decoded;
					 next();
				}
			})
	}else{
		res.status(403).json({
  		message: 'No token provided.'
  	});
	}


})

app.use('/api', router);
mongoose.connect("mongodb://127.0.0.1:27017/db");

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
