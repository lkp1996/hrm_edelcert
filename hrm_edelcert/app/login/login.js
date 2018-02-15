'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$rootScope', '$cookies', '$http', 'md5', '$location', function ($scope, $rootScope, $cookies, $http, md5, $location) {
        if ($rootScope.isConnected) {
            $location.path("/home");
        }

        $scope.user = {};
        $scope.error = false;
        $scope.isAdmin = null;

        $scope.login = function () {
            var userInfo = {
                "username": $scope.user.username,
                "password": md5.createHash($scope.user.password || '')
            };
            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php", userInfo
            ).then(
                function (data) {
                    if (data.data == "1") {
                        $scope.setConnectedUser($scope.user.username);
                        $rootScope.isConnected = true;
                        $location.path("/home")
                    } else {
                        $scope.error = true;
                    }
                }
            );
        };

        $scope.setConnectedUser = function (username) {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?getUserID=" + username
            ).then(
                function (data) {
                    $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?isAdmin=" + data.data
                    ).then(
                        function (data1) {
                            var connectedUserInfo = {
                                "username": $scope.user.username,
                                "id": data.data,
                                "isAdmin" : data1.data
                            };
                            $cookies.putObject("connectedUser", connectedUserInfo);
                            $rootScope.connectedUser = $cookies.getObject('connectedUser');
                        }
                    );
                }
            );
        };

    }]);