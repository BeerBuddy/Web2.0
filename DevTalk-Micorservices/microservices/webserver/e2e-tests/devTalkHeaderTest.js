describe('Test for DevTalk Header:', function() {

  describe('Like the Footer the Header should show different links depending on the user\'s state', function() {

    beforeEach(function() {
      browser.get('index.html#/login');
    });

    it('should show the following links if the user is not logged in: Übersicht, Mein Profil mit Link zum Login und Login', function() {
		expect(element(by.css('#main-header a#header-link-overview')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).getAttribute('href')).toMatch('#login');
		expect(element(by.css('#main-header a#header-link-talk')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-statistics')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-logout')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-login')).isDisplayed()).toBeTruthy();
    });
	
	it('should show the following links if a normal user is logged in: Übersicht, Mein Profil mit Link zum Profil, Logout mit Username im title', function() {
		element(by.id('user_email')).sendKeys('user@user.de');
		element(by.id('user_password')).sendKeys('user');
		element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
		browser.driver.sleep(200);
		
		expect(element(by.css('#main-header a#header-link-overview')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).getAttribute('href')).toMatch('#profile');
		expect(element(by.css('#main-header a#header-link-talk')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-statistics')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-logout')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-logout')).getAttribute('title')).toEqual('user abmelden');
		expect(element(by.css('#main-header a#header-link-login')).isDisplayed()).toBeFalsy();
    });
	
	it('should show the following links if an admin user is logged in: Übersicht, Mein Profil mit Link zum Profil, Logout mit Username im title, Neuer Talk, Statistik', function() {
		//login as admin
		element(by.id('user_email')).sendKeys('admin@admin.de');
		element(by.id('user_password')).sendKeys('admin');
		element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
		browser.driver.sleep(200);
		
		expect(element(by.css('#main-header a#header-link-overview')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).getAttribute('href')).toMatch('#profile');
		expect(element(by.css('#main-header a#header-link-talk')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-statistics')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-logout')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-logout')).getAttribute('title')).toEqual('admin abmelden');
		expect(element(by.css('#main-header a#header-link-login')).isDisplayed()).toBeFalsy();
    });
	
	it('should reset the buttons after logout', function() {
		// login
		element(by.id('user_email')).sendKeys('admin@admin.de');
		element(by.id('user_password')).sendKeys('admin');
		element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
		browser.driver.sleep(200);
		
		expect(element(by.css('#main-header a#header-link-overview')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-talk')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-statistics')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-logout')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-login')).isDisplayed()).toBeFalsy();

		// logout
		element(by.id('header-link-logout')).click();
		browser.driver.sleep(200);
		
		expect(element(by.css('#main-header a#header-link-overview')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-profile')).isDisplayed()).toBeTruthy();
		expect(element(by.css('#main-header a#header-link-talk')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-statistics')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-logout')).isDisplayed()).toBeFalsy();
		expect(element(by.css('#main-header a#header-link-login')).isDisplayed()).toBeTruthy();
    });
	
	
  });
});