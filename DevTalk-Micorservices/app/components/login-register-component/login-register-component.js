(function() {
  'use strict';

  var app = angular.module('DevTalk');

  app.directive('loginRegisterComponent', [directive]);
  function directive() {
    return {
      restrict: 'E', // match element name only
      templateUrl: 'components/login-register-component/login-register-component.html',
      controller: function($scope){
        $scope.flipped = true;
        $scope.flip = function () {
          $scope.flipped = !$scope.flipped;
        };
        $scope.submit = function(){
          // Methode im Controller aufrufen  
          $scope.controllerSubmit($scope.user);
        }
      },
      scope: {
        controllerSubmit: '&', // callback methode
        user: '=' // two way databindung
        // test : '@' // einfache datenübergabe
      }
    }
  }
})();