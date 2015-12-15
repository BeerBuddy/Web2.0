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
            it('should have the getTalksForUser() function', function () {
                expect(recommendationService.getTalksForUser).toBeDefined();
            });
        }); 

        describe('getTalksForUser', function() {

            describe('Jürgen (ID=3)', function() {
                it('should return two talks', function() {
                    var talksOfUser = recommendationService.getTalksForUser(5);
                    expect(talksOfUser.length).toEqual(2);
                });

                it('should contain the EclipseConf and the WTF.JS talk', function() {
                    var talksOfUser = recommendationService.getTalksForUser(5);
                    expect(talksOfUser[0].name).toMatch("EclipseCon Europe");
                    expect(talksOfUser[1].name).toMatch("WTF.JS");
                });
            });

            describe('Eberhard (ID=42)', function() {
                it('should return two talks', function() {
                    var talksOfUser = recommendationService.getTalksForUser(42);
                    expect(talksOfUser.length).toEqual(2);
                });

                it('should contain the W-JAX and the WTF.JS talk', function() {
                    var talksOfUser = recommendationService.getTalksForUser(5);
                    expect(talksOfUser.length).toEqual(2);
                    expect(talksOfUser[1].name).toMatch("WTF.JS");
                });
            });
            
        });
    });
})();
