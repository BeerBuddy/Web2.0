'use strict';
angular.module('profilComponent', [])
    .directive('profilComponent', function () {
        return {
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
            link: function (scope, element, attrs) {
                if (attrs.user)
                    scope.user = JSON.parse(attrs.user);
                if (attrs.editable) {
                    scope.editable = true;
                }

            },
            templateUrl: 'components/profil-component/profil-component.html'
        };
    });