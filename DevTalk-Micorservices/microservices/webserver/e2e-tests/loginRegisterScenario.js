'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Test for the login and register component', function () {

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });

  describe('should be displayed correctly', function () {
    beforeEach(function() {
      browser.get('index.html#/login');
    });

    it('should have on the login side a title, two input fields and two buttons', function () {
      expect(element(by.css('#title_login')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#user_email')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#user_password')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#login_submit')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#login_register')).isDisplayed()).toBeTruthy();
    });

    it('should have on the register side a title, four input fields, one checkbox and two buttons', function () {
      expect(element(by.css('#title_register')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#account_username')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#account_email')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#account_password')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#account_password_confirmation')).isDisplayed()).toBeTruthy();
      expect(element(by.css('login-register-component #agb')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#register_submit')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#register_login')).isDisplayed()).toBeTruthy();
    });

    it('should log the normal user in', function () {
      element(by.id('user_email')).sendKeys('user@user.de');
      element(by.id('user_password')).sendKeys('user');
      element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
      expect(browser.getLocationAbsUrl()).not.toMatch("/login");
    });

    it('should log the admin user in', function () {
      element(by.id('user_email')).sendKeys('admin@admin.de');
      element(by.id('user_password')).sendKeys('admin');
      element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
      expect(browser.getLocationAbsUrl()).not.toMatch("/login");
    });

    it('should register a user', function(){
      element(by.css('#account_username')).sendKeys('regTest');
      element(by.css('#account_email')).sendKeys('regTest'+ new Date().getTime() +'@test.de');
      element(by.css('#account_password')).sendKeys('regTest');
      element(by.css('#account_password_confirmation')).sendKeys('regTest');
      element(by.css('login-register-component #agb')).sendKeys(protractor.Key.SPACE);
      element(by.css('#register_submit')).sendKeys(protractor.Key.ENTER);
      expect(browser.getLocationAbsUrl()).not.toMatch("/login");
    });

  });
});
