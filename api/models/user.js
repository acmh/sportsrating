var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	cpf: String,
	email: String,
	nome: String,
	idade: Number
});

module.exports = mongoose.model('User', UserSchema);
