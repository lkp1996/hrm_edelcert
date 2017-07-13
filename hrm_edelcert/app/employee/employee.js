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
        $scope.formationTypes = [];
        $scope.formations = [];
        $scope.professionnalExperiences = [];
        $scope.consultingExperiences = [];
        $scope.NMSStandards = [];
        $scope.auditExperiences = [];
        $scope.internalQualifications = [];
        $scope.auditObservations = [];
        $scope.objectives = [];
        $scope.mandateSheets = [];
        $scope.modified = false;

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_administration=" + $routeParams.employeeId).then(
            function (data) {
                $scope.employee = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?formation_types").then(
            function (data) {
                $scope.formationTypes = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_formation=" + $routeParams.employeeId).then(
            function (data) {
                $scope.formations = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_professionnalexperience=" + $routeParams.employeeId).then(
            function (data) {
                $scope.professionnalExperiences = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_consultingexperience=" + $routeParams.employeeId).then(
            function (data) {
                $scope.consultingExperiences = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?nmsstandards").then(
            function (data) {
                $scope.NMSStandards = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_auditexperience=" + $routeParams.employeeId).then(
            function (data) {
                $scope.auditExperiences = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_internalqualifications=" + $routeParams.employeeId).then(
            function (data) {
                $scope.internalQualifications = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_auditobservation=" + $routeParams.employeeId).then(
            function (data) {
                $scope.auditObservations = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_objective=" + $routeParams.employeeId).then(
            function (data) {
                $scope.objectives = data.data;
            }
        );

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_mandatesheet=" + $routeParams.employeeId).then(
            function (data) {
                $scope.mandateSheets = data.data;
            }
        );

        $scope.modif = function () {
            $scope.modified = !$scope.modified;
        };

    }]);