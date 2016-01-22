var app = angular.module('DevTalk.recommendation', []);

app.factory('RecommendationService', ['EventService','$q', function(eventService,$q) {
    var srv = {};

    srv.getTalksForUser = function(userId) {
		return $q(function(resolve, reject) {
			 if(!userId) 
				reject('Missing param userId');

        var allEvents = eventService.query(function(allEvents){
			eventService.query({'teilnehmer': userId}, function(visitedEvents){
				
				var recommendedEvents = [];
				var visitedEventIds = [];
				for(var visitedEvent of visitedEvents) {
					visitedEventIds.push(visitedEvent._id);
				}

				for(var visitedEvent of visitedEvents) {
				   for(var talkEvent of allEvents) {
						if(visitedEvent._id != talkEvent._id && visitedEvent.kategorie == talkEvent.kategorie && visitedEventIds.indexOf(talkEvent._id) === -1) {
							recommendedEvents.push(talkEvent);
							visitedEventIds.push(talkEvent._id);
						}
					}
				}

				resolve(recommendedEvents);
				
			});
		});
		});
    };

    return srv;
}]);