'use strict';

angular.module('DevTalk.allTalks', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/allTalks', {
            templateUrl: 'view_user/view_all_talks/view_all_talks.html',
            controller: 'AllTalksCtrl'
        });
    }])

    .controller('AllTalksCtrl', ['$scope', '$routeParams', '$location', 'EventService', function ($scope, $routeParams, $location, EventService) {
        $scope.onItemClick = function (e) {
            $location.path('/talkDetails/' + e.id)
        };
        $scope.events = EventService.getAll();
        $scope.highlighted = [];
    }]);