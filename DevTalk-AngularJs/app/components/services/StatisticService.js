(function() {

  'use strict';

  angular.module('DevTalk.admin', [])
    .factory("StatisticService", [ function(){

        var getRandomValue = function(min, max){
          return Math.floor(((Math.random() * (max || 500)) + (min || 1)));
        };

        return {
          getAccessStatistics: function(){
            var result = {};
            result.labels = ["January", "February", "March", "April", "May", "June", "July"];
            result.series = ['Zugriff 2014', 'Zugriff 2015'];
            result.data = [[],[]];
            for (var i = 0; i < 2; i++) {
              for (var j = 0; j < 7; j++) {
                result.data[i].push(getRandomValue(500, 7000));
              }
            }
            return result;
          },
          getRegistrationData: function(){
            var result = {};
            result.labels = ["January", "February", "March", "April", "May", "June", "July"];
            result.series = ['Anmeldungen', 'Teilnahmen'];
            result.data = [[],[]];
            for (var j = 0; j < 7; j++) {
              result.data[0].push(getRandomValue(300, 3000));
            }
            for (var i = 0; i < 7; i++) {
              result.data[1].push(result.data[0][i] - getRandomValue(0, result.data[0][i] * 0.4));
            }
            return result;
          }
        };

      }]);
})();