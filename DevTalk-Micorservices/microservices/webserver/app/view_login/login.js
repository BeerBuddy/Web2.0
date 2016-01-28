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
                    UserService.register(user.username, user.email, user.password).then(function(response){
                        login(user);
                    });
                } else {
                // sir, we have a login! 
                login(user);
            }
        }
    };

    function login(user){
        UserService.login(user.email, user.password)
        .then(function(){
          $location.path('/allTalks')
      }, function(){
          $location.path('/login');
          alert("Überprüfen Sie ihre Login-Daten");
      });
    }
}]);
