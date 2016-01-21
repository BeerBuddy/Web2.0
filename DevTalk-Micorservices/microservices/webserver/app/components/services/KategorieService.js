(function () {

    'use strict';

 var app = angular.module('DevTalk.common');

app.factory('KategorieService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/kategorien/:id',{id:'@id'},{
			/*
			Recvies Kategorie by Kategorie._id expect 
			{
				'_id' : ObjectId //the id of the Kategorie
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
			Recvies all Kategories
			*/
			getAll: {
					method: 'GET' , 
					isArray: true,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			Insert a new Kategorie
			*/
			insert: {
					method: 'POST' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			update an existing Kategorie expect 
			{
				'_id' : ObjectId //the id of the Kategorie
				... All other Kategorie attributes
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
			delete an existing Kategorie expect 
			{
				'_id' : ObjectId //the id of the Kategorie
			}
			*/
			delete: {
					method: 'DELETE' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			}
        });
			
}
]);
})();