'use strict';

angular.module('DevTalk.agb', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/agbs', {
    templateUrl: 'view_agbs/agbs.html',
    controller: 'AGBsCtrl'
  });
}])

.controller('AGBsCtrl', [function() {

}]);