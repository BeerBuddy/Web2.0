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

    .controller('ProfileCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'EventService', function ($scope, $routeParams, $location, UserService, EventService) {
        if($routeParams.userid)
        {
            $scope.user = UserService.getUserById($routeParams.userid);
			$scope.editable=false;
        }
        else{
            $scope.user = UserService.getCurrentUser();
            $scope.editable=true;
        }
		
		$scope.data = EventService.getAll({'teilnehmer':$scope.user.id} );

        $scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];
        $scope.highlighted = [];
        $scope.onsave = function (user) {
			console.info("Update User: "+user);
            UserService.update(user);
        };

        $scope.onItemClick = function (e) {
            $location.path('/talkDetails/' + e.id)
        };
    }])
;