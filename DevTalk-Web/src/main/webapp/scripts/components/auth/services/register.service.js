'use strict';

angular.module('devTalkApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


