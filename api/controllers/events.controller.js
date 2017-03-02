var Events = require('mongoose').model('Events');

exports = module.exports = {};

exports.create = function(req, res){
	var matchEvent = new Events();
	matchEvent.dateStart = req.body.dateStart;
	matchEvent.dateEnd = req.body.dateEnd;
	matchEvent.name = req.body.name;
	matchEvent.address = req.body.address;
	matchEvent.usersIn = req.body.usersIn;
	matchEvent.description = req.body.description;
	matchEvent.price = req.body.price;
	matchEvent.weather = req.body.weather;
	matchEvent.teamSize = req.body.teamSize;
	matchEvent.usersArrived = req.body.usersArrived;
	matchEvent.usersPaid = req.body.usersPaid;

	matchEvent.save(function(err){
		if(err){
			res.status(500).json({
				message: "Error saving on database. " + err.message
			})
		}else{
			Events.findOne({name: matchEvent.name}, function(err, _matchEvent){
				if(err){
					res.status(500).json({
						message: err.message
					})
				}

				if(!_matchEvent){
					res.status(401).json({
						message: 'Event not found.'
					});
				}else{
					res.status(200).json({
						"name" : _matchEvent.name,
						"description" : _matchEvent.description
						});
					}
				}
			)
		}
	})
}

exports.listAllEvents = function(req, res){

	Events.find({}, function(err, events) {

		if(err){
			res.status(404).json(err);
			return;
		}

		if(!events){
			res.status(401).json({
				success: false,
				message: 'Events not found.'
			});
		}else if(events){
			var eventsMap = {};
			
			for (i = 0; i < events.length; i++) 
			{
    			eventsMap[i] = events;
			}
		
			res.status(200).json({
				events : eventsMap
			});
			
			//res.send(eventsMap);
		}
	});
};
