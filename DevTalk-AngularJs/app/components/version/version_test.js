'use strict';

describe('DevTalk.version module', function() {
  beforeEach(module('DevTalk.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
