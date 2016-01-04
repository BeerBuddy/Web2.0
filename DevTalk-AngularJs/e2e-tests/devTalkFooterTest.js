'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Test for the footer', function() {


  describe('footer should show different links', function() {

    beforeEach(function() {
      browser.get('index.html#/login');
    });

    it('should show the follogwing links if the user is not logged in: only the links for AGBs and Impressum', function() {
		expect(element(by.css('footer a#agb')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#impressum')).isDisplayed()).toBeTruthy();
		expect(element(by.id('footer-logout')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#myProfil')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#eventLink')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#statisticLink')).isDisplayed()).toBeFalsy();
    });
	
	it('should also show the logout and myProfil link if the user is loggedIn', function() {
		element(by.id('user_email')).sendKeys('user@user.de');
		element(by.id('user_password')).sendKeys('user');
		element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
		
		expect(element(by.css('footer a#agb')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#impressum')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#footer-logout')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#myProfil')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#eventLink')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#statisticLink')).isDisplayed()).toBeFalsy();
    });
	
	it('should show all links if the user is an admin', function() {
		//login as admin
		element(by.id('user_email')).sendKeys('admin@admin.de');
		element(by.id('user_password')).sendKeys('admin');
		element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
		
		expect(element(by.css('footer a#agb')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#impressum')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#footer-logout')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#myProfil')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#eventLink')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#statisticLink')).isDisplayed()).toBeTruthy();
    });
	
	it('should show the default links, if the user is logged out', function() {
		//login as admin
		element(by.id('user_email')).sendKeys('admin@admin.de');
		element(by.id('user_password')).sendKeys('admin');
		element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
		
		expect(element(by.css('footer a#agb')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#impressum')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#footer-logout')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#myProfil')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#eventLink')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#statisticLink')).isDisplayed()).toBeTruthy();
		
		//logout
		element(by.id('footer-logout')).click();
		
		expect(element(by.css('footer a#agb')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#impressum')).isDisplayed()).toBeTruthy();
		expect(element(by.css('footer a#footer-logout')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#myProfil')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#eventLink')).isDisplayed()).toBeFalsy();
		expect(element(by.css('footer a#statisticLink')).isDisplayed()).toBeFalsy();
    });
	
	
  });
});
