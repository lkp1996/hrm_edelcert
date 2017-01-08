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
                "phone": "0787716628",
                "email": "lukeperrottet@gmail.com",
                "currentTitle": "Informaticien"
            },
            {
                "id": 2,
                "lastName": "Tartampion",
                "firstName": "Jules",
                "phone": "0787716628",
                "email": "tartampionj@gmail.com",
                "currentTitle": "asdf"
            },
            {
                "id": 3,
                "lastName": "Test",
                "firstName": "Test",
                "phone": "0787716628",
                "email": "test@gmail.com",
                "currentTitle": "test"
            },
            {
                "id": 4,
                "lastName": "Jordan",
                "firstName": "Michael",
                "phone": "0787716628",
                "email": "jordanm@gmail.com",
                "currentTitle": "fdsa"
            },
            {
                "id": 5,
                "lastName": "James",
                "firstName": "LeBron",
                "phone": "0787716628",
                "email": "james@gmail.com",
                "currentTitle": "qetrwrew"
            }
        ];

    }]);