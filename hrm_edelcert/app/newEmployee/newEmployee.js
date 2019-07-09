'use strict';

angular.module('myApp.newEmployee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newEmployee', {
            templateUrl: 'newEmployee/newEmployee.html',
            controller: 'NewEmployeeCtrl'
        });
    }])

    .controller('NewEmployeeCtrl', ['$scope', '$rootScope', '$cookies', '$http', 'fileUpload', '$location', 'Constant', function ($scope, $rootScope, $cookies, $http, fileUpload, $location, Constant) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        } else if ($rootScope.connectedUser.employeeType == "Employé" || $rootScope.connectedUser.employeeType == "Administrateur lecture seule") {
            $location.path("/home");
        }

        $scope.employee = {"role": "employee"};

        $scope.types = [];

        $scope.add = function () {
            $scope.employee.birthDate = new Date($scope.employee.birthDate).getTime();
            $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate).getTime();

            var id = null;
            $http.post(Constant.url, $scope.employee
            ).then(
                function (data) {
                    id = data;
                    $scope.employee = {};
                }
            );
        };

        $scope.getTypeList = function () {
            $http.get(Constant.url + "?type_list").then(
                function (data) {
                    $scope.types = data.data;
                }
            )
        };

        $scope.uploadFile = function (id, file, type) {
            var uploadUrl = Constant.url;
            fileUpload.uploadFileToUrl(file, uploadUrl, id, type);
        };

        $scope.getTypeList();

    }]);