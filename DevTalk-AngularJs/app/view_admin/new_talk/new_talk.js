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
		$scope.data = EventService.getAll();
		$scope.talk = $scope.data[0];
        $scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Ort"},
                {"name": "datum", "title": "Datum"},
                {"name": "kategorie", "title": "Kategorie"}
            ];
    }]);