var app = angular.module('DevTalk.recommendation', []);

app.factory('RecommendationService', function($http) {
    var srv = {};

    srv.getTalksForUser = function(userId) {
       if(!userId) 
            return [];

        //$http.get('http://localhost:8554/api/event/visited/user/' + userId)
        $http({
            url: 'http://localhost:8550/api/recommendation/user/' + userId,
            method: "GET"
        }).then(function success(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.info(response);
            }, function error(response) {
                console.info('fail');
                console.info(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        var allEvents = [];//eventService.getAll();
        var visitedEvents = [];//eventService.getEventsByUserId(userId);

        //console.debug(allEvents);
        //console.debug(visitedEvents);

        var recommendedEvents = [];
        /*var visitedEventIds = [];
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
});