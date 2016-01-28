(function () {

    'use strict';

    var app = angular.module('DevTalk.user',['DevTalk.mail']);

    app.factory('UserService', ['$http', '$window', "EmailService" , function ($http, $window, EmailService) {
		var users = [];
        var currentUser = {};

        return {
            login: function (email, password) {
              var result = $http.post('https://localhost:8000/api/userService/login',
              {
                  "email" : email,
                  "password" : password
              })
              .then(function(response){
                currentUser = response.data.user;
                users.push(currentUser);
                $window.sessionStorage.token = response.data.token;
				EmailService.sendEmail();
                return response.data.user;
              });
              return result;
            },
            register: function (username, email, password) {
              var result = $http.post('https://localhost:8000/api/userService/register',
              {
                  "username" : username,
                  "email" : email,
                  "password" : password
              })
              .then(function(response){
                users.push(user);
                return response.data.user;
              });
              return result;
            },
            getUserById: function (id) {
                for (var user in users) {
                    if (users[user].id === id) {
                        return users[user];
                    }
                }
            },
            getCurrentUser: function () {
                return currentUser;
            },
            update: function (user) {
                currentUser = user;
            },
            logout: function () {
                currentUser = {};
                $window.sessionStorage.token = "";
            },
            isAdmin: function () {
                return currentUser.role === 'admin';
            },
            isUser: function () {
                return currentUser.role === 'user';
            }
        };
    }]);
})()
