'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http', 'md5', '$location', function ($scope, $http, md5, $location) {
        $scope.user = {};
        $scope.error = false;

        $scope.login = function () {
            var userInfo = {
                "username": $scope.user.username,
                "password": md5.createHash($scope.user.password || '')
            };
            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php", userInfo
            ).success(
                function (data) {
                    if (data == "1") {
                        $location.path("/employees")
                    }else{
                        $scope.error = true;
                    }
                }
            ).error(
                function () {
                    $scope.error = true;
                });
        }

    }]);