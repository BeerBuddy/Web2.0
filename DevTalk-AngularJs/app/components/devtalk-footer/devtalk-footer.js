(function() {
  'use strict';

  var app = angular.module('DevTalk');

  app.directive('devTalkFooter', ['UserService', directive]);
  function directive() {
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: 'components/devtalk-footer/devtalk-footer.html',
      controller: function($scope, UserService){
        $scope.isUser = UserService.isUser();
        $scope.isUser = UserService.isAdmin();
      }
    }
  }
})();
