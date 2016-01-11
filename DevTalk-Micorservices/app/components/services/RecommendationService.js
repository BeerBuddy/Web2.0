var app = angular.module('DevTalk.recommendation', ['DevTalk.common1']);

app.factory('RecommendationService', ['EventService', function(eventService) {
    var srv = {};

    srv.getTalksForUser = function(userId) {
       if(!userId) 
            return [];

        var allEvents = eventService.getAll();
        var visitedEvents = eventService.getEventsByUserId(userId);

        //console.debug(allEvents);
        //console.debug(visitedEvents);

        var recommendedEvents = [];
        var visitedEventIds = [];
        for(var visitedEvent of visitedEvents) {
            visitedEventIds.push(visitedEvent.id);
        }

        for(var visitedEvent of visitedEvents) {
           for(var talkEvent of allEvents) {
                if(visitedEvent.id != talkEvent.id && visitedEvent.kategorie == talkEvent.kategorie && visitedEventIds.indexOf(talkEvent.id) === -1) {
                    recommendedEvents.push(talkEvent);
                    visitedEventIds.push(talkEvent.id);
                }
            }
        }


        /*for(var talkEvent of allEvents) {
            for(var userEvent of visitedEvents) {
                console.info(talkEvent);
                console.info(userEvent);
                if(userEvent.id != talkEvent.id && userEvent.kategorie == talkEvent.kategorie) {
                    recommendedEvents.push(talkEvent);
                    console.info('#Success');
                }
            }
        }*/
        return recommendedEvents;
    };

    return srv;
}]);