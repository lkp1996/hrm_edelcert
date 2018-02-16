'use strict';

angular.module('myApp.updatePassword', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/updatePassword', {
            templateUrl: 'updatePassword/updatePassword.html',
            controller: 'UpdatePasswordCtrl'
        });
    }])

    .controller('UpdatePasswordCtrl', ['$scope', '$rootScope', '$cookies', '$http', 'md5', '$location', 'Constant', function ($scope, $rootScope, $cookies, $http, md5, $location, Constant) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        }

        $scope.password = {};

        $scope.error = false;

        $scope.success = false;

        $scope.message = "";

        $scope.udpatePassword = function () {
            if ($scope.password.new1 == $scope.password.new2) {
                var password = {
                    "pk_employee": $cookies.getObject('connectedUser').id,
                    "oldPassword": md5.createHash($scope.password.old || ''),
                    "newPassword": md5.createHash($scope.password.new1 || '')
                };
                $http.post(Constant.url, password
                ).then(
                    function (data) {
                        $scope.password = {};
                        if (data.data == 1) {
                            $scope.success = true;
                            $scope.error = false;
                            $scope.message = "Mot de passe modifié";
                        } else if (data.data == 2) {
                            $scope.success = false;
                            $scope.error = true;
                            $scope.message = "Une erreur s'est produite pendant la modification du mot de passe";
                        }else{
                            $scope.success = false;
                            $scope.error = true;
                            $scope.message = "Mot de passe actuel incorrecte";
                        }

                    }
                );
            } else {
                $scope.success = false;
                $scope.error = true;
                $scope.message = "Veuillez confirmer correctement votre nouveau mot de passe";
            }
        };
    }]);