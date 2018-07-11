'use strict';

angular.module('myApp.editInternalQualification', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editInternalQualification', {
            templateUrl: 'editInternalQualification/editInternalQualification.html',
            controller: 'EditInternalQualificationCtrl'
        });
    }])

    .controller('EditInternalQualificationCtrl', ['$scope', '$rootScope', '$cookies', '$http', 'fileUpload', '$location', 'Constant', function ($scope, $rootScope, $cookies, $http, fileUpload, $location, Constant) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        } else if ($rootScope.connectedUser.employeeType == "Employé" || $rootScope.connectedUser.employeeType == "Administrateur lecture seule") {
            $location.path("/home");
        }

        $scope.employee = {"role": "employee"};

        $scope.internalQualifications = [];

        $scope.iqStepsNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        $scope.iqCapacitiesNum = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

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
            $http.post(Constant.url, $scope.employee
            ).then(
                function (data) {
                    id = data;
                    $scope.uploadFile(id, $scope.picture, 'picture');
                    $scope.uploadFile(id, $scope.cv, 'cv');
                    $scope.uploadFile(id, $scope.criminalRecord, 'criminalRecord');
                    $scope.employee = {};
                    $scope.picture = undefined;
                    $scope.cv = undefined;
                    $scope.criminalRecord = undefined;

                }
            );
        };

        $scope.getIQNames = function () {
            $http.get(Constant.url + "?internalqualification_names").then(
                function (data) {
                    $scope.internalQualifications = data.data;
                }
            )
        };

        $scope.getIQNames();

    }]);