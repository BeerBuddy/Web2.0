/**
 * Created by David on 10.12.2015.
 */
(function () {

    'use strict';

    describe("tests the EventService", function () {
        var eventService;
        beforeEach(function () {
            module('DevTalk.events');
            inject(function (_EventService_) {
                eventService = _EventService_;
            });
        });

        //check if all functions exists
        describe('test EventService functions for existence', function () {
            it('should have the getAll', function () {
                expect(eventService.query).toBeDefined();
            });

            it('should have the get', function () {
                expect(eventService.get).toBeDefined();
            });

            it('should have the insert', function () {
                expect(eventService.save).toBeDefined();
            });

            it('should have the update', function () {
                expect(eventService.update).toBeDefined();
            });
			
			it('should have the delete', function () {
                expect(eventService.delete).toBeDefined();
            });
        });


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
                //console.info("EventService -----------: "+eventService);
                eventService.save(eventToinsert, function(event){
					 //get from service
					var event2 = eventService.get(event._id, function(){
						//check if equals
						expect(event2).toEqual(event);
					});
				});
            });
        });

        describe('EventService.getAll', function () {
            it('should return an non Empty List', function () {
              eventService.query(function(events){
				expect(events).toBeDefined();
                expect(events.length).toBeGreaterThan(0);
				});
                
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
                //insert new event
                eventService.save(eventToinsert, function(event){
					 //get from service
					eventService.get({'_id':event._id},function (event2) {
						//check if equals
						expect(event2).toEqual(event);

						//do a change
						event2.name = "Neuer Test";

						//update
						eventService.update(event2,function (event3){
						
							expect(event3).toEqual(event2);
							
							eventService.get({'_id':event3._id},function (event4){
								expect(event3).toEqual(event4);
							});			
						});
					});
				});
            });
        });

        describe('EventService.getByid unknown id', function () {
			var event = {
                "_id": "unknown id"
            };
            it('should throw a exception', function () {
               
                    eventService.get(event, function(suc){}, function(err){
						expect(err).toBeDefined();
            		});
                
            });
        });

        describe('EventService.update unknown event', function () {
            var event = {
                "_id": "unknown id"
            };
            it('should throw a exception', function () {
               
                    eventService.update(event, function(suc){}, function(err){
						expect(err).toBeDefined();
            		});
               
            });
        });
    });

})();
