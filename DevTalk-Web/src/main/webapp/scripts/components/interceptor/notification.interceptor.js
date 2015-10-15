 'use strict';

angular.module('devTalkApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-devTalkApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-devTalkApp-params')});
                }
                return response;
            }
        };
    });
