(function () {

    'use strict';

    describe('Test DevTalks Recommendation service', function () {
        
        var recommendationService,$rootScope;

        // Inject Recommendation Service
        beforeEach(function () {
<<<<<<< HEAD
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
					if(obj && obj.teilnehmer)
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
=======
>>>>>>> 25ca1585007107e3efc405dd4221f0eec1c5a01f
            module('DevTalk.recommendation');
            inject(function (_RecommendationService_,_$rootScope_) {
				$rootScope = _$rootScope_;
                recommendationService = _RecommendationService_;
            });
        });

        // Check if all functions exist
        describe('Check functions', function () {
            it('should have the query function', function () {
                expect(recommendationService.query).toBeDefined();
            });
        }); 

        /*describe('get Talks For User', function() {

            describe('Andizzle (ID=1337)', function() {
                
                it('should return two talks', function() {
<<<<<<< HEAD
				  ;
                    talksOfUser = recommendationService.getTalksForUser(1337).then(function(res){talksOfUser =res},function(err){console.log(err)});
				
              
					$rootScope.$apply();
					expect(talksOfUser.length).toEqual(2);
					expect(talksOfUser[0].id).toMatch("ev5");
					expect(talksOfUser[1].id).toMatch("ev4");
				});
				
            });

            describe('Adminizzle (ID=2448)', function() {
                 it('should return one talks', function() {
				  var talksOfUser ;
                    recommendationService.getTalksForUser(2448).then(function(res){talksOfUser =res},function(err){console.log(err)});
				
					$rootScope.$apply();
					expect(talksOfUser.length).toEqual(1);
					expect(talksOfUser[0].id).toMatch("ev5");
                });
            });

            describe('Jon Doe (ID=42)', function() {
               it('should return zero talks', function() {
                    console.info('Los gehts');
                   	var talksOfUser ;
                    recommendationService.getTalksForUser(42).then(function(res){talksOfUser =res},function(err){console.log(err)});
				
					$rootScope.$apply();
					expect(talksOfUser.length).toEqual(0);
=======
                    var talksOfUser = recommendationService.query({userId: 1337});
					expect(talksOfUser.length).toEqual(0);
                });
 
            });

            describe('Jon Doe (ID=42)', function() {
               it('should return zero talks', function() {
                    recommendationService.query({userId: 42}).then(function(talksOfUser){
					  expect(talksOfUser.length).toEqual(0);
					});
>>>>>>> 25ca1585007107e3efc405dd4221f0eec1c5a01f
                });
            });
            

            describe('no valid user provided', function() {
                it('should have no recommendations for a user without visited talks or an invalid userid', function() {
					var err_;
					   recommendationService.getTalksForUser().then(function(talksOfUser){}, function(err){
						err_ = err;
					   });
					$rootScope.$apply();
					expect(err_).toBeDefined();
                    var talksOfUser ;
                    recommendationService.getTalksForUser(123456789).then(function(res){talksOfUser =res});
					$rootScope.$apply();
					expect(talksOfUser.length).toEqual(0);
                });
            });
        });*/
    });
})();