(function () {
    'use strict';

    angular
        .module('RBF.app', [
            'ngRoute', 'ngToast', 'ui.bootstrap'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/edit', {
                    templateUrl: 'edit/edit.html',
                    controller: 'editController',
                    controllerAs: 'editCtrl'
                })
                .when('/qualityAdmin', {
                    templateUrl: 'qualityAdmin/quality.html',
                    controller: 'qualityController',
                    controllerAs: 'qualityCtrl'
                })
                .when('/dataEntry', {
                    templateUrl: 'dataEntry/dataEntry.html',
                    controller: 'dataEntryController',
                    controllerAs: 'dataEntryCtrl'
                })
                .otherwise({
                    templateUrl: 'dashboard/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'dashboardCtrl'
                });
        });
    $.ajax({url: 'manifest.webapp', dataType: 'json'}).success(function (data, response) {
        angular.module('RBF.app').value('apiURL', data.activities.dhis.href);
        angular.bootstrap(document.querySelector('html'), ['RBF.app']);
    });
})();
