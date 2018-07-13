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

        $scope.internalQualificationsProcess = [];
        $scope.internalQualificationsCapacity = [];
        $scope.internalQualificationsStandard = [];
        $scope.modified = false;

        $scope.getInternalQualificationsProcess = function () {
            $http.get(Constant.url + "?internalqualificationsprocess_name").then(
                function (data) {
                    $scope.internalQualificationsProcess = data.data;
                }
            );
        };

        $scope.getInternalQualificationsCapacity = function () {
            $http.get(Constant.url + "?internalqualificationscapacity_name").then(
                function (data) {
                    $scope.internalQualificationsCapacity = data.data;
                }
            );
        };

        $scope.getInternalQualificationsStandard = function () {
            $http.get(Constant.url + "?internalqualificationsstandard_name").then(
                function (data) {
                    $scope.internalQualificationsStandard = data.data;
                }
            );
        };

        $scope.cancel = function () {
            $scope.modified = false;

            $scope.getInternalQualificationsProcess();
            $scope.getInternalQualificationsCapacity();
            $scope.getInternalQualificationsStandard();
        };

        $scope.modif = function () {
            $scope.modified = true;
        };

        $scope.updateIntQual = function () {
            $scope.modified = false;
        };

        $scope.addCapacity = function () {
            if (!Array.isArray($scope.internalQualificationsCapacity)) {
                $scope.internalQualificationsCapacity = [
                    {"pk_internalQualificationsCapacity": 0, "capacity": ""}
                ];
            } else {
                $scope.internalQualificationsCapacity.push({"pk_internalQualificationsCapacity": 0, "capacity": ""});
            }
        };

        $scope.addProcess = function () {
            if (!Array.isArray($scope.internalQualificationsProcess)) {
                $scope.internalQualificationsProcess = [
                    {"pk_internalQualificationsProcess": 0, "process": ""}
                ];
            } else {
                $scope.internalQualificationsProcess.push({"pk_internalQualificationsProcess": 0, "process": ""});
            }
        };

        $scope.addStandard = function () {
            if (!Array.isArray($scope.internalQualificationsStandard)) {
                $scope.internalQualificationsStandard = [
                    {"pk_internalQualificationsStandard": 0, "standard": ""}
                ];
            } else {
                $scope.internalQualificationsStandard.push({"pk_internalQualificationsStandard": 0, "standard": ""});
            }
        };

        $scope.delRow = function (element, index, id) {
            var message = "";
            if (id == 0)
                message = "Voulez-vous vraiment supprimer cet élément ?";
            else
                message = "Voulez-vous vraiment supprimer cet élément ?\nATTENTION !!! Cette action va également supprimer toutes les informations des employés concernant cet élément !";
            if (confirm(message)) {
                element.splice(index, 1);
            }
        };

        $scope.updateIntQual = function () {
            $scope.updateIntQualProcess();
            $scope.updateIntQualCapacity();
            $scope.updateIntQualStandard();
        };

        $scope.updateIntQualProcess = function () {
            $http.post(Constant.url,
                $scope.internalQualificationsProcess
            ).then(function (data) {
                console.log(data.data);
                $scope.modified = false;
                $scope.cancel();
            });
        };

        $scope.updateIntQualCapacity = function () {
            $http.post(Constant.url,
                $scope.internalQualificationsCapacity
            ).then(function (data) {
                console.log(data.data);
                $scope.modified = false;
                $scope.cancel();
            });
        };

        $scope.updateIntQualStandard = function () {
            $http.post(Constant.url,
                $scope.internalQualificationsStandard
            ).then(function (data) {
                console.log(data.data);
                $scope.modified = false;
                $scope.cancel();
            });
        };

        $scope.getInternalQualificationsProcess();
        $scope.getInternalQualificationsCapacity();
        $scope.getInternalQualificationsStandard();

    }]);