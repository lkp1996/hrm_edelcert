'use strict';

angular.module('myApp.employees', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employees', {
            templateUrl: 'employees/employees.html',
            controller: 'EmployeesCtrl'
        });
    }])

    .controller('EmployeesCtrl', ['$scope', function ($scope) {

        $scope.employees = [
            {
                "id": 1,
                "lastName": "Perrottet",
                "firstName": "Luke",
                "birthDate": 829000800000
            },
            {
                "id": 2,
                "lastName": "Tartampion",
                "firstName": "Jules",
                "birthDate": 946681200000
            },
            {
                "id": 3,
                "lastName": "Test",
                "firstName": "Test",
                "birthDate": 338079600000
            },
            {
                "id": 4,
                "lastName": "Jordan",
                "firstName": "Michael",
                "birthDate": 917564400000
            },
            {
                "id": 5,
                "lastName": "James",
                "firstName": "LeBron",
                "birthDate": 817564400000
            }
        ];

    }]);