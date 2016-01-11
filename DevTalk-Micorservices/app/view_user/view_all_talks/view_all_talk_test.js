'use strict';

describe('DevTalk.allTalks module', function() {
	describe('AllTalksCtrl', function() {
    var $scope;

    beforeEach(module('DevTalk.allTalks'));

    beforeEach(inject(function($rootScope, $controller) {
	    $scope = $rootScope.$new();
	    $controller('AllTalksCtrl', {$scope: $scope});
    }));

    xit('should work', function() {
      expect($scope).toBeDefined();
    });
  });
});