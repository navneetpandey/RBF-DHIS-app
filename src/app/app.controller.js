(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('appController', appController);

    /* @ngInject */
    function appController() {
        var vm = this;
        vm.title = 'RBF Application';

        activate();

        ////////////////

        function activate() {
            createDataElementGroup();
        }

        function createDataElementGroup($http) {
            var apiURL = 'http://localhost:8080/dhis/';
            var RBF_DE_GROUP = 'RBF_DE_GROUP';
            return $http.post(apiURL + '/api/metadata/', {organisationUnitGroups: RBF_DE_GROUP});
        }
    }
})();
