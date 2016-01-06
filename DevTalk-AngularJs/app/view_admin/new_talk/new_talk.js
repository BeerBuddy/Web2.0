'use strict';

angular.module('DevTalk.newTalk', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/newTalk', {
    templateUrl: 'view_admin/new_talk/new_talk.html',
    controller: 'NewTalkCtrl'
  });
}])

.controller('NewTalkCtrl', ['$scope', '$routeParams', '$location', 'EventService', function ($scope, $routeParams, $location, EventService) {
		$scope.onItemClick = function (e) {
            //$location.path('/talkDetails/' + e.id);
			$scope.edit="true";
			$scope.anEvent = EventService.getById(e.id);
			$scope.talk.id = $scope.anEvent.id;
			$scope.talk.name = $scope.anEvent.name;
			$scope.talk.location = $scope.anEvent.ort;
			$scope.talk.categorie = $scope.anEvent.kategorie;
			$scope.talk.start = new Date($scope.anEvent.datum.substring(3,6) + $scope.anEvent.datum.substring(0,3) + $scope.anEvent.datum.substring(6,10));
			$scope.talk.end = new Date($scope.anEvent.datum.substring(16,19) + $scope.anEvent.datum.substring(13,16) + $scope.anEvent.datum.substring(19,23));
        };
		$scope.prefixes = EventService.getPrefixes();
		$scope.data = EventService.getAll();
        $scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Location"},
                {"name": "datum", "title": "Date"},
                {"name": "kategorie", "title": "Categorie"}
            ];
			
        $scope.onCreate = function () {
			$scope.talk.id = "";
			$scope.anEvent = EventService.createEvent($scope.talk.id, $scope.talk.name, $scope.talk.location, $scope.talk.start, $scope.talk.end, $scope.talk.categorie);
			EventService.insert($scope.anEvent);
			$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
        }
		$scope.onEdit = function () {
			$scope.anEvent = EventService.createEvent($scope.talk.id, $scope.talk.name, $scope.talk.location, $scope.talk.start, $scope.talk.end, $scope.talk.categorie);
			EventService.update($scope.anEvent);
			$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
        }
		$scope.onDecline = function () {
			EventService.decline($scope.talk.id);
			$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
			$scope.edit = "";
        }
		$scope.onCancel = function () {
			$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
			$scope.edit = "";
        }
        }]);