'use strict';

angular.module('DevTalk.statistic', ['ngRoute', 'chart.js', 'DevTalk.admin'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/statistic', {
    templateUrl: 'view_admin/statistic/statistic.html',
    controller: 'StatisticCtrl'
  });
}])

.controller('StatisticCtrl', ['$scope', 'StatisticService',  function($scope, StatisticService) {
	$scope.accessData = StatisticService.getAccessStatistics();
  $scope.reloadAccessData = function(){
    $scope.accessData = StatisticService.getAccessStatistics();
  };
  $scope.registrationData = StatisticService.getRegistrationData();
  $scope.reloadRegistrationData = function(){
    $scope.registrationData = StatisticService.getRegistrationData();
  };

}]);
