'use strict';

angular.module('myApp.employee', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employee/:employeeId', {
            templateUrl: 'employee/employee.html',
            controller: 'EmployeeCtrl'
        });
    }])

    .controller('EmployeeCtrl', ['$scope', '$http', '$routeParams', 'fileUpload', function ($scope, $http, $routeParams, fileUpload) {

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
        $scope.formationsAttachements = [];
        $scope.professionnalExperiencesAttachements = [];
        $scope.consultingExperiencesAttachements = [];

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
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_formation=" + $routeParams.employeeId).success(
                function (data) {
                    if (!Array.isArray(data)) {
                        $scope.formations = [];
                    } else {
                        $scope.formations = data;
                        angular.forEach($scope.formations, function (formation, key) {
                            formation.EAScope = formation.EAScope - 0;
                            formation.fromDate = new Date(formation.fromDate - 0);
                            formation.toDate = new Date(formation.toDate - 0);
                        });
                    }
                }
            ).error(function (data) {
                console.log("error");
                $scope.formations = [];
            });
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

        $scope.getEmployeeConExp = function() {
            $http.get("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php?employee_consultingexperience=" + $routeParams.employeeId).then(
                function (data) {
                    console.log(data);
                    if (!Array.isArray(data.data)) {
                        $scope.consultingExperiences = [];
                    }else {
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

            angular.forEach($scope.tabs, function (tab, key) {
                tab.disabled = false;
            })
        };

        $scope.addFormationRow = function () {
            if (!Array.isArray($scope.formations)) {
                $scope.formations = [
                    {"pk_formation": null, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.formations.push({"pk_formation": null, "fk_employee": $scope.employeeId});
            }
        };

        $scope.addProfExpRow = function () {
            if (!Array.isArray($scope.professionnalExperiences)) {
                $scope.professionnalExperiences = [
                    {"pk_professionnalExperience": null, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.professionnalExperiences.push({
                    "pk_professionnalExperience": null,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addConExpRow = function () {
            if (!Array.isArray($scope.consultingExperiences)) {
                $scope.consultingExperiences = [
                    {"pk_consultingExperience": null, "fk_employee": $scope.employeeId}
                ];
            } else {
                $scope.consultingExperiences.push({
                    "pk_consultingExperience": null,
                    "fk_employee": $scope.employeeId
                });
            }
        };

        $scope.addRow = function (element) {
            element.push({});
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

            $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                $scope.employee
            ).success(
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
                    $scope.cancel();
                }
            ).error(
                function (data) {
                    console.log(data);
                }
            )
        };

        $scope.updateFormations = function () {
            if ($scope.formations.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"formations": "empty", "fk_employee": $scope.employeeId}
                ).success(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                }).error(
                    function (data) {
                        console.log(data);
                    }
                );
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
                ).success(
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
                ).error(
                    function (data) {
                        console.log(data);
                    }
                );
            }
        };

        $scope.updateProfExp = function () {
            if ($scope.professionnalExperiences.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"profexps": "empty", "fk_employee": $scope.employeeId}
                ).success(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                }).error(
                    function (data) {
                        console.log(data);
                    }
                );
            } else {
                angular.forEach($scope.professionnalExperiences, function (professionnalExperience, key) {
                    professionnalExperience.fromDate = new Date(professionnalExperience.fromDate).getTime();
                    professionnalExperience.toDate = new Date(professionnalExperience.toDate).getTime();
                    console.dir($scope.professionnalExperiencesAttachements[key]);
                    if (angular.isDefined($scope.professionnalExperiencesAttachements[key])) {
                        professionnalExperience.attachement = $scope.professionnalExperiencesAttachements[key].name;
                    }

                });
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.professionnalExperiences
                ).success(function (data) {
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
                }).error(function (data) {
                    console.log(data);
                });
            }
        };

        $scope.updateConExp = function(){
            if ($scope.consultingExperiences.length == 0) {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    {"conexps": "empty", "fk_employee": $scope.employeeId}
                ).success(function (data) {
                    $scope.modified = false;
                    $scope.cancel();
                }).error(
                    function (data) {
                        console.log(data);
                    }
                );
            } else {
                $http.post("http://localhost:8888/hrm_edelcert_server/ctrl/ctrl.php",
                    $scope.consultingExperiences
                ).success(function (data) {
                    console.log(data);
                    $scope.modified = false;
                    $scope.cancel();
                }).error(function (data) {
                    console.log(data);
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
    }])
;