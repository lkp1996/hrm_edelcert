'use strict';

angular.module('myApp.employees', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employees', {
            templateUrl: 'employees/employees.html',
            controller: 'EmployeesCtrl'
        });
    }])

    .controller('EmployeesCtrl', ['$scope', '$rootScope', '$cookies', '$http', '$location', 'Constant', function ($scope, $rootScope, $cookies, $http, $location, Constant) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        } else if ($rootScope.connectedUser.employeeType == "Employé") {
            $location.path("/home");

        }
        $scope.employees = [];
        $scope.employeesEmailString = "";

        $scope.getEmployees = function () {
            $http.get(Constant.url + "?employees_list=" + $rootScope.connectedUser.id).then(
                function (data) {
                    $scope.employees = data.data;
                    var emailsString = "";
                    for (var i = 0; i < $scope.employees.length; i++) {
                        emailsString += $scope.employees[i].email + ",";
                    }
                    $scope.employeesEmailString = emailsString;
                }
            );
        };

        $scope.delEmployee = function (id) {
            if (confirm("Voulez-vous vraiment supprimer cet employé ?")) {
                $http.delete(Constant.url, {
                    params: {deleteId: id}
                }).then(
                    function (data) {
                        $scope.getEmployees();
                    }
                );
            }
        };

        $scope.getEmployees();

    }]);