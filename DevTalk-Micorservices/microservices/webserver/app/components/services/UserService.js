(function () {

    'use strict';

    var app = angular.module('DevTalk.user',[]);

    app.factory('UserService', ['$http', '$window',  function ($http, $window) {
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
                $window.sessionStorage.token = response.data.token;
                return response.data.user;
              });
              return result;
            },
            register: function (username, email, password) {
                var user = {};
                user.username = username;
                user.email = email;
                user.password = password;
                // admin accounts will be created in the db
                user.role = "user";
                users.push(user);
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
