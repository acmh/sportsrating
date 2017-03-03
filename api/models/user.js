var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new Schema({
	email: { type: String, unique: true, trim: true },
	name: {type: String, trim: true},
	nickname: {type: String, unique: true, trim: true},
	rating: {type: Number},
	position: {type: [String], trim: true},
	last_game: {type: Date},
	entry_date: {type: Date},
	goals: {type: Number},
	matches: {type: Number},
	cards: {type: [Number]},
	age: {type: Number},
	weight: {type: Number},
	height: {type: Number},
	assists: {type: Number},
	password: String,
	salt: String
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.password === hash;
};

//Generate a token with some extra informations (like expire time)
UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', UserSchema);
