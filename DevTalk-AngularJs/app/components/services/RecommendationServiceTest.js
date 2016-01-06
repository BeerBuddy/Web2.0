(function () {

    'use strict';

    describe('Test DevTalks Recommendation service', function () {
        
        var recommendationService;

        // Inject Recommendation Service
        beforeEach(function () {
            angular.module('DevTalk.common1', []).factory('EventService', function() {
                var allEvents = [{
                        'id': 'ev1',
                        'name': 'Chef Conf Dortmund',
                        'kategorie': 'Provisioning',
                        'teilnehmer': [1337, 2448]
                    },
                    {
                        'id': 'ev2', 
                        'name': 'Scala Best Practices',
                        'kategorie': 'Java',
                        'teilnehmer': []
                    },
                    {
                        'id': 'ev3', 
                        'name': 'WTF.JS',
                        'kategorie': 'Web',
                        'teilnehmer': [1337]
                    },
                    {
                        'id': 'ev4', 
                        'name': 'Internet Explorer Talk',
                        'kategorie': 'Web',
                        'teilnehmer': []
                    },
                    {
                        'id': 'ev5', 
                        'name': 'Master of Puppets',
                        'kategorie': 'Provisioning',
                        'teilnehmer': []
                    }
                ];

                var srv = {};
                srv.getAll = function() {
                    return allEvents;
                }

                srv.getEventsByUserId = function(userId) {
                    var eventList = [];
                    for(var event of allEvents) {
                        if(event.teilnehmer) {
                            for(var teilnehmer of event.teilnehmer) {
                                if(teilnehmer === userId) {
                                    eventList.push(event);
                                }
                            }
                        }
                    }
                    return eventList;
                }
                return srv;
            });

            module('DevTalk.recommendation');
            inject(function (_RecommendationService_) {
                recommendationService = _RecommendationService_;
            });
        });

        // Check if all functions exist
        describe('Check functions', function () {
            it('should have the getTalksForUser() function', function () {
                expect(recommendationService.getTalksForUser).toBeDefined();
            });
        }); 

        describe('getTalksForUser', function() {

            describe('Andizzle (ID=1337)', function() {
                var talksOfUser;
                beforeEach(function() {
                    talksOfUser = recommendationService.getTalksForUser(1337);
                });

                it('should return two talks', function() {
                    expect(talksOfUser.length).toEqual(2);
                });

                it('should contain the EclipseConf and the WTF.JS talk', function() {
                    expect(talksOfUser[0].id).toMatch("ev4");
                    expect(talksOfUser[1].id).toMatch("ev5");
                });
            });

            describe('Adminizzle (ID=2448)', function() {
                var talksOfUser;
                beforeEach(function() {
                    talksOfUser = recommendationService.getTalksForUser(2448);
                });

                it('should return one talks', function() {
                    expect(talksOfUser.length).toEqual(1);
                });

                it('should contain the W-JAX and the WTF.JS talk', function() {
                    expect(talksOfUser[0].id).toMatch("ev5");
                });
            });
            

            describe('no valid user provided', function() {
                it('should be undefined for an empty userid', function() {
                    expect(recommendationService.getTalksForUser()).toBeUndefined();
                });

                it('should have no recommendations for a user without visited talks', function() {
                    expect(recommendationService.getTalksForUser(123456789)).toEqual([]);
                });
            });
        });
    });
})();