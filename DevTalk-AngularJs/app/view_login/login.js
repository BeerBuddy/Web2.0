'use strict';

angular.module('DevTalk.login', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'view_login/login.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {

    $scope.submit = function (user) {
        if (user) {
                // only do something if we have a user
                if (user.agb) {
                    // someone wants to register!
                    UserService.register(user.username, user.email, user.password);
                }
                // sir, we have a login!
                if (UserService.login(user.email, user.password)) {
                  $location.path('/allTalks');
              } else {
                    // we have not found a user, so we redirect to login
                    $location.path('/login');
                    alert("Überprüfen Sie ihre Login-Daten");
                }
            }
        }
    }]);