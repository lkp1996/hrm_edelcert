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

        $scope.getEmployees = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employees_list").then(
                function (data) {
                    $scope.employees = data.data;
                }
            );
        };

        $scope.delEmployee = function (id) {
            if (confirm("Voulez-vous vraiment supprimer cet employé ?")) {
                $http.delete("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php", {
                    params: {deleteId: id}
                }).success(
                    function (data) {
                        console.log(data);
                        $scope.getEmployees();
                    }
                ).error(
                    function (data) {
                        console.log(data);
                    }
                )
            }
        };

        $scope.getEmployees();

    }]);