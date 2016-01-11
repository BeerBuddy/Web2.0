'use strict';

angular.module('DevTalk.impressum', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/impressum', {
    templateUrl: 'view_impressum/impressum.html',
    controller: 'ImpressumCtrl'
  });
}])

.controller('ImpressumCtrl', [function() {

}]);