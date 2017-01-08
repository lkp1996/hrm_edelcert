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
            "id": 1,
            "picture": "../images/luke_perrottet.jpeg",
            "lastName": "Luke",
            "firstName": "Perrottet",
            "birthDate": 829000800000,
            "address": "En Palud 26",
            "postCode": "1643",
            "location": "Gumefens",
            "avs": "7560180209676",
            "phone": "0787716628",
            "email": "lukeperrottet@gmail.com",
            "currentTitle": "Informaticien",
            "comingToOfficeDate": 1483225200000,
            "currentHourlyWage": "20.00 CHF",
            "adminAttachements": [
                {
                    "url": ""
                }
            ],
            "formations": [
                {
                    "formativeOrganization": "Ecole des Métiers de Fribourg",
                    "formationType": 1,
                    "EAScope": 24,
                    "fromDate": 1314223200000,
                    "toDate": 1435183200000
                }
            ]
        };

        $scope.formations = [
            {
                "id": 1,
                "formation": "CFC"
            },
            {
                "id": 2,
                "formation": "ES"
            },
            {
                "id": 3,
                "formation": "HES"
            },
            {
                "id": 4,
                "formation": "CAS"
            },
            {
                "id": 5,
                "formation": "DAS"
            },
            {
                "id": 6,
                "formation": "MAS"
            },
            {
                "id": 7,
                "formation": "Attestation FC"
            }
        ];
    }]);