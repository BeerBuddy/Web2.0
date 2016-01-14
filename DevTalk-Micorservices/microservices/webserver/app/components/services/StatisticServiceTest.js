(function () {

'use strict';

describe("tests the StatisticService", function () {
    var service;

    beforeEach(function () {
        // always load nova module
        module('DevTalk.admin');

        inject(function(_StatisticService_){
          service = _StatisticService_;
        });

    });

    describe('StatisticService.getAccessStatistics',function(){
      it('should return an Object that can be passed to the Chart-directive',function(){
        service.getAccessStatistics().success(function(data, status, headers, config) {
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

    describe('StatisticService.getRegistrationData',function(){
      it('should return an Object that can be passed to the Chart-directive',function(){
        service.getRegistrationData().success(function(data, status, headers, config) {
			var testObject = data;
			expect(testObject).toBeDefined();
			expect(testObject.labels.length).toBe(7);
			expect(testObject.series.length).toBe(2);
			expect(testObject.data.length).toBe(2);
			expect(testObject.data[0].length).toBe(7);
			expect(testObject.data[1].length).toBe(7);
		});
      });

      it('should return an object where the registrations should be higher or equal to the participations', function(){
        service.getRegistrationData().success(function(data, status, headers, config) {
			var testObject = data;
			var registrations = testObject.data[0];
			var participations = testObject.data[1];
			for (var p = 0; p < registrations.length; p++) {
			  //Teilnahmen sind max. die Anmeldungen
			  expect(registrations[p] - participations[p]).toBeGreaterThan(-1);
			  // und min. 0.6 * die Anmeldungen
			  expect(participations[p]).toBeGreaterThan(registrations[p] * 0.59);
			}
		});
      });
    });



});

})();
