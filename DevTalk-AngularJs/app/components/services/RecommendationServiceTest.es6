import { getTestData } from './EventTestData.es6'

// $ babel ../../app/components/services/RecommendationServiceTest.es6 --presets "es2015" -o ../../app/components/services/RecommendationServiceTest.js
describe('Test DevTalks Recommendation service', function () {
    
    var recommendationService;

    // Inject Recommendation Service
    beforeEach(function () {
        console.info('Los gehts!!!');
        angular.module('DevTalk.common1', []).factory('EventService', function() {
            var allEvents = getTestData;

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

            it('should contain the IE Talk and the Puppet talk', function() {
                expect(talksOfUser[0].id).toMatch("ev5");
                expect(talksOfUser[1].id).toMatch("ev4");
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

            it('should contain the Puppet talk', function() {
                expect(talksOfUser[0].id).toMatch("ev5");
            });
        });

        describe('Jon Doe (ID=42)', function() {
            var talksOfUser;
            beforeEach(function() {
                console.info('Los gehts');
                talksOfUser = recommendationService.getTalksForUser(42);
            });

            it('should return zero talks', function() {
                expect(talksOfUser.length).toEqual(0);
            });
        });
        

        describe('no valid user provided', function() {
            it('should have no recommendations for a user without visited talks or an invalid userid', function() {
                expect(recommendationService.getTalksForUser()).toEqual([]);
                expect(recommendationService.getTalksForUser(123456789)).toEqual([]);
            });
        });
    });
});