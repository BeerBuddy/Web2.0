'use strict';

angular.module('DevTalk.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'view_login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
        $scope.submit = function () {
            if ($scope.user) {
                // only do something if we have a user
                if ($scope.user.agb) {
                    // someone wants to register!
                    UserService.register($scope.user.username, $scope.user.email, $scope.user.password);
                }
                // sir, we have a login!
                if (UserService.login($scope.user.email, $scope.user.password)) {
                    $location.path('/allTalks');
                } else {
                    // we have not found a user, so we redirect to login
                    $location.path('/login');
                }
            }
        }
    }]);