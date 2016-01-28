/**
 * Created by David on 10.12.2015.
 * 
 */
(function () {

    'use strict';

    describe("tests the EventService", function () {
        var eventService, $httpBackend,$rootScope;
		
        beforeEach(function () {
			module('DevTalk.events');
            inject(function (_EventService_,_$rootScope_,_$httpBackend_) {
				$rootScope = _$rootScope_;
                eventService = _EventService_;
				$httpBackend = _$httpBackend_;
			
				
            });
        });

        //check if all functions exists
        describe('test EventService functions for existence', function () {
            it('should have the query', function () {
                expect(eventService.query).toBeDefined();
            });

            it('should have the get', function () {
                expect(eventService.get).toBeDefined();
            });

            it('should have the save', function () {
                expect(eventService.save).toBeDefined();
            });

            it('should have the update', function () {
                expect(eventService.update).toBeDefined();
            });
			
			it('should have the delete', function () {
                expect(eventService.delete).toBeDefined();
            });
        });

    });

})();
