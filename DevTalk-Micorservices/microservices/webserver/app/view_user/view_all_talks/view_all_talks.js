'use strict';

angular.module('DevTalk.allTalks', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/allTalks', {
            templateUrl: 'view_user/view_all_talks/view_all_talks.html',
            controller: 'AllTalksCtrl'
        });
    }])

    .controller('AllTalksCtrl', ['$scope', '$routeParams', '$location', '$filter', 'EventService', 'UserService', 'RecommendationService', function ($scope, $routeParams, $location, $filter, EventService, UserService, RecommendationService) {
       
        $scope.user = UserService.getCurrentUser();
       
        $scope.onItemClick = function (e) {
			$location.path('/talkDetails/' + e._id);
        };

		$scope.data = EventService.query(function(data)
		{
			data.forEach(function(event){
				if(event.datumVon)
				{
					var von = $filter('date')( event.datumVon , "dd.MM.yyyy");
					event.datum = von + (event.datumBis ? '-'+ $filter('date')(event.datumBis , "dd.MM.yyyy") : '');
				}
				//if(event.kategorie)
				//event.kategorie = event.kategorie.name;
			});
			
		});

        if($scope.user._id) {
            $scope.highlighted = RecommendationService.query({userId: $scope.user._id},function(data)
    		{
    			data.forEach(function(event){
    				if(event.datumVon)
    				{
    					var von = $filter('date')( event.datumVon , "dd.MM.yyyy");
    					event.datum = von + (event.datumBis ? '-'+ $filter('date')(event.datumBis , "dd.MM.yyyy") : '');
    				}
    				//if(event.kategorie)
    				//event.kategorie = event.kategorie.name;
    			});
    			
    		});
        } else {
            $scope.highlighted = [];
        }

		$scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];
    }]);