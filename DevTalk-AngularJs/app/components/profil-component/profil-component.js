'use strict';
angular.module('profilComponent', [])
    .directive('profilComponent', function ($compile) {
        return {
            restrict: 'E',
            controller: function ($scope) {
                $scope.flip = function (flipped) {
                    $scope.flipped = !flipped;
                }
                $scope.flipped = true;
                $scope.file_changed = function (element) {
                    console.info("File changed");

                    $scope.$apply(function (scope) {
                        var photofile = element.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            console.info(e.target.result);
                            $scope.user.image = e.target.result;
                            $scope.$apply();
                        };
                        reader.readAsDataURL(photofile);
                    });
                };
            },
            scope: {
                user: '=',
                editable: '=',
                onSave: '&'
            },
            link: function(scope, element, attrs) {
                $compile(element.contents())(scope.$new());
            },
            templateUrl: 'components/profil-component/profil-component.html'
        };
    });