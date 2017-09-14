'use strict';

angular.module('myApp.newEmployee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newEmployee', {
            templateUrl: 'newEmployee/newEmployee.html',
            controller: 'NewEmployeeCtrl'
        });
    }])

    .controller('NewEmployeeCtrl', ['$scope', '$http', 'fileUpload', function ($scope, $http, fileUpload) {
        $scope.employee = {};

        $scope.add = function () {
            $scope.employee.birthDate = new Date($scope.employee.birthDate).getTime();
            $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate).getTime();
            if (angular.isDefined($scope.picture)) {
                $scope.employee.picture = $scope.picture.name;
            }
            if (angular.isDefined($scope.cv)) {
                $scope.employee.cv = $scope.cv.name;
            }
            if (angular.isDefined($scope.criminalRecord)) {
                $scope.employee.criminalRecord = $scope.criminalRecord.name;
            }

            var id = null;
            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php", $scope.employee
            ).success(
                function (data) {
                    console.log(data);
                    id = data;
                    $scope.uploadFile(id, $scope.picture, 'picture');
                    $scope.uploadFile(id, $scope.cv, 'cv');
                    $scope.uploadFile(id, $scope.criminalRecord, 'criminalRecord');
                    $scope.employee = {};
                    $scope.picture = undefined;
                    $scope.cv = undefined;
                    $scope.criminalRecord = undefined;

                }
            ).error(
                function (data) {
                    console.log("error");
                });
        };

        $scope.uploadFile = function (id, file, type) {
            var uploadUrl = "http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php";
            fileUpload.uploadFileToUrl(file, uploadUrl, id, type);
        };

    }]);