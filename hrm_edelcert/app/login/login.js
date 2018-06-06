'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$rootScope', '$cookies', '$http', 'md5', '$location', 'Constant', function ($scope, $rootScope, $cookies, $http, md5, $location, Constant) {
        if ($rootScope.isConnected) {
            $location.path("/home");
        }

        $scope.user = {};
        $scope.error = false;

        $scope.login = function () {
            var userInfo = {
                "username": $scope.user.username,
                "password": md5.createHash($scope.user.password || '')
            };
            $http.post(Constant.url, userInfo
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
            $http.get(Constant.url + "?getUserID=" + username
            ).then(
                function (data) {
                    $http.get(Constant.url + "?employeeType=" + data.data
                    ).then(
                        function (data1) {
                            var connectedUserInfo = {
                                "username": $scope.user.username,
                                "id": data.data,
                                "employeeType" : data1.data
                            };
                            $cookies.putObject("connectedUser", connectedUserInfo);
                            $rootScope.connectedUser = $cookies.getObject('connectedUser');
                        }
                    );
                }
            );
        };

    }]);