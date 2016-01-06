'use strict';

angular.module('DevTalk.allTalks', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/allTalks', {
            templateUrl: 'view_user/view_all_talks/view_all_talks.html',
            controller: 'AllTalksCtrl'
        });
    }])

    .controller('AllTalksCtrl', ['$scope', '$routeParams', '$location', 'EventService', 'UserService', 'RecommendationService', function ($scope, $routeParams, $location, EventService, UserService, RecommendationService) {
        $scope.onItemClick = function (e) {
			EventService.joinEvent(UserService.getCurrentUser().id,e.id);
           // $location.path('/talkDetails/' + e.id);
        };
        //console.info(EventService.getAll());
		$scope.data = EventService.getAll();
        $scope.highlighted = RecommendationService.getTalksForUser(UserService.getCurrentUser().id);
        //console.info('Recommended Talks');
        //console.info(RecommendationService.getTalksForUser(UserService.getCurrentUser().id));
        
		$scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];
    }]);