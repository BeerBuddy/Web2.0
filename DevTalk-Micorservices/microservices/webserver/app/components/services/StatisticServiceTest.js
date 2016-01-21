(function() {

  'use strict';

  describe("tests the StatisticService", function() {
    var service;

    beforeEach(function() {
      // always load nova module
      module('DevTalk.admin');

      inject(function(_StatisticService_) { service = _StatisticService_; });

    });

    describe('StatisticService.getAccessStatistics', function() {
      it('should return an Object that can be passed to the Chart-directive',
         function() {
           service.getAccessStatistics().then(function(data) {
             var testObject = data;
             expect(testObject).toBeDefined();
             expect(testObject.labels.length).toBe(7);
             expect(testObject.series.length).toBe(2);
             expect(testObject.data.length).toBe(2);
             expect(testObject.data[0].length).toBe(7);
             expect(testObject.data[1].length).toBe(7);
           });
         });
    });

  });

})();
