'use strict';

angular.module('myApp.employee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employee/:employeeId', {
            templateUrl: 'employee/employee.html',
            controller: 'EmployeeCtrl'
        });
    }])

    .controller('EmployeeCtrl', ['$scope', '$rootScope', '$cookies', '$http', '$routeParams', 'fileUpload', '$location', function ($scope, $rootScope, $cookies, $http, $routeParams, fileUpload, $location) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        } else if ($routeParams.employeeId != $rootScope.connectedUser.id) {
            $location.path("/home");
        }

        $scope.employeeId = $routeParams.employeeId;

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

        $scope.cv = {};
        $scope.criminalRecord = {};
        $scope.picture = {};
        $scope.formationsAttachements = [];
        $scope.professionnalExperiencesAttachements = [];
        $scope.consultingExperiencesAttachements = [];
        $scope.internalQualificationsAttachements = [];
        $scope.auditObservationsAttachements = [];
        $scope.mandateSheetsAttachements = [];

        $scope.tabs = [
            {
                name: "Administratif",
                disabled: false
            },
            {
                name: "Formations",
                disabled: false
            },
            {
                name: "Expériences professionnelles",
                disabled: false
            },
            {
                name: "Expériences en conseil",
                disabled: false
            },
            {
                name: "Expérience en audit",
                disabled: false
            },
            {
                name: "Qualifications internes",
                disabled: false
            },
            {
                name: "Observation en audit",
                disabled: false
            },
            {
                name: "Fiches mandat",
                disabled: false
            },
            {
                name: "Objectifs",
                disabled: false
            }

        ];

        $scope.getEmployeeAdmin = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_administration=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.employee = data.data;
                    $scope.employee.birthDate = new Date($scope.employee.birthDate - 0);
                    $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate - 0);
                }
            );
        };


        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?formation_types").then(
            function (data) {
                $scope.formationTypes = data.data;
            }
        );

        $scope.getEmployeeFormations = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_formation=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.formations = [];
                    } else {

                        $scope.formations = data.data;
                        angular.forEach($scope.formations, function (formation, key) {
                            formation.EAScope = formation.EAScope - 0;
                            formation.fromDate = new Date(formation.fromDate - 0);
                            formation.toDate = new Date(formation.toDate - 0);
                        });
                    }
                }
            );
        };

        $scope.getEmployeeProfExp = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_professionnalexperience=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.formations = [];
                    } else {
                        $scope.professionnalExperiences = data.data;
                        angular.forEach($scope.professionnalExperiences, function (professionnalExperience, key) {
                            professionnalExperience.EAScope = professionnalExperience.EAScope - 0;
                            professionnalExperience.fromDate = new Date(professionnalExperience.fromDate - 0);
                            professionnalExperience.toDate = new Date(professionnalExperience.toDate - 0);
                        });
                    }
                }
            );
        };

        $scope.getEmployeeConExp = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_consultingexperience=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.consultingExperiences = [];
                    } else {
                        $scope.consultingExperiences = data.data;
                        angular.forEach($scope.consultingExperiences, function (consultingExperience, key) {
                            consultingExperience.EAScope = consultingExperience.EAScope - 0;
                        });
                    }
                }
            );
        };

        $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?nmsstandards").then(
            function (data) {
                $scope.NMSStandards = data.data;
            }
        );

        $scope.getEmployeeAuditExp = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_auditexperience=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.auditExperiences = [];
                    } else {
                        $scope.auditExperiences = data.data;
                        angular.forEach($scope.auditExperiences, function (auditExperience, key) {
                            auditExperience.EAScope = auditExperience.EAScope - 0;
                        });
                    }
                }
            );
        };

        $scope.getEmployeeInternalQualifications = function () {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_internalqualifications=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.internalQualifications = data.data;
                    angular.forEach($scope.internalQualifications, function (internalQualification, key) {
                        internalQualification.validationDate = new Date(internalQualification.validationDate - 0);
                    });
                }
            );
        };

        $scope.getEmployeeAuditObs = function() {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_auditobservation=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.auditObservations = [];
                    } else {
                        $scope.auditObservations = data.data;
                        angular.forEach($scope.auditObservations, function (auditObservation, key) {
                            auditObservation.EAScope = auditObservation.EAScope - 0;
                            auditObservation.date = new Date(auditObservation.date - 0);
                        });
                    }
                }
            );
        };

        $scope.getEmployeeMandateSheets = function() {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_mandatesheet=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.mandateSheets = [];
                    } else {
                        $scope.mandateSheets = data.data;
                        angular.forEach($scope.mandateSheets, function (mandateSheet, key) {
                            mandateSheet.EAScope = mandateSheet.EAScope - 0;
                            mandateSheet.date = new Date(mandateSheet.date - 0);
                        });
                    }
                }
            );
        };

        $scope.getEmployeeObjectives = function() {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_objective=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.objectives = data.data;
                    if (!Array.isArray(data.data)) {
                        $scope.objectives = [];
                    } else {
                        $scope.objectives = data.data;
                        angular.forEach($scope.objectives, function (objective, key) {
                            objective.date = new Date(objective.date - 0);
                        });
                    }
                }
            );
        };

        $scope.modif = function () {
            $scope.modified = true;
            angular.forEach($scope.tabs, function (tab, key) {
                if ($scope.active != key) {
                    tab.disabled = true;
                }
            });
        };

        $scope.cancel = function () {
            $scope.modified = false;

            $scope.getEmployeeAdmin();
            $scope.getEmployeeFormations();
            $scope.getEmployeeProfExp();
            $scope.getEmployeeConExp();
            $scope.getEmployeeAuditExp();
            $scope.getEmployeeInternalQualifications();
            $scope.getEmployeeAuditObs();
            $scope.getEmployeeMandateSheets();
            $scope.getEmployeeObjectives();

            angular.forEach($scope.tabs, function (tab, key) {
                tab.disabled = false;
            })
        };

        $scope.addFormationRow = function () {
            if (!Array.isArray($scope.formations)) {
                $scope.formations = [
                    {"pk_formation": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.formations.push({"pk_formation": 0, "fk_employee": $scope.employeeId});
            }
        };

        $scope.addProfExpRow = function () {
            if (!Array.isArray($scope.professionnalExperiences)) {
                $scope.professionnalExperiences = [
                    {"pk_professionnalExperience": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.professionnalExperiences.push({
                    "pk_professionnalExperience": 0,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addConExpRow = function () {
            if (!Array.isArray($scope.consultingExperiences)) {
                $scope.consultingExperiences = [
                    {"pk_consultingExperience": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.consultingExperiences.push({
                    "pk_consultingExperience": 0,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addAuditExpRow = function () {
            if (!Array.isArray($scope.auditExperiences)) {
                $scope.auditExperiences = [
                    {"pk_auditExperience": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.auditExperiences.push({
                    "pk_auditExperience": 0,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addAuditObsRow = function () {
            if (!Array.isArray($scope.auditObservations)) {
                $scope.auditObservations = [
                    {"pk_auditObservation": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.auditObservations.push({
                    "pk_auditObservation": 0,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addMandateSheetRow = function () {
            if (!Array.isArray($scope.mandateSheets)) {
                $scope.mandateSheets = [
                    {"pk_mandateSheet": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.mandateSheets.push({
                    "pk_mandateSheet": 0,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addObjectiveRow = function () {
            if (!Array.isArray($scope.objectives)) {
                $scope.objectives = [
                    {"pk_objective": 0, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.objectives.push({
                    "pk_objective": 0,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.delRow = function (element, index) {
            if (confirm("Voulez-vous vraiment supprimer cet élément ?")) {
                element.splice(index, 1);
            }
        };

        $scope.updateEmployeeAdmin = function () {
            $scope.employee.birthDate = new Date($scope.employee.birthDate).getTime();
            $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate).getTime();
            if (angular.isDefined($scope.cv) && angular.isDefined($scope.cv.name)) {
                $scope.employee.cv = $scope.cv.name;
            }
            if (angular.isDefined($scope.criminalRecord) && angular.isDefined($scope.criminalRecord.name)) {
                $scope.employee.criminalRecord = $scope.criminalRecord.name;
            }
            if (angular.isDefined($scope.picture) && angular.isDefined($scope.picture.name)) {
                $scope.employee.picture = $scope.picture.name;
            }

            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                $scope.employee
            ).then(
                function (data) {
                    $scope.modified = false;
                    $scope.employee.birthDate = new Date($scope.employee.birthDate);
                    $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate);
                    console.dir($scope.cv);
                    if (angular.isDefined($scope.cv) && angular.isDefined($scope.cv.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.cv, 'cv');
                    }
                    if (angular.isDefined($scope.criminalRecord) && angular.isDefined($scope.criminalRecord.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.criminalRecord, 'criminalRecord');
                    }
                    if (angular.isDefined($scope.picture) && angular.isDefined($scope.picture.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.picture, 'picture');
                    }
                    $scope.cancel();
                }
            );
        };

        $scope.updateFormations = function () {
            if ($scope.formations.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"formations": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.formations, function (formation, key) {
                    formation.fromDate = new Date(formation.fromDate).getTime();
                    formation.toDate = new Date(formation.toDate).getTime();
                    if (!formation.attachement) {
                        formation.attachement = null;
                    }
                    if (angular.isDefined($scope.formationsAttachements[key])) {
                        formation.attachement = $scope.formationsAttachements[key].name;
                    }

                });
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.formations
                ).then(
                    function (data) {
                        $scope.modified = false;
                        if ($scope.formations) {
                            angular.forEach($scope.formations, function (formation, key) {
                                formation.fromDate = new Date(formation.fromDate);
                                formation.toDate = new Date(formation.toDate);
                            });
                            angular.forEach($scope.formations, function (formation, key) {
                                if (angular.isDefined($scope.formationsAttachements[key])) {
                                    $scope.uploadFile($scope.employeeId, $scope.formationsAttachements[key], 'formation');
                                }
                            });
                        }
                        $scope.cancel();
                    }
                );
            }
        };

        $scope.updateProfExp = function () {
            if ($scope.professionnalExperiences.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"profexps": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.professionnalExperiences, function (professionnalExperience, key) {
                    professionnalExperience.fromDate = new Date(professionnalExperience.fromDate).getTime();
                    professionnalExperience.toDate = new Date(professionnalExperience.toDate).getTime();
                    if (angular.isDefined($scope.professionnalExperiencesAttachements[key])) {
                        professionnalExperience.attachement = $scope.professionnalExperiencesAttachements[key].name;
                    }

                });
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.professionnalExperiences
                ).then(function (data) {
                    $scope.modified = false;
                    if ($scope.professionnalExperiences) {
                        angular.forEach($scope.professionnalExperiences, function (professionnalExperience, key) {
                            professionnalExperience.fromDate = new Date(professionnalExperience.fromDate);
                            professionnalExperience.toDate = new Date(professionnalExperience.toDate);
                        });
                        angular.forEach($scope.professionnalExperiences, function (professionnalExperience, key) {
                            if (angular.isDefined($scope.professionnalExperiencesAttachements[key])) {
                                $scope.uploadFile($scope.employeeId, $scope.professionnalExperiencesAttachements[key], 'profexp');
                            }
                        });
                    }
                    $scope.cancel();
                });
            }
        };

        $scope.updateConExp = function () {
            if ($scope.consultingExperiences.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"conexps": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.consultingExperiences
                ).then(function (data) {
                    console.log(data);
                    $scope.modified = false;
                    $scope.cancel();
                });
            }
        };

        $scope.updateAuditExp = function () {
            if ($scope.auditExperiences.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"auditexps": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.auditExperiences
                ).then(function (data) {
                    console.log(data);
                    $scope.modified = false;
                    $scope.cancel();
                });
            }
        };

        $scope.updateEmployeeIntQual = function () {
            angular.forEach($scope.internalQualifications, function (internalQualifications, key) {
                internalQualifications.validationDate = new Date(internalQualifications.validationDate).getTime();
                if (angular.isDefined($scope.internalQualificationsAttachements[key])) {
                    internalQualifications.attachement = $scope.internalQualificationsAttachements[key].name;
                }

            });
            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                $scope.internalQualifications
            ).then(function (data) {
                console.log(data);
                $scope.modified = false;
                angular.forEach($scope.internalQualifications, function (internalQualification, key) {
                    internalQualification.validationDate = new Date(internalQualification.validationDate);
                });
                angular.forEach($scope.internalQualifications, function (internalQualification, key) {
                    if (angular.isDefined($scope.internalQualificationsAttachements[key])) {
                        $scope.uploadFile($scope.employeeId, $scope.internalQualificationsAttachements[key], 'intqual');
                    }
                });
                $scope.cancel();
            });
        };

        $scope.updateEmployeeAuditObservations = function(){
            if ($scope.auditObservations.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"auditObs": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.auditObservations, function (auditObservation, key) {
                    auditObservation.date = new Date(auditObservation.date).getTime();
                    if (angular.isDefined($scope.auditObservationsAttachements[key])) {
                        auditObservation.attachement = $scope.auditObservationsAttachements[key].name;
                    }

                });
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.auditObservations
                ).then(function (data) {
                    console.log(data);
                    $scope.modified = false;
                    if ($scope.auditObservations) {
                        angular.forEach($scope.auditObservations, function (auditObservation, key) {
                            auditObservation.date = new Date(auditObservation.date);
                        });
                        angular.forEach($scope.auditObservations, function (auditObservation, key) {
                            if (angular.isDefined($scope.auditObservationsAttachements[key])) {
                                $scope.uploadFile($scope.employeeId, $scope.auditObservationsAttachements[key], 'auditobs');
                            }
                        });
                    }
                    $scope.cancel();
                });
            }
        };

        $scope.updateEmployeeMandateSheets = function(){
            if ($scope.mandateSheets.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"mandateSheets": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.mandateSheets, function (mandateSheet, key) {
                    mandateSheet.date = new Date(mandateSheet.date).getTime();
                    if (angular.isDefined($scope.mandateSheetsAttachements[key])) {
                        mandateSheet.attachement = $scope.mandateSheetsAttachements[key].name;
                    }

                });
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.mandateSheets
                ).then(function (data) {
                    console.log(data);
                    $scope.modified = false;
                    if ($scope.mandateSheets) {
                        angular.forEach($scope.mandateSheets, function (mandateSheet, key) {
                            mandateSheet.date = new Date(mandateSheet.date);
                        });
                        angular.forEach($scope.mandateSheets, function (mandateSheet, key) {
                            if (angular.isDefined($scope.mandateSheetsAttachements[key])) {
                                $scope.uploadFile($scope.employeeId, $scope.mandateSheetsAttachements[key], 'mandatesheets');
                            }
                        });
                    }
                    $scope.cancel();
                });
            }
        };

        $scope.updateEmployeeObjectives = function(){
            if ($scope.objectives.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"objectives": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.objectives, function (objective, key) {
                    objective.date = new Date(objective.date).getTime();

                });
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.objectives
                ).then(function (data) {
                    console.log(data);
                    $scope.modified = false;
                    $scope.cancel();
                });
            }
        };

        $scope.uploadFile = function (id, file, type) {
            var uploadUrl = "http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php";
            fileUpload.uploadFileToUrl(file, uploadUrl, id, type);
        };

        $scope.getEmployeeAdmin();
        $scope.getEmployeeFormations();
        $scope.getEmployeeProfExp();
        $scope.getEmployeeConExp();
        $scope.getEmployeeAuditExp();
        $scope.getEmployeeInternalQualifications();
        $scope.getEmployeeAuditObs();
        $scope.getEmployeeMandateSheets();
        $scope.getEmployeeObjectives();
    }])
;