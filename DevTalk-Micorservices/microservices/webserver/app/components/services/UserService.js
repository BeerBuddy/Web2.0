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
          $window.sessionStorage.token = response.data.token;
          return response.data.user;
        });
        return result;
      },
      register: function (name, email, password) {
        var result = $http.post('https://localhost:8000/api/userService/register',
        {
          "name" : name,
          "email" : email,
          "password" : password
        })
        .then(function(response){
                // Registrierung erfolgreich
                EmailService.sendEmail("Die Registrierung war erfolgreich! Willkommen!");
                return response.data.user;
              });
        return result;
      },
      getUserById: function (id) {
        var result = $http.get('https://localhost:8000/api/userService/'+ id);
        return result;
      },
      getCurrentUser: function () {
        return currentUser;
      },
      update: function (user) {
                // remote call to update the user!
                var result = $http.post('https://localhost:8000/api/userService/update',
                {
                  "_id" : user._id,
                  "name" : user.name,
                  "email" : user.email,
                  "password" : user.password
                })
                .then(function(response){
                  currentUser = response.data.user;
                  EmailService.sendEmail("Sie haben Ihre Profildaten geändert! Sie schlingel!");
                  return response.data.user;
                });
                return result;
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
