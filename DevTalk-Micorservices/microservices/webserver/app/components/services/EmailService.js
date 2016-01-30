(function() {
'use strict';
var app = angular.module('DevTalk.mail', []);

app.factory('EmailService', ["$http", function ($http) {
	return{
/*		sendEmail: function () {
			var result = $http.post('https://localhost:8000/api/emailService/email')
			  .then(function(response){
				console.log("EmailServices WORKING!" , response);
			  });
		} */
		sendMailRegister: function (name, email) {
			var result = $http.post('https://localhost:8000/api/emailService/register',
				{
				  "name" : name,
                  "email" : email
				})
			  .then(function(response){
				console.log("EmailServices WORKING, Registration done!" , response);
			  });
		},
		sendMailProfile: function (name, email) {
			var result = $http.post('https://localhost:8000/api/emailService/register',
				{
				  "name" : name,
                  "email" : email
				})
			  .then(function(response){
				console.log("EmailServices WORKING, Registration done!" , response);
			  });
		}
	}
}]);
})();
