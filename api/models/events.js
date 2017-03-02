var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = new Schema({
	dateStart: { type: Date, default: Date.now},
	dateEnd: { type: Date, default: Date.now + 60*60*1000 },
	name: { type: String },
	price: { type: Number },
	weather: { type: String },
	address: { type: String },
	description: { type: String },
	teamSize: { type: Number},
	usersIn: [{ type: Schema.Types.ObjectId, ref: 'User', default: {} }],
	usersArrived: [{ type: Schema.Types.ObjectId, ref: 'User', default: {}}],
	usersPaid: [{ type: Schema.Types.ObjectId, ref: 'User', default: {}}]
});


module.exports = mongoose.model('Events', EventsSchema);
