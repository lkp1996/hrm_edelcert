'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.employees',
    'myApp.employee',
    'myApp.newEmployee',
    'myApp.editInternalQualification',
    'myApp.updatePassword',
    'myApp.version',
    'ui.bootstrap',
    'myApp.datePicker',
    'myApp.datePickerSimple',
    'myApp.login',
    'myApp.home',
    'lr.upload',
    'angular-md5'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/login'});
}]).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).controller('AppCtrl', ['$cookies', '$scope', '$rootScope', '$route', '$http', function ($cookies, $scope, $rootScope, $route, $http) {
    $rootScope.isConnected = angular.isDefined($cookies.getObject('connectedUser'));
    $rootScope.connectedUser = $cookies.getObject('connectedUser');

    $scope.logout = function () {
        $rootScope.isConnected = false;
        $cookies.remove('connectedUser');
        $route.reload();
    };
}]).service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl, id, type) {
        var fd = new FormData();
        fd.append('id', id);
        fd.append(type, file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'Process-Data': false}
        });
    }
}]).factory('Constant', function () {
    return {
        //url: 'https://hrm-edelcert.ch/hrm_edelcert_server/ctrl/ctrl.php',
        url: 'http://localhost/hrm_edelcert_server/ctrl/ctrl.php',
        //attachement: 'https://hrm-edelcert.ch/hrm_edelcert_server/attachements'
        attachement: 'http://localhost/hrm_edelcert_server/attachements'
    };
});
