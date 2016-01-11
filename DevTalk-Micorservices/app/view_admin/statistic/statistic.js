'use strict';

angular.module('DevTalk.statistic', ['ngRoute', 'chart.js', 'DevTalk.admin'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/statistic', {
    templateUrl: 'view_admin/statistic/statistic.html',
    controller: 'StatisticCtrl'
  });
}])

.controller('StatisticCtrl', ['$scope', 'StatisticService',  function($scope, StatisticService) {

	$scope.reloadAccessData = function(){
		StatisticService.getAccessStatistics().success(function(data, status, headers, config) {
			$scope.accessData = data;
		});
	};
	$scope.reloadAccessData();
	
	$scope.reloadRegistrationData = function(){
		StatisticService.getRegistrationData().success(function(data, status, headers, config) {
			$scope.registrationData = data;
		});
	};
	$scope.reloadRegistrationData();

}]);
