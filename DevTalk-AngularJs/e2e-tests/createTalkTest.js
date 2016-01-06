describe('Test for the create-talk-component', function () {

  describe('should be displayed correctly', function () {
    beforeEach(function() {
      browser.get('index.html#/admin/newTalk');
    });	
    
	it('component should have serveral inputs', function () {
	  expect(element(by.id('talk_name')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('talk_location')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('talk_start')).isDisplayed()).toBeTruthy();
      expect(element(by.id('talk_end')).isDisplayed()).toBeTruthy();
      expect(element(by.id('talk_categorie')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('btn_create')).isDisplayed()).toBeTruthy();
	  expect(element(by.id('btn_cancel')).isDisplayed()).toBeTruthy();	  
    });
	
  /*it('in create mode no edit and decline buttons should be displayed', function () {
	  expect(element(by.id('btn_edit')).isDisplayed()).toBeFalsy();
	  expect(element(by.id('btn_decline')).isDisplayed()).toBeFalsy();
    });*/

  });
});