﻿'use strict';

angular.module('DevTalk.talkDetails', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/talkDetails/:eventid', {
            templateUrl: 'view_user/view_talk_details/view_talk_details.html',
            controller: 'TalkDetailsCtrl'
        });
    }])

    .controller('TalkDetailsCtrl', ['$scope', '$routeParams', '$location', 'EventService', function ($scope, $routeParams, $location, EventService) {
        $scope.data = EventService.getById($routeParams.eventid);
        $scope.columns = [
            {"name":"title", "title":"Title"},
            {"name":"description", "title":"Description"},
            {"name":"Time", "title":"Time"},
            {"name":"Speakers", "title":"Speakers"}
        ];
    }]);