describe('Test for the profile component', function () {


	 it("login for all tests", function() {
		 browser.get('index.html#/login').then(function(){
					element(by.id('user_email')).sendKeys('admin@admin.de');
					element(by.id('user_password')).sendKeys('admin');
					element(by.id('user_password')).sendKeys(protractor.Key.ENTER);
			 });
	  });

    describe('should be displayed correctly', function () {
		beforeEach(function () {
			 
					browser.get('index.html#/profile');
			 
			
        });

        it('own profile should have serveral inputs', function () {
            expect(element(by.id('edit')).isDisplayed()).toBeTruthy();
            expect(element(by.id('back')).isDisplayed()).toBeTruthy();
            expect(element(by.id('save')).isDisplayed()).toBeTruthy();
            expect(element(by.id('username')).isDisplayed()).toBeTruthy();
            expect(element(by.id('email')).isDisplayed()).toBeTruthy();
            expect(element(by.id('password')).isDisplayed()).toBeTruthy();
            expect(element(by.id('password2')).isDisplayed()).toBeTruthy();
        });
        it('view others profile should not have an edit button', function () {
			browser.get('index.html#/profile/asddasads').then(function(){
				browser.driver.isElementPresent(by.id('edit')).then(function(present){
					expect(present).toBe(false);
				});
				
				expect(element(by.id('back')).isDisplayed()).toBeTruthy();
				expect(element(by.id('save')).isDisplayed()).toBeTruthy();
				expect(element(by.id('username')).isDisplayed()).toBeTruthy();
				expect(element(by.id('email')).isDisplayed()).toBeTruthy();
				expect(element(by.id('password')).isDisplayed()).toBeTruthy();
				expect(element(by.id('password2')).isDisplayed()).toBeTruthy();
			});
           
        });

       
        it('change the profile should fail due to invalid email  ', function () {
            element(by.id('edit')).click().then(function () {
                element(by.id('email')).sendKeys('email');
                element(by.id('username')).sendKeys('email');
                element(by.id('password')).sendKeys('email');
                element(by.id('password2')).sendKeys('email');
                //save the user
                element(by.id('save')).click().then(function () {
                        //get the saved user
                        var user = element(by.binding('user'));
                        //reload the page
                        browser.get('index.html#/profile').then(function () {
                            //the user should be equal
                            expect(element(by.binding('user'))).not.toEqual(user);
                        });

                    }
                );
            });
        });

        it('change the profile should fail due to missing username ', function () {
            element(by.id('edit')).click().then(function () {
                element(by.id('email')).sendKeys('user@user.de');
                element(by.id('password')).sendKeys('username');
                element(by.id('password2')).sendKeys('username');
                //save the user
                element(by.id('save')).click().then(function () {
                        //get the saved user
                        var user = element(by.binding('user'));
                        //reload the page
                        browser.get('index.html#/profile').then(function () {
                            //the user should be equal
                            expect(element(by.binding('user'))).not.toEqual(user);
                        });

                    }
                );
            });
        });

        it('change the profile should fail due to missing password', function () {
            element(by.id('edit')).click().then(function () {
                element(by.id('email')).sendKeys('user@user.de');
                element(by.id('username')).sendKeys('password');
                //save the user
                element(by.id('save')).click().then(function () {
                        element(by.id('password2')).sendKeys(protractor.Key.ENTER);
                        //get the saved user
                        var user = element(by.binding('user'));
                        //reload the page
                        browser.get('index.html#/profile').then(function () {
                            //the user should be equal
                            expect(element(by.binding('user'))).not.toEqual(user);
                        });
                    }
                );
            });
        });

        it('change the profile should fail because the passwords do not match', function () {
            element(by.id('edit')).click().then(function () {
                element(by.id('email')).sendKeys('user@user.de');
                element(by.id('username')).sendKeys('passwords');
                element(by.id('password')).sendKeys('passwords');
                element(by.id('password2')).sendKeys('notMatchingPassword');
                //save the user
                element(by.id('save')).click().then(function () {
                        //get the saved user
                        var user = element(by.binding('user'));
                        //reload the page
                        browser.get('index.html#/profile').then(function () {
                            //the user should be equal
                            expect(element(by.binding('user'))).not.toEqual(user);
                        });

                    }
                );
            });
        });
		
		
    });
	
});