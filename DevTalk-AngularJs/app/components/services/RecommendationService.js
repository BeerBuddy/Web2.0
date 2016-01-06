var app = angular.module('DevTalk.recommendation', ['DevTalk.common1']);

app.factory('RecommendationService', ['EventService', function(eventService) {
    var srv = {};

    srv.getTalksForUser = function(userId) {
       if(!userId) 
            return;

        var allEvents = eventService.getAll();
        var visitedEvents = eventService.getEventsByUserId(userId);

        var recommendedEvents = [];
        for(var talkEvent of allEvents) {
            for(var userEvent of visitedEvents) {
                if(userEvent.id != talkEvent.id && userEvent.kategorie == talkEvent.kategorie) {
                    recommendedEvents.push(talkEvent);
                }
            }
        }
        return recommendedEvents;
    };

    return srv;
}]);