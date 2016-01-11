'use strict';

describe('DevTalk.agb module', function() {

  beforeEach(module('DevTalk.agb'));

  describe('agbs controller', function(){

    it('should be instantiateable', inject(function($controller) {
      //spec body
      var aGBsCtrl = $controller('AGBsCtrl');
      expect(aGBsCtrl).toBeDefined();
    }));

  });
});