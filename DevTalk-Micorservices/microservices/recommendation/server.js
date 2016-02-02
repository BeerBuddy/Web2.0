var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var request = require('request');
var async = require("async");

var settings = require("../settings.json");
var Event = require('./model/event');

const MAX_NUMBER_OF_RECOMMENDATIONS = 5;

// Connect to Event DB
mongoose.connect(settings.eventService.db.protocol + '://' + settings.eventService.db.ip + ':' + settings.eventService.db.port + '/' + settings.eventService.db.schema);

var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Lese Empfehlungen für einen User */
app.get('/recommendations/:userId', function(req, res){
	if(!req.headers.user || !req.params.userId) {
		res.send([]);
	} else {
		var recommendations = [];

		// Suche Events aus der Kategorie, die der Nutzer am häufigsten besucht hat
		Event.aggregate({$match: {teilnehmer : {$eq: req.params.userId}}}, {$group: {_id: '$kategorie', totalVisits: {$sum: 1}}}, {$sort: {totalVisits: -1}}, function(err, visitedCategories) {
			if(err) {
				console.log('Schade, fail');
				console.log(err);
				res.sendStatus(500);
			} else {
				console.log("Besuchte Kategorien des Nutzers " + req.params.userId);
				console.log(visitedCategories);
				async.each(visitedCategories, function(visitedCategory, callback) {
					Event.find({'kategorie': visitedCategory._id, 'teilnehmer' : {$ne: req.params.userId}}, function(err, similarEvents) {
						if(!err && similarEvents) {
							for(var similarEvent of similarEvents) {
								if(recommendations.length < MAX_NUMBER_OF_RECOMMENDATIONS) {
									recommendations.push(similarEvent);
								} else {
									break;
								}
							}
							console.log("Insgesamt " + similarEvents.length + " Empfehlungen für " + visitedCategory._id + " gefunden.");
						} else {
							console.log(err);
						}

						callback();				
					});
				}, function(err) {
					console.log("Suche abgeschlossen!");
					if(err) {
						console.log(err);
					}

					// Wenn keine passenden Events gefunden wurden, suche zufällige Events
					if(recommendations.length === 0) {
						console.log("Keine passenden Empfehlungen gefunden, suche zufällige Talks...");
						Event.find({'teilnehmer' : {$ne: req.params.userId}}).limit(2).exec(function(err, randomRecommendations) {
							res.send(randomRecommendations);
						});
					} else {
						res.send(recommendations);
					}
				});
			}
		});		
	}
});

/* Benachrichtige User beim Eintragen eines neuen Events */
app.post('/recommendations/mail/:eventId', function(req, res) {
	Event.findOne({'_id': req.params.eventId}, function(err, newEvent) {
		// Suche Events gleicher Kategorie
		console.log("Neues Event eingetragen: " + newEvent.name);
		console.log("Suche Teilnehmer der Kategorie " + newEvent.kategorie);
		Event.find({'kategorie': newEvent.kategorie}).distinct('teilnehmer', function(err, oldTeilnehmer) {
			if(!err) {
				for(var teilnehmer of oldTeilnehmer) {
					// Sende Mails via Mail-Service
					console.log("Send Mail to " + teilnehmer);
					var callback;
					//Versenden einer Update-Mail via Email-Service
					request.post({url:settings.emailService.rest.protocol + '://' + settings.emailService.rest.ip + ':' + settings.emailService.rest.port + '/email' , form: {mail:teilnehmer.email, name:teilnehmer.name, type:'RECOMMEND'}},callback);
				}
			}
		});
	});

	res.sendStatus(200);
});

app.listen(settings.recommendationService.rest.port, function() {
  console.log('Amazing recommendation service running at ' + settings.recommendationService.rest.protocol + '://' + 
  	settings.recommendationService.rest.ip + ':' + settings.recommendationService.rest.port  + '/');
});