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

        $scope.employeeTemp = {};
        $scope.formationTypesTemp = [];
        $scope.formationsTemp = [];
        $scope.professionnalExperiencesTemp = [];
        $scope.consultingExperiencesTemp = [];
        $scope.NMSStandardsTemp = [];
        $scope.auditExperiencesTemp = [];
        $scope.internalQualificationsTemp = [];
        $scope.auditObservationsTemp = [];
        $scope.objectivesTemp = [];
        $scope.mandateSheetsTemp = [];

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
            $scope.modified = true;

            $scope.employeeTemp = $scope.employee;
            $scope.formationTypesTemp = $scope.formationTypes;
            $scope.formationsTemp = $scope.formations;
            $scope.professionnalExperiencesTemp = $scope.professionnalExperiences;
            $scope.consultingExperiencesTemp = $scope.consultingExperiences;
            $scope.NMSStandardsTemp = $scope.NMSStandards;
            $scope.auditExperiencesTemp = $scope.auditExperiences;
            $scope.internalQualificationsTemp = $scope.internalQualifications;
            $scope.auditObservationsTemp = $scope.auditObservations;
            $scope.objectivesTemp = $scope.objectives;
            $scope.mandateSheetsTemp = $scope.mandateSheets;
        };

        $scope.cancel = function () {
            $scope.modified = false;

            $scope.employee = $scope.employeeTemp;
            $scope.formationTypes = $scope.formationTypesTemp;
            $scope.formations = $scope.formationsTemp;
            $scope.professionnalExperiences = $scope.professionnalExperiencesTemp;
            $scope.consultingExperiences = $scope.consultingExperiencesTemp;
            $scope.NMSStandards = $scope.NMSStandardsTemp;
            $scope.auditExperiences = $scope.auditExperiencesTemp;
            $scope.internalQualifications = $scope.internalQualificationsTemp;
            $scope.auditObservations = $scope.auditObservationsTemp;
            $scope.objectives = $scope.objectivesTemp;
            $scope.mandateSheets = $scope.mandateSheetsTemp;
        };

        $scope.addRow = function (element) {
            element.push({});
        };

        $scope.delRow = function (element, index) {
            if (confirm("Voulez-vous vraiment supprimer cet élément ?")) {
                element.splice(index, 1);
            }
        };

    }]);