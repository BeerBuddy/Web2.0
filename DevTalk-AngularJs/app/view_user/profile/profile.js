'use strict';

angular.module('DevTalk.profile', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/:userid', {
            templateUrl: 'view_user/profile/profile.html',
            controller: 'ProfileCtrl'
        });
    }])

    .controller('ProfileCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'EventService', function ($scope, $routeParams, $location, UserService, EventService) {

        $scope.user = UserService.getUserByid($routeParams.userid);
        $scope.data = EventService.getEventsByUserId($routeParams.userid);

        $scope.highlighted = [];

        $scope.onsave = {
            "test":"test"
        };

        $scope.onsave.call =  function (user) {
            UserService.update(user);
        };


        $scope.showTalk = {
            "test":"test",
            "call": function (e)
            {
                $location.path('/talkDetails/' + e.detail.item.name)
            }
        }

    }])
;