// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

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

router.post('/users/create', function(req, res){
	var _nome = req.body.nome;
	var _cpf = req.body.cpf;
	var _email = req.body.email;
	var _idade = req.body.idade;

	var usuario = new User();
	
	usuario.nome = _nome;
	usuario.cpf = _cpf;
	usuario.email = _email;
	usuario.idade = _idade;

	usuario.save(function(err){
		if(err){
			res.status(500).json({
				sucesso: false,
				erro: err.message
			});
		}else{

			res.status(200).json({
				sucesso: true,
				mensagem: "Usuario cadastrado com sucesso"
			});


		}
	});
	
});

router.get('/users/list', function(req, res){
	User.find({}, function(err, usuarios){
		if(err){
			res.status(500).json({
				sucesso: false,
				erro: err.message
			});		
		}else{
			res.status(200).json({
				sucesso: true,
				dados: usuarios
			})
		}
	})
})

router.get('/users/search', function(req, res){
	var _nome = req.query.nome;
	User.find({nome: new RegExp(_nome, "i")}, function(err, usuarios){
		if(err){
			res.status(500).json({
				sucesso: false,
				erro: err.message
			});
		}else{
			res.status(200).json({
				sucesso: true,
				dados: usuarios
			})	
		}		
		
	})

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
mongoose.connect("mongodb://127.0.0.1:27017/db");

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
