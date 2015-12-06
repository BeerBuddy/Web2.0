(function() {

  'use strict';

  var app = angular.module('DevTalk.common', []);

  app.factory('UserService', [function(){
    var user = {};

    return {
      // The user will be logged in, if the username != password
      // if the password ends with '?' the user is an admin
      login: function(username, password){
        if(username !== password){
          user.name = username;
          user.role = 'user';
        }
        if(password.match(/.*\?/)){
          user.role = 'admin';
        }
        //quickes way to deep-clone a object, see https://jsperf.com/cloning-an-object/2
        return JSON.parse(JSON.stringify(user));
      },
      logout: function(){
        user = {};
        //quickes way to deep-clone a object, see https://jsperf.com/cloning-an-object/2
        return JSON.parse(JSON.stringify(user));
      },
      isAdmin: function(){
        return user.role === 'admin';
      },
      isUser: function(){
        return user.role === 'user';
      }
    };
  }]);
})();
