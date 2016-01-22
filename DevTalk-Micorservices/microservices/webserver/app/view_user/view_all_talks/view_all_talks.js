﻿'use strict';

angular.module('DevTalk.allTalks', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/allTalks', {
            templateUrl: 'view_user/view_all_talks/view_all_talks.html',
            controller: 'AllTalksCtrl'
        });
    }])

    .controller('AllTalksCtrl', ['$scope', '$routeParams', '$location', 'EventService', 'UserService', 'RecommendationService', function ($scope, $routeParams, $location, EventService, UserService, RecommendationService) {
        $scope.onItemClick = function (e) {
			$location.path('/talkDetails/' + e._id);
        };

		$scope.data = EventService.query(function(data)
		{
			data.forEach(function(event){
				if(event.datumVon)
				{
					var von = $filter('date')(date[ event.datumVon , "dd.MM.yyyy HH:mm"]);
					event.datum = von + (event.datumBis ? '-'+ $filter('date')(date[ event.datumBis , "dd.MM.yyyy HH:mm"]) : '');
				}
				
			});
			
		});
        $scope.highlighted = RecommendationService.getTalksForUser(UserService.getCurrentUser().id);
        
		$scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];
    }]);