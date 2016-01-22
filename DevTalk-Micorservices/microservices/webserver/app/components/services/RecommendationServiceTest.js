(function () {

    'use strict';

    describe('Test DevTalks Recommendation service', function () {
        
        var recommendationService;

        // Inject Recommendation Service
        beforeEach(function () {
            angular.module('DevTalk.events').factory('EventService', function() {
                var allEvents = [{
                        'id': 'ev1',
                        'name': 'Chef Conf Dortmund',
                        'kategorie': 'Provisioning',
                        'teilnehmer': [42, 1337, 2448]
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
                        'teilnehmer': [42]
                    }
                ];

                var srv = {};
                srv.query = function(obj) {
					if(obj.teilnehmer)
					{
						var eventList = [];
						 for(var event of allEvents) {
								if(event.teilnehmer) {
									for(var teilnehmer of event.teilnehmer) {
										if(teilnehmer === obj.teilnehmer) {
											eventList.push(event);
										}
									}
								}
							}
						return eventList;
					}
					else
					{
						return allEvents;
					}
                };

             return srv;
                
                
            });
			module('DevTalk.events');
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
                
               
                it('should return two talks', function() {
                     recommendationService.getTalksForUser(1337).then(function(talksOfUser){
						expect(talksOfUser.length).toEqual(2);
						expect(talksOfUser[0].id).toMatch("ev5");
						expect(talksOfUser[1].id).toMatch("ev4");
					});
                });
 
            });

            describe('Adminizzle (ID=2448)', function() {
                 it('should return one talks', function() {
                     recommendationService.getTalksForUser(2448).then(function(talksOfUser){
						expect(talksOfUser.length).toEqual(1);
						expect(talksOfUser[0].id).toMatch("ev5");
					});
                });
            });

            describe('Jon Doe (ID=42)', function() {
               it('should return zero talks', function() {
                    console.info('Los gehts');
                    recommendationService.getTalksForUser(42).then(function(talksOfUser){
					  expect(talksOfUser.length).toEqual(0);
					});
                });
            });
            

            describe('no valid user provided', function() {
                it('should have no recommendations for a user without visited talks or an invalid userid', function() {
					
					   recommendationService.getTalksForUser().then(function(talksOfUser){}, function(err){
						expect(err).toBeDefined();
					   });
					
                    
                    recommendationService.getTalksForUser(123456789).then(function(talksOfUser){
					  expect(talksOfUser.length).toEqual(0);
					});
                });
            });
        });
    });
})();