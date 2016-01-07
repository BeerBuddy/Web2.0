describe('Test for the create-talk-component', function () {

  describe('should be displayed correctly', function () {
    beforeEach(function() {
      browser.get('index.html#/admin/newTalk');
    });	
    
	it('click on cancel-button resets input fields', function () {
	  element(by.id('talk_name')).sendKeys('Hardcore-Coden');
      element(by.id('talk_location')).sendKeys('Dortmund');	
	  element(by.id('talk_start')).sendKeys('04.01.2016');
      element(by.id('talk_end')).sendKeys('08.01.2016');
	  element(by.id('talk_categorie')).sendKeys('Java');
	  element(by.id('cancel')).click().then(function () {
			expect(element(by.id('talk_name')).getAttribute('value')).toEqual("");
		});
		//element(by.id('cancel')).click();
		//expect(element(by.binding('talk_name'))).toEqual("");		
    });	

	it('component should have serveral inputs', function () {
	  expect(element(by.id('talk_name')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('talk_location')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('talk_start')).isDisplayed()).toBeTruthy();
      expect(element(by.id('talk_end')).isDisplayed()).toBeTruthy();
      expect(element(by.id('talk_categorie')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('create')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('cancel')).isDisplayed()).toBeTruthy();	  
    });
	
  it('in create mode no edit and decline buttons should be displayed', function () {
		browser.driver.isElementPresent(by.id('edit')).then(function(present){
			expect(present).toBe(false);
		});
		browser.driver.isElementPresent(by.id('decline')).then(function(present){
			expect(present).toBe(false);
		});
    });

  });
});