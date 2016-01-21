/*jshint esversion: 6 */

(function() {

  'use strict';

  angular.module('DevTalk.admin', [])
      .factory("StatisticService", [
        '$http',
        function($http) {
          var prepareData = function(rawData){
            var monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli" ,"August", "September",
                          "Oktober", "November", "Dezember"];
            var result = {};
            result.series = ['Neue Anmeldungen', 'Logins'];
            result.labels = [];
            result.data = [[],[]];
            if(rawData.length > 0){
              var firstEvent = rawData[0];
              for (var event of rawData) {
                  if(event.date < firstEvent.date){
                    firstEvent = event;
                  }
              }
              var firstDate = new Date(firstEvent.date);
              var currentDate = new Date();
              while(firstDate < currentDate){
                result.labels.push(monate[firstDate.getMonth()] + " " + firstDate.getFullYear());
                result.data[0].push(0);
                result.data[1].push(0);
                firstDate.setMonth(firstDate.getMonth()+1);
              }
              firstDate = new Date(firstEvent.date);
              for (var ev of rawData) {
                  var firstIndex = ev.type === 'LOGIN' ? 1 : 0;
                  var secondIndex = 0;
                  if(new Date(ev.date).getFullYear() == firstDate.getFullYear()){
                    secondIndex = new Date(ev.date).getMonth() - firstDate.getMonth();
                  } else {
                    secondIndex = new Date(ev.date).getMonth() + (12 - firstDate.getMonth());
                  }
                  result.data[firstIndex][secondIndex] = result.data[firstIndex][secondIndex]+1;
              }
            }
            return result;
          };

          return {
            getAccessStatistics : function() {
              var fromDate = new Date();
              fromDate.setMonth(fromDate.getMonth() - 6);
              fromDate.setDate(1);
              var result = $http.get('https://localhost:8000/api/statisticService/events',
              {
                params: {
                  "from" : fromDate.getTime()
                }
              })
              .then(function(response){
                return prepareData(response.data);
              });
              return result;
            }
          };

        }
      ]);
})();
