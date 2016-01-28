(function () {

    'use strict';

    describe('Test DevTalks Recommendation service', function () {
        
        var recommendationService;

        // Inject Recommendation Service
        beforeEach(function () {
            module('DevTalk.recommendation');
            inject(function (_RecommendationService_) {
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
                    var talksOfUser = recommendationService.query({userId: 1337});
					expect(talksOfUser.length).toEqual(0);
                });
 
            });

            describe('Jon Doe (ID=42)', function() {
               it('should return zero talks', function() {
                    recommendationService.query({userId: 42}).then(function(talksOfUser){
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
        });*/
    });
})();