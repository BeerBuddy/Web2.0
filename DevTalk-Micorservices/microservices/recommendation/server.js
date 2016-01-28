var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var request = require('request');

var settings = require("../settings.json");
var Event = require('./model/event');
var Kategorie = require('./model/Kategorie');

// Connect to Event DB
mongoose.connect(settings.eventService.db.protocol + '://' + settings.eventService.db.ip + ':' + settings.eventService.db.port + '/' + settings.eventService.db.schema);

var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/recommendations/:userId', function(req, res){
	//get where teilnehmer = ?
	console.log("Teilnehmer " + req.headers.user);

	request(settings.eventService.rest.protocol + '://' + settings.eventService.rest.ip + ':' + settings.eventService.rest.port + '/events?teilnehmer=' + req.params.userId, 
		function (error, response, body) {
			if (!error && response.statusCode == 200 && body) {
				var events = JSON.parse(body);
				if(events.length > 1) {
					res.send([events[0], events[events.length - 1]]); 
				} else {
					res.sendStatus(204);
				}
			}
	});

	/*Event.find({teilnehmer : req.params.userId}).distinct('kategorie').count(function(err, event) {
		if (err)
			res.status(500).send(err);
		else
			console.log(event);
	});*/

	// Fetch Kategorie and number of visits for current user
	Event.aggregate({$match: {teilnehmer : {$eq: req.params.userId}}}, {$group: {_id: '$kategorie', totalVisits: {$sum: 1}}}, {$sort: {totalVisits: -1}}, function(err, res) {
		if(err) {
			console.log('Schade, fail');
			console.log(err);
		} else {
			console.log(res);
		}
	});

	console.log("Get ");
	console.log(req.query);
	//res.json('Foo');
});


app.listen(settings.recommendationService.rest.port, function() {
  console.log('Amazing recommendation service running at http://127.0.0.1:' + settings.recommendationService.rest.port + '/');
});
