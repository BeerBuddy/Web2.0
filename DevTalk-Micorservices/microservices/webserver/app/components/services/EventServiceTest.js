/**
 * Created by David on 10.12.2015.
 */
(function () {

    'use strict';

    describe("tests the EventService", function () {
        var eventService;
        beforeEach(function () {
            module('DevTalk.common1');
            inject(function (_EventService_) {
                eventService = _EventService_;
            });
        });

        //check if all functions exists
        describe('test EventService functions for existence', function () {
            it('should have the getAll', function () {
                expect(eventService.getAll).toBeDefined();
            });

            it('should have the getById', function () {
                expect(eventService.getById).toBeDefined();
            });

            it('should have the insert', function () {
                expect(eventService.insert).toBeDefined();
            });

            it('should have the update', function () {
                expect(eventService.update).toBeDefined();
            });
            it('should have the decline', function () {
                expect(eventService.decline).toBeDefined();
			});
        });


        describe('EventService.getByid  and EventService.insert', function () {
            //insert new event
           var eventToinsert =  {
                "id": "id",
                "name": "Test",
                "ort": "hier",
                "datum": "jetzt - später",
                "kategorie": "kategorie",
                "talks": [
                {
                    "id": "talk1",
                    "title": "talk1",
                    "description": "talk1 beschreibung",
                    "time": "jetzt - später",
                    "speakers": [
                        {
                            "id": "1",
                            "name": "Foo Bar"
                        },
                        {
                            "id": "2",
                            "name": "Bar Foo"
                        }
                    ]
                },
                {
                    "id": "talk2",
                    "title": "talk2",
                    "description": "talk2 beschreibung",
                    "time": "jetzt - später",
                    "speakers": [
                        {
                            "id": "3",
                            "name": "Foo Bar2"
                        }
                    ]
                }
            ]
            };
            it('should inster a event', function () {
                //console.info("EventService -----------: "+eventService);
                eventService.insert(eventToinsert);
                //get from service
                var event2 = eventService.getById(eventToinsert.id);
                //check if equals
                expect(event2).toEqual(eventToinsert);
            });

        });

        describe('EventService.getAll', function () {
            it('should return an non Empty List', function () {
                var events = eventService.getAll();
                expect(events).toBeDefined();
                expect(events.length).toBeGreaterThan(0);
            });

            it('every events should have a list of talks with speakers', function () {
                //check if all values are filled
                var events = eventService.getAll();
                expect(events).toBeDefined();
                expect(events.length).toBeGreaterThan(0);

                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    //console.info(JSON.stringify(event, undefined, 2));
                    expect(event).toBeDefined();
                    expect(event.id).toBeDefined();
                    expect(event.name).toBeDefined();
                    expect(event.ort).toBeDefined();
                    expect(event.datum).toBeDefined();
                    expect(event.kategorie).toBeDefined();
                    expect(event.talks).toBeDefined();

                    expect(event.talks.length).toBeGreaterThan(0);

                    for (var j = 0; j < event.talks.length; j++) {
                        var talk = event.talks[j];
                        expect(talk).toBeDefined();
                        expect(talk.id).toBeDefined();
                        expect(talk.title).toBeDefined();
                        expect(talk.description).toBeDefined();
                        expect(talk.time).toBeDefined();
                        expect(talk.speakers).toBeDefined();

                        for (var k = 0; k < talk.speakers.length; k++) {
                            var speaker = talk.speakers[k];
                            expect(speaker).toBeDefined();
                            expect(speaker.id).toBeDefined();
                            expect(speaker.name).toBeDefined();
                        }
                    }
                }
            });
        });


        describe('EventService.insert update getByid Test', function () {
            //create new
            var event = {
                "id": "insert update getByid Test",
                "name": "Test",
                "ort": "hier",
                "datum": "jetzt - später",
                "kategorie": "kategorie",
                "talks": [
                    {
                        "id": "talk1",
                        "title": "talk1",
                        "description": "talk1 beschreibung",
                        "time": "jetzt - später",
                        "speakers": [
                            {
                                "id": "1",
                                "name": "Foo Bar"
                            },
                            {
                                "id": "2",
                                "name": "Bar Foo"
                            }
                        ]
                    },
                    {
                        "id": "talk2",
                        "title": "talk2",
                        "description": "talk2 beschreibung",
                        "time": "jetzt - später",
                        "speakers": [
                            {
                                "id": "3",
                                "name": "Foo Bar2"
                            }
                        ]
                    }
                ]
            };
            it('should insert a event and change it', function () {
                //insert new event
                eventService.insert(event);
                //get from service
                var event2 = eventService.getById(event.id);
                //check if equals
                expect(event2).toEqual(event);

                //do a change
                event2.name = "Neuer Test";

                //update
                eventService.update(event2);

                //get from service
                var event3 = eventService.getById(event.id);
                //check if equals
                expect(event3).toEqual(event2);
            });

        });

        describe('EventService.getByid unknown id', function () {
            it('should throw a exception', function () {
                expect(function(){
                    eventService.getById("unknown id");
                }).toThrow();
            });
        });

        describe('EventService.update unknown event', function () {
            var event = {
                "id": "unknown id"
            };
            it('should throw a exception', function () {
                expect(function(){
                    eventService.update(event);
                }).toThrow();
            });
        });

        describe('EventService.join an event', function () {
            var event = {
                "id": "EventService.join Test",
                "name": "Test",
                "ort": "hier",
                "datum": "jetzt - später",
                "kategorie": "kategorie",
                "talks": [
                ]
            };
            it('getEventsByUserId should return previouse joined Event ', function () {
                eventService.insert(event);
                eventService.joinEvent(10, "EventService.join Test");
                expect(eventService.getEventsByUserId(10)).toEqual([event]);
            });
        });

        describe('EventService.join unknown event', function () {
            it('should throw a exception', function () {
                expect(function(){
                    eventService.join(10, "unknown id");
                }).toThrow();
            });
        });

    });

})();
