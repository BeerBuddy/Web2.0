(function () {

    'use strict';

    describe("tests the UserService", function () {
        var userService;

        var username = "user";
        var email = "user@user.de";
        var password = "user";

        // admin users are predefined and can't be created!
        var admin_email = "admin@admin.de";
        var admin_pw = "admin";

        beforeEach(function () {
            // always load nova module
            module('DevTalk.user');

            inject(function (_UserService_) {
                userService = _UserService_;
            });
        });

        describe('UserService', function () {
            it('should have the login function', function () {
                expect(userService.login).toBeDefined();
            });
            it('should have the logout function', function () {
                expect(userService.logout).toBeDefined();
            });
            it('should have the register function', function () {
                expect(userService.register).toBeDefined();
            });
            it('should have the getUserById function', function () {
                expect(userService.getUserById).toBeDefined();
            });
            it('should have the getCurrentUser function', function () {
                expect(userService.getCurrentUser).toBeDefined();
            });
            it('should have the update function', function () {
                expect(userService.update).toBeDefined();
            });
            it('should have the isAdmin function', function () {
                expect(userService.isAdmin).toBeDefined();
            });
            it('should have the isUser function', function () {
                expect(userService.isUser).toBeDefined();
            });
        });

        describe('UserService.register and UserService.login ', function () {
            it('should be able to register a normal user and the normal user in', function () {
                userService.register(username, email, password);
                userService.login(email, password);
                expect(userService.isUser()).toBeTruthy();
            });

            it('should log the admin user in', function () {
                userService.login(admin_email, admin_pw);
                expect(userService.isAdmin()).toBeTruthy();
            });
        });

        describe('UserService.register and UserService.logout', function () {
            it('should log the normal user out', function () {
                userService.register(username, email, password);
                userService.login(email, password);
                expect(userService.isUser()).toBeTruthy();
                userService.logout();
                expect(userService.isUser()).toBeFalsy();
            });
            it('should log the admin user out', function () {
                userService.login(admin_email, admin_pw);
                expect(userService.isAdmin()).toBeTruthy();
                userService.logout();
                expect(userService.isUser()).toBeFalsy();
            });
        });
    });
})();
