'use strict';

angular.module('myApp.employee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employee/:employeeId', {
            templateUrl: 'employee/employee.html',
            controller: 'EmployeeCtrl'
        });
    }])

    .controller('EmployeeCtrl', ['$scope', function ($scope) {

        $scope.employee = {
            "id" : 1,
            "picture" : "../images/luke_perrottet.jpeg",
            "lastName" : "Luke",
            "firstName" : "Perrottet",
            "birthDate" : "",
            "address" : "",
            "postCode" : "",
            "location" : "",
            "avs" : "",
            "phone" : "",
            "email" : "",
            "currentTitle" : "Informaticien",
            "comingToOfficeDate" : "",
            "attachements" : [
                {
                    "url" : ""
                }
            ]
        };
    }]);