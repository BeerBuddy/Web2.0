'use strict';

angular.module('DevTalk.allTalks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/allTalks', {
    templateUrl: 'view_user/view_all_talks/view_all_talks.html',
    controller: 'AllTalksCtrl'
  });
}])

.controller('AllTalksCtrl', [function() {

}]);