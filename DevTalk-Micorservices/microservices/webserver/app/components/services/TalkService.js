'use strict';
var app = angular.module('DevTalk.common');
app.factory('TalkService', ['$resource',function ($resource) {
   
  return $resource('/api/talkService/talks/:_id',{},{
			/*
			Recvies Talk by Talk._id expect 
			{
				'_id' : ObjectId //the id of the talk
			}
			*/
			getById: {
					method: 'GET' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			Recvies all Talks
			*/
			getAll: {
					method: 'GET' , 
					isArray: true,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			Insert a new Talk
			*/
			insert: {
					method: 'POST' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			update an existing talk expect 
			{
				'_id' : ObjectId //the id of the talk
				... All other Talk attributes
			}
			*/
			update: {
					method: 'PUT' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			delete an existing talk expect 
			{
				'_id' : ObjectId //the id of the talk
			}
			*/
			delete: {
					method: 'DELETE' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			Returns all Talks a user has joined
			{
				'event':{
				
				'_id' : ObjectId //the id of the User
				}
			}
			*/
			getTalksByUserId:{
					method: 'GET' , 
					isArray: true,
					params: {
						'event' : '@event._id'
					},
					headers : {
						'Content-Type' : 'application/json'
					}
			}
        });
			
}]);
