'use strict';
var app = angular.module('DevTalk.events', ['ngResource']);
app.factory('EventService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/events/:id',{id:'@id'},{
			/* 
			update an existing event expect 
			{
				'id' : ObjectId //the id of the event
				... All other Event attributes
			}
			*/
			update: {
					method: 'PUT' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			}
			
        });
			
}]);
