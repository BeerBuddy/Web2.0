'use strict';
var app = angular.module('DevTalk.mail', ['ngResource']);

app.factory('EmailService', ['$resource', function ($resource) {
    return $resource('/api/emailService/email',{
	});
}]);
