(function () {

'use strict';

describe("tests the UserService", function () {
    var userService;

    beforeEach(function () {
        // always load nova module
        module('DevTalk.common');

        inject(function(_UserService_){
          userService = _UserService_;
        });

    });

    describe('UserService',function(){
      it('should have the login function',function(){
        expect(userService.login).toBeDefined();
      });

      it('should have the logout function',function(){
        expect(userService.logout).toBeDefined();
      });
    });

    describe('UserService.login',function(){
      it('should log the user in',function(){
        userService.login('username', 'password');
        expect(userService.isUser()).toBeTruthy();
      });
      it('should log the user in as a admin, if the password ends with a "?"',function(){
        userService.login('username', 'password?');
        expect(userService.isAdmin()).toBeTruthy();
      });
    });

    describe('UserService.logout',function(){
      it('should log the user out',function(){
        userService.login('username', 'password');
        expect(userService.isUser()).toBeTruthy();
        userService.logout();
        expect(userService.isUser()).toBeFalsy();
      });
      it('should log the user in as a admin, if the password ends with a "?"',function(){
        userService.login('username', 'password?');
        expect(userService.isAdmin()).toBeTruthy();
        userService.logout();
        expect(userService.isUser()).toBeFalsy();
      });
    });

});

})();
