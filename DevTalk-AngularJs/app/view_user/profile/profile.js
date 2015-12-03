'use strict';

angular.module('DevTalk.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'view_user/profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', [function() {

}]);