'use strict';

angular.module('myApp.updatePassword', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/updatePassword', {
            templateUrl: 'updatePassword/updatePassword.html',
            controller: 'UpdatePasswordCtrl'
        });
    }])

    .controller('UpdatePasswordCtrl', ['$scope', '$rootScope', '$cookies', '$http', 'md5', '$location', function ($scope, $rootScope, $cookies, $http, md5, $location) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        }

        $scope.udpatePassword = function(){

        };
    }]);