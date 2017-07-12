'use strict';

angular.module('myApp.newEmployee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newEmployee', {
            templateUrl: 'newEmployee/newEmployee.html',
            controller: 'NewEmployeeCtrl'
        });
    }])

    .controller('NewEmployeeCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.employee = {};

        $scope.add = function () {
            $scope.employee.birthDate = new Date($scope.employee.birthDate).getTime();
            $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate).getTime();
            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?add_employee", $scope.employee).then(
                function (data) {
                    console.log(data);
                    $scope.employee = {};
                }
            )
        }
    }]);