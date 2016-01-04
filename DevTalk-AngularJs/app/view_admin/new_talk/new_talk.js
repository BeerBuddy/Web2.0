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
            $location.path('/talkDetails/' + e.id)
        };
		$scope.prefixes = EventService.getPrefixes();
		$scope.data = EventService.getAll();
        $scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];
			
        $scope.onSave = function () {
			$scope.newEvent = EventService.createEvent($scope.talk.name, $scope.talk.location, $scope.talk.start, $scope.talk.end, $scope.talk.categorie);
			EventService.insert($scope.newEvent);
			alert("Event " + $scope.newEvent.name + " wurde erstellt."); 
			$scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
            }
        }]);