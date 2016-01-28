var app = angular.module('DevTalk.recommendation', ['ngResource']);

app.factory('RecommendationService', ['$resource', function($resource) {
    
    return $resource('/api/recommendationService/recommendations/:userId', {userId: '@_id'}, {
	});
}]);