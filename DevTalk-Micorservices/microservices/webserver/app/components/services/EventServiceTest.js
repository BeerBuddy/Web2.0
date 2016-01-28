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

/*
        describe('EventService.getByid  and EventService.insert', function () {
            //insert new event
           var eventToinsert =  {
                "name": "Test",
                "ort": "hier",
                "datumVon": new Date(),
				"datumBis": new Date(),
                "kategorie": "kategorie",
				"beschreibung": "asdasdsa"
            };
            it('should inster an event', function () {
				$httpBackend.expectPOST('/api/eventService/events');
				
				
                //console.info("EventService -----------: "+eventService);
				var event2;
                var event = eventService.save(eventToinsert, function(event){
					 //get from service
					event2 = eventService.get({'id': event._id});
				});
				 $httpBackend.flush();
				 
				expect(event2).toEqual(event);
            });
        });

        describe('EventService.getAll', function () {
            it('should return an non Empty List', function () {
			$httpBackend.expectGET('/api/eventService/events')
			var events = eventService.query(function(events){
				
				});
				
				 $httpBackend.flush();
				 
                expect(events).toBeDefined();
                expect(events.length).toBeGreaterThan(0);
            });
        });


        describe('EventService.insert update getByid Test', function () {
            //create new
            var eventToinsert =  {
                "name": "Test",
                "ort": "hier",
                "datumVon": new Date(),
				"datumBis": new Date(),
                "kategorie": "kategorie",
				"beschreibung": "asdasdsa"
            };
            it('should insert a event and change it', function () {
			var event3_ ;
				var event4_ ;
                //insert new event
                eventService.save(eventToinsert, function(event){
					 //get from service
					eventService.get({'id':event._id},function (event2) {
						//check if equals
						expect(event2).toEqual(event);

						//do a change
						event2.name = "Neuer Test";

						//update
						eventService.update(event2,function (event3){
							event3_ = event3;
							expect(event3).toEqual(event2);
							
							eventService.get({'id':event3._id},function (event4){
								event4_ = event4;
							});			
						});
					});
				});
				 $rootScope.$apply();
				 expect(event3_).toEqual(event3_);
            });
        });

        describe('EventService.getByid unknown id', function () {
			var event = {
                'id': "unknown id"
            };
            it('should throw a exception', function () {
               var err_;
                    eventService.get(event, function(suc){}, function(err){
						err_ = err;
            		});
			 $rootScope.$apply();
			 expect(err_).toBeDefined();
            });
        });

        describe('EventService.update unknown event', function () {
            var event = {
                'id': "unknown id"
            };
            it('should throw a exception', function () {
                var err_;
                    eventService.update(event, function(suc){}, function(err){
						err_ = err;
            		});
                $rootScope.$apply();
				expect(err_).toBeDefined();
            });
        });
		*/
    });

})();
