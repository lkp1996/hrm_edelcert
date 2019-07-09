'use strict';

angular.module('myApp.employee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employee/:employeeId', {
            templateUrl: 'employee/employee.html',
            controller: 'EmployeeCtrl'
        });
    }])

    .controller('EmployeeCtrl', ['$scope', '$rootScope', '$cookies', '$http', '$routeParams', 'fileUpload', '$location', 'Constant', function ($scope, $rootScope, $cookies, $http, $routeParams, fileUpload, $location, Constant) {
        if (!$rootScope.isConnected) {
            $location.path("/login");
        } else if (($rootScope.connectedUser.employeeType == "Employé" && $routeParams.employeeId != $rootScope.connectedUser.id) ||
            ($rootScope.connectedUser.employeeType == "Administrateur lecture seule" && $routeParams.employeeId == $rootScope.connectedUser.id)) {
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
        $scope.internalQualificationsProcess = [];
        $scope.internalQualificationsCapacity = [];
        $scope.internalQualificationsStandard = [];
        $scope.auditObservations = [];
        $scope.objectives = [];

        $scope.modified = false;

        $scope.cv = {};
        $scope.criminalRecord = {};
        $scope.contract = {};
        $scope.certificateIndependence = {};
        $scope.picture = {};
        $scope.formationsAttachements = [];
        $scope.professionnalExperiencesAttachements = [];
        $scope.consultingExperiencesAttachements = [];
        $scope.internalQualificationsProcessAttachements = [];
        $scope.internalQualificationsCapacityAttachements = [];
        $scope.internalQualificationsStandardAttachements = [];
        $scope.auditObservationsAttachements = [];
        $scope.mandateSheetsAttachements = [];

        $scope.attachement = Constant.attachement;

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
                name: "Expériences en conseil et en formation",
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
                name: "Objectifs",
                disabled: false
            }

        ];


        $http.get(Constant.url + "?formation_types").then(
            function (data) {
                $scope.formationTypes = data.data;
            }
        );

        $http.get(Constant.url + "?nmsstandards").then(
            function (data) {
                $scope.NMSStandards = data.data;
            }
        );

        $scope.getEmployeeAdmin = function () {
            $http.get(Constant.url + "?employee_administration=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.employee = data.data;
                    $scope.employee.birthDate = new Date($scope.employee.birthDate - 0);
                    $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate - 0);
                }
            );
        };

        $scope.getEmployeeFormations = function () {
            $http.get(Constant.url + "?employee_formation=" + $routeParams.employeeId).then(
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
            $http.get(Constant.url + "?employee_professionnalexperience=" + $routeParams.employeeId).then(
                function (data) {
                    if (!Array.isArray(data.data)) {
                        $scope.professionnalExperiences = [];
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
            $http.get(Constant.url + "?employee_consultingexperience=" + $routeParams.employeeId).then(
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

        $scope.getEmployeeAuditExp = function () {
            $http.get(Constant.url + "?employee_auditexperience=" + $routeParams.employeeId).then(
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

        $scope.getEmployeeInternalQualificationsProcess = function () {
            $http.get(Constant.url + "?employee_internalqualificationsprocess=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.internalQualificationsProcess = data.data;
                    angular.forEach($scope.internalQualificationsProcess, function (internalQualificationProcess, key) {
                        internalQualificationProcess.validationDate = new Date(internalQualificationProcess.validationDate - 0);
                    });
                }
            );
        };

        $scope.getEmployeeInternalQualificationsCapacity = function () {
            $http.get(Constant.url + "?employee_internalqualificationscapacity=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.internalQualificationsCapacity = data.data;
                    angular.forEach($scope.internalQualificationsCapacity, function (internalQualificationsCapacity, key) {
                        internalQualificationsCapacity.validationDate = new Date(internalQualificationsCapacity.validationDate - 0);
                    });
                }
            );
        };

        $scope.getEmployeeInternalQualificationsStandard = function () {
            $http.get(Constant.url + "?employee_internalqualificationsstandard=" + $routeParams.employeeId).then(
                function (data) {
                    $scope.internalQualificationsStandard = data.data;
                }
            );
        };

        $scope.getEmployeeAuditObs = function () {
            $http.get(Constant.url + "?employee_auditobservation=" + $routeParams.employeeId).then(
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

        $scope.getEmployeeObjectives = function () {
            $http.get(Constant.url + "?employee_objective=" + $routeParams.employeeId).then(
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
            $scope.getEmployeeInternalQualificationsProcess();
            $scope.getEmployeeInternalQualificationsCapacity();
            $scope.getEmployeeInternalQualificationsStandard();
            $scope.getEmployeeAuditObs();
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
            if (angular.isDefined($scope.contract) && angular.isDefined($scope.contract.name)) {
                $scope.employee.contract = $scope.contract.name;
            }
            if (angular.isDefined($scope.certificateIndependence) && angular.isDefined($scope.certificateIndependence.name)) {
                $scope.employee.certificateIndependence = $scope.certificateIndependence.name;
            }
            if (angular.isDefined($scope.picture) && angular.isDefined($scope.picture.name)) {
                $scope.employee.picture = $scope.picture.name;
            }

            $http.post(Constant.url,
                $scope.employee
            ).then(
                function (data) {
                    $scope.modified = false;
                    $scope.employee.birthDate = new Date($scope.employee.birthDate);
                    $scope.employee.comingToOfficeDate = new Date($scope.employee.comingToOfficeDate);
                    if (angular.isDefined($scope.cv) && angular.isDefined($scope.cv.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.cv, 'cv');
                    }
                    if (angular.isDefined($scope.criminalRecord) && angular.isDefined($scope.criminalRecord.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.criminalRecord, 'criminalRecord');
                    }
                    if (angular.isDefined($scope.contract) && angular.isDefined($scope.contract.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.contract, 'contract');
                    }
                    if (angular.isDefined($scope.certificateIndependence) && angular.isDefined($scope.certificateIndependence.name)) {
                        $scope.uploadFile($scope.employeeId, $scope.certificateIndependence, 'certificateIndependence');
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
                $http.post(Constant.url,
                    {"formations": "empty", "fk_employee": $scope.employeeId}
                ).then(function () {
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
                $http.post(Constant.url,
                    $scope.formations
                ).then(
                    function () {
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
                $http.post(Constant.url,
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
                $http.post(Constant.url,
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
                $http.post(Constant.url,
                    {"conexps": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                $http.post(Constant.url,
                    $scope.consultingExperiences
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            }
        };

        $scope.updateAuditExp = function () {
            if ($scope.auditExperiences.length == 0) {
                $http.post(Constant.url,
                    {"auditexps": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.auditExperiences, function (auditExperience, key) {
                    if (angular.isDefined($scope.mandateSheetsAttachements[key])) {
                        auditExperience.mandatesheet = $scope.mandateSheetsAttachements[key].name;
                    }

                });
                $http.post(Constant.url,
                    $scope.auditExperiences
                ).then(function (data) {
                    if ($scope.auditExperiences) {
                        angular.forEach($scope.auditExperiences, function (auditExperience, key) {
                            if (angular.isDefined($scope.mandateSheetsAttachements[key])) {
                                $scope.uploadFile($scope.employeeId, $scope.mandateSheetsAttachements[key], 'mandatesheets');
                            }
                        });
                    }
                    $scope.modified = false;
                    $scope.cancel();
                });
            }
        };

        $scope.updateEmployeeIntQual = function () {
            $scope.updateEmployeeIntQualProcess();
            $scope.updateEmployeeIntQualCapacity();
            $scope.updateEmployeeIntQualStandard();

        };

        $scope.updateEmployeeIntQualProcess = function () {
            angular.forEach($scope.internalQualificationsProcess, function (internalQualificationsProcess, key) {
                internalQualificationsProcess.validationDate = new Date(internalQualificationsProcess.validationDate).getTime();
                if (angular.isDefined($scope.internalQualificationsProcessAttachements[key])) {
                    internalQualificationsProcess.attachement = $scope.internalQualificationsProcessAttachements[key].name;
                }

            });
            $http.post(Constant.url,
                $scope.internalQualificationsProcess
            ).then(function (data) {
                $scope.modified = false;
                angular.forEach($scope.internalQualificationsProcess, function (internalQualificationProcess, key) {
                    internalQualificationProcess.validationDate = new Date(internalQualificationProcess.validationDate);
                });
                angular.forEach($scope.internalQualificationsProcess, function (internalQualification, key) {
                    if (angular.isDefined($scope.internalQualificationsProcessAttachements[key])) {
                        $scope.uploadFile($scope.employeeId, $scope.internalQualificationsProcessAttachements[key], 'intqual');
                    }
                });
                $scope.cancel();
            });
        };

        $scope.updateEmployeeIntQualCapacity = function () {
            angular.forEach($scope.internalQualificationsCapacity, function (internalQualificationCapacity, key) {
                internalQualificationCapacity.validationDate = new Date(internalQualificationCapacity.validationDate).getTime();
                if (angular.isDefined($scope.internalQualificationsCapacityAttachements[key])) {
                    internalQualificationCapacity.attachement = $scope.internalQualificationsCapacityAttachements[key].name;
                }

            });
            $http.post(Constant.url,
                $scope.internalQualificationsCapacity
            ).then(function (data) {
                $scope.modified = false;
                angular.forEach($scope.internalQualificationsCapacity, function (internalQualificationCapacity, key) {
                    internalQualificationCapacity.validationDate = new Date(internalQualificationCapacity.validationDate);
                });
                angular.forEach($scope.internalQualificationsCapacity, function (internalQualificationCapacity, key) {
                    if (angular.isDefined($scope.internalQualificationsCapacityAttachements[key])) {
                        $scope.uploadFile($scope.employeeId, $scope.internalQualificationsCapacityAttachements[key], 'intqual');
                    }
                });
                $scope.cancel();
            });
        };

        $scope.updateEmployeeIntQualStandard = function () {
            angular.forEach($scope.internalQualificationsStandard, function (internalQualificationStandard, key) {
                if (angular.isDefined($scope.internalQualificationsStandardAttachements[key])) {
                    internalQualificationStandard.attachement = $scope.internalQualificationsStandardAttachements[key].name;
                }

            });
            $http.post(Constant.url,
                $scope.internalQualificationsStandard
            ).then(function (data) {
                $scope.modified = false;
                angular.forEach($scope.internalQualificationsStandard, function (internalQualificationStandard, key) {
                    if (angular.isDefined($scope.internalQualificationsStandardAttachements[key])) {
                        $scope.uploadFile($scope.employeeId, $scope.internalQualificationsStandardAttachements[key], 'intqual');
                    }
                });
                $scope.cancel();
            });
        };

        $scope.updateEmployeeAuditObservations = function () {
            if ($scope.auditObservations.length == 0) {
                $http.post(Constant.url,
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
                $http.post(Constant.url,
                    $scope.auditObservations
                ).then(function (data) {
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

        $scope.updateEmployeeObjectives = function () {
            if ($scope.objectives.length == 0) {
                $http.post(Constant.url,
                    {"objectives": "empty", "fk_employee": $scope.employeeId}
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            } else {
                angular.forEach($scope.objectives, function (objective, key) {
                    objective.date = new Date(objective.date).getTime();

                });
                $http.post(Constant.url,
                    $scope.objectives
                ).then(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                });
            }
        };

        $scope.delCV = function () {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {deleteIdCV: $scope.employeeId}
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.cv = {};
                        $scope.employee.cv = null;
                    }
                );
            }
        };

        $scope.delCriminalRecord = function () {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {deleteIdCriminalRecord: $scope.employeeId}
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.criminalRecord = {};
                        $scope.employee.criminalRecord = null;
                    }
                );
            }
        };

        $scope.delContract = function () {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {deleteIdContract: $scope.employeeId}
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.contract = {};
                        $scope.employee.contract = null;
                    }
                );
            }
        };

        $scope.delCertificateIndependence = function () {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {deleteIdCertificateIndependence: $scope.employeeId}
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.certificateIndependence = {};
                        $scope.employee.certificateIndependence = null;
                    }
                );
            }
        };

        $scope.delPicture = function () {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {deleteIdPicture: $scope.employeeId}
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.picture = {};
                        $scope.employee.picture = null;
                    }
                );
            }
        };

        $scope.delFormationAttachement = function (pk_formation, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdFormationAttachement: pk_formation,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.formationsAttachements[attachementIndex] = {};
                        $scope.formations[attachementIndex].attachement = null;
                    }
                );
            }
        };

        $scope.delProfessionnalExperienceAttachement = function (pk_professionnalExperience, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdProfessionnalExperienceAttachement: pk_professionnalExperience,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.professionnalExperiencesAttachements[attachementIndex] = {};
                        $scope.professionnalExperiences[attachementIndex].attachement = null;
                    }
                );
            }
        };

        $scope.delMandateSheetsAttachements = function (pk_auditExperience, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdMandateSheetsAttachements: pk_auditExperience,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.mandateSheetsAttachements[attachementIndex] = {};
                        $scope.auditExperiences[attachementIndex].mandatesheet = null;
                    }
                );
            }
        };

        $scope.delInternalQualificationsCapacityAttachements = function (fk_internalQualificationCapacity, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdQualificationsCapacityAttachements: fk_internalQualificationCapacity,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.internalQualificationsCapacityAttachements[attachementIndex] = {};
                        $scope.internalQualificationsCapacity[attachementIndex].attachement = null;
                    }
                );
            }
        };

        $scope.delInternalQualificationsProcessAttachements = function (fk_internalQualificationProcess, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdQualificationsProcessAttachements: fk_internalQualificationProcess,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.internalQualificationsProcessAttachements[attachementIndex] = {};
                        $scope.internalQualificationsProcess[attachementIndex].attachement = null;
                    }
                );
            }
        };

        $scope.delInternalQualificationsStandardAttachements = function (fk_internalQualificationStandard, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdInternalQualificationsStandardAttachements: fk_internalQualificationStandard,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.internalQualificationsStandardAttachements[attachementIndex] = {};
                        $scope.internalQualificationsStandard[attachementIndex].attachement = null;
                    }
                );
            }
        };

        $scope.delAuditObservationsAttachements = function (pk_auditObservation, attachementIndex) {
            if (confirm("Voulez-vous vraiment supprimer ce fichier ?")) {
                $http.delete(Constant.url, {
                    params: {
                        deleteIdAuditObservationsAttachements: pk_auditObservation,
                        employeeId: $scope.employeeId
                    }
                }).then(
                    function (data) {
                        console.log(data.data);
                        $scope.auditObservationsAttachements[attachementIndex] = {};
                        $scope.auditObservations[attachementIndex].attachement = null;
                    }
                );
            }
        };

        $scope.uploadFile = function (id, file, type) {
            var uploadUrl = Constant.url;
            fileUpload.uploadFileToUrl(file, uploadUrl, id, type);
        };

        $scope.getEmployeeAdmin();
        $scope.getEmployeeFormations();
        $scope.getEmployeeProfExp();
        $scope.getEmployeeConExp();
        $scope.getEmployeeAuditExp();
        $scope.getEmployeeInternalQualificationsProcess();
        $scope.getEmployeeInternalQualificationsCapacity();
        $scope.getEmployeeInternalQualificationsStandard();
        $scope.getEmployeeAuditObs();
        $scope.getEmployeeObjectives();
    }])
;