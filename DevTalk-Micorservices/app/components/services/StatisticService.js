(function() {

  'use strict';

  angular.module('DevTalk.admin', [])
    .factory("StatisticService", ['$http', function($http){
	
        return {
          getAccessStatistics: function(){
			var result = $http.get('http://localhost:8550/api/statistics/accessStatistics');
			result.error(function(error, status, headers, config) {
					console.log(status);
					console.log("Error occured");
			})
			return result;
          },
          getRegistrationData: function(){
            var result = $http.get('http://localhost:8550/api/statistics/registrationStatistics');
			result.error(function(error, status, headers, config) {
					console.log(status);
					console.log("Error occured");
			})
			return result;
          },
		  login: function(user){ 
			console.log(user + ' ++++++++++++++++++++');
			var result = $http.post('http://localhost:8550/api/statistics/login', user);
			result.error(function(error, status, headers, config) {
					console.log(status);
					console.log("Error occured");
			})  
		  }
        };

      }]);
})();
