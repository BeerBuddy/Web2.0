angular.module('DevTalk')

    .factory('authInterceptor', [
      '$q',
      '$window',
      function($q, $window, $location) {
        return {
          request : function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
              config.headers.Authorization = $window.sessionStorage.token;
            }
            return config;
          },
          responseError : function(error) {
            if (error.status === 401 || error.status === 403) {
              $location.url('login');
              delete $window.sessionStorage.token;
            }
            return $q.reject(error);
          }
        };
      }
    ]);
