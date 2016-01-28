(function() {
'use strict';
var app = angular.module('DevTalk.mail', []);

app.factory('EmailService', ["$http", function ($http) {
	return{
		sendEmail: function () {
			var result = $http.post('https://localhost:8000/api/emailService/email')
			  .then(function(response){
				console.log("EmailServices WORKING!" , response);
			  });
		}
	}
}]);
})();
