'use strict';
angular.module('profilComponent', [])
    .directive('profilComponent', function ($compile) {
        return {
            restrict: 'E',
            controller: function ($scope) {
				$scope.flipped = true;
                $scope.flip = function () {
                    $scope.flipped = !$scope.flipped;
                };
                             
                $scope.filechanged = function (event) {
                        var photofile = event.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $scope.user.image = e.target.result;
							$scope.$apply();
                        };
                        reader.readAsDataURL(photofile);
                   
                };
				
				 $scope.save=function(user){
					 $scope.onSave(user);
				 };
            },
            scope: {
                user: '=',
                editable: '=',
                onSave: '&'
            },
            templateUrl: 'components/profil-component/profil-component.html'
        };
    })
	.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});