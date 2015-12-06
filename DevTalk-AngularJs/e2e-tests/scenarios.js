'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Test for the login page', function() {


  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });


  describe('login', function() {

    beforeEach(function() {
      browser.get('index.html#/login');
    });

    it('h1 should be "Think together, work together"', function() {
      expect(element(by.css('#main-content h1')).getText()).
        toMatch("Think together, work together!");
    });
	
	it('should have a title', function(){
		expect(browser.getTitle()).toEqual('My AngularJS App');
	});

  });
});
