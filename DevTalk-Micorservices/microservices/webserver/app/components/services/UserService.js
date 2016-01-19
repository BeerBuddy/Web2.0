(function () {

    'use strict';

    var app = angular.module('DevTalk.common', ['ngResource']);

    app.factory('UserService', [function () {
        // all available users
        var users = [];

        // add a normal user
        users.push({
            "id": 1337,
            "name": "Andizzle",
            "email": "user@user.de",
            "password": "user",
            "image": "images/avatar.jpg",
            "role": "user"
        });

        // add an admin
        users.push({
            "id": 2448,
            "name": "Adminizzle",
            "email": "admin@admin.de",
            "password": "admin",
            "image": "images/avatar.jpg",
            "role": "admin"
        });

        // the current user
        var currentUser = {};

        return {
            login: function (email, password) {
                // Iterate over all users and look if the got a hit!
                for (var user in users) {
                    if (users[user].email === email && users[user].password === password) {
                        currentUser = users[user];
                        //quickest way to deep-clone a object, see https://jsperf.com/cloning-an-object/2
                        return JSON.parse(JSON.stringify(users[user]));
                    }
                }
                console.log("No user found for email: " + email + " password:" + password);
                return null;
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