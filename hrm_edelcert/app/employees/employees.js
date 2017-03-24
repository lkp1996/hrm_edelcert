'use strict';

angular.module('myApp.employees', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employees', {
            templateUrl: 'employees/employees.html',
            controller: 'EmployeesCtrl'
        });
    }])

    .controller('EmployeesCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.employees = [];

        $http.get("http://localhost/hrm_edelcert_server/ctrl/ctrl.php?employees_list").then(
            function (data) {
                $scope.employees = data.data;
            }
        );

    }]);