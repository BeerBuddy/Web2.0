(function() {
  'use strict';

  var app = angular.module('DevTalk');

  app.directive('devtalkHeader', ['UserService', directive]);
  function directive() {
    return {
      restrict: 'E', // match element name only
      scope: false,
      templateUrl: 'components/devtalk-header/devtalk-header.html',
      controller: function($scope, UserService) {
    		$scope.$watch(
          function () {
      			return UserService.getCurrentUser();
      		},                       
      		function(newVal, oldVal) {
      			$scope.isUser = UserService.isUser() || UserService.isAdmin();
      			$scope.isAdmin = UserService.isAdmin();
            $scope.userName = UserService.getCurrentUser().name;
      		}, 
          true
        );

    		$scope.logout = function(){
    			UserService.logout();
    		}		
      }
    }
  }
})();
