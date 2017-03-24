'use strict';

angular.module('myApp.employee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employee/:employeeId', {
            templateUrl: 'employee/employee.html',
            controller: 'EmployeeCtrl'
        });
    }])

    .controller('EmployeeCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

        $scope.employee = {};

        $http.get("http://localhost/hrm_edelcert_server/ctrl/ctrl.php?employee_administration=" + $routeParams.employeeId).then(
            function (data) {
                $scope.employee = data.data;
            }
        );

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

        $scope.NMSStandards = [
            {
                "id": 1,
                "name": "ISO 9001"
            },
            {
                "id": 2,
                "name": "ISO 14001"
            },
            {
                "id": 3,
                "name": "Entreprise Citoyenne"
            },
            {
                "id": 4,
                "name": "Swiss School Impulse"
            },
            {
                "id": 5,
                "name": "PRP Bientraitance"
            },
            {
                "id": 6,
                "name": "Label Soins Palliatifs ASQP"
            }
        ];
    }]);