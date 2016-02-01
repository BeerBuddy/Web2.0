'use strict';

angular.module('DevTalk.profile', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/:userid', {
            templateUrl: 'view_user/profile/profile.html',
            controller: 'ProfileCtrl'
        });
        $routeProvider.when('/profile', {
            templateUrl: 'view_user/profile/profile.html',
            controller: 'ProfileCtrl'
        });
    }])

    .controller('ProfileCtrl', ['$scope', '$routeParams', '$location', '$filter','UserService', 'EventService', 'RecommendationService', function ($scope, $routeParams, $location, $filter,UserService, EventService, RecommendationService) {
        
		$scope.getEvents = function()
		{
			$scope.data = EventService.query({'teilnehmer':$scope.user._id} , function(data)
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
		}
		
		if($routeParams.userid)
        {
            $scope.user = UserService.getUserById($routeParams.userid).then(function(){
				$scope.getEvents();
			});
			$scope.editable=false;
        }
        else{
            $scope.user = UserService.getCurrentUser();
            $scope.editable=true;
			$scope.getEvents();
        }
		
        $scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];

        $scope.onsave = function (user) {
			console.info("Update User: "+user);
            UserService.update(user);
        };

        $scope.onItemClick = function (e) {
			$location.path('/talkDetails/' + e._id);
        };
    }])
;