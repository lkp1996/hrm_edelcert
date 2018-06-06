'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        }
    }]);