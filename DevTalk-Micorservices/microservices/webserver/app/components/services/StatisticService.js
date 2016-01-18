(function() {

  'use strict';

  angular.module('DevTalk.admin', [])
      .factory("StatisticService", [
        '$http',
        function($http) {

          return {
            getAccessStatistics : function() {
              var result = $http.get(
                  'http://localhost:8000/api/statisticService/accessStatistics');
              result.error(function(error, status, headers, config) {
                console.log(status);
                console.log("Error occured");
              });
              return result;
            },
            getRegistrationData : function() {
              var result = $http.get(
                  'http://localhost:8000/api/statisticService/registrationStatistics');
              result.error(function(error, status, headers, config) {
                console.log(status);
                console.log("Error occured");
              });
              return result;
            }
          };

        }
      ]);
})();
