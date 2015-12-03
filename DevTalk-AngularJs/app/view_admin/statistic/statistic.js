'use strict';

angular.module('DevTalk.statistic', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/statistic', {
    templateUrl: 'view_admin/statistic/statistic_page.html',
    controller: 'StatisticCtrl'
  });
}])

.controller('StatisticCtrl', [function() {

}]);