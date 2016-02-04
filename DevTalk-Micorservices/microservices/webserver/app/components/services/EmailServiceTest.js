(function () {

    'use strict';

    describe("tests the EmailService", function () {
        var emailService;
		
        beforeEach(function () {
			module('DevTalk.mail');
            inject(function (_EmailService_) {
                emailService = _EmailService_;
            });
        });

        //check if all functions exists
        describe('test EmailService functions for existence', function () {
            it('should have the query', function () {
                expect(emailService.query).toBeDefined();
            });
        });
    });
})();
