(function() {
  'use strict';

  var app = angular.module('DevTalk',['DevTalk.common']);

  app.directive('devTalkFooter', ['UserService', directive]);
  function directive() {
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: 'components/devtalk-footer/devtalk-footer.html',
      controller: function($scope, UserService){
 
		$scope.$watch(function () {
			return UserService.getCurrentUser();
		},                       
		function(newVal, oldVal) {
			$scope.isUser = UserService.isUser() || UserService.isAdmin();
			$scope.isAdmin = UserService.isAdmin();
		}, true);
		$scope.logout = function(){
			UserService.logout();
		}		
		
      }
    }
  }
})();
