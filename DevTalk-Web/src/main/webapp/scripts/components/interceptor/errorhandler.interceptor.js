'use strict';

angular.module('devTalkApp')
    .factory('errorHandlerInterceptor', function ($q, $rootScope) {
        return {
            'responseError': function (response) {
                if (!(response.status == 401 && response.data.path.indexOf("/api/account") == 0 )){
	                $rootScope.$emit('devTalkApp.httpError', response);
	            }
                return $q.reject(response);
            }
        };
    });