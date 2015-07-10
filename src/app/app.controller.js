(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('appController', appController);

    /* @ngInject */
    function appController($http) {
        var vm = this;
        vm.title = 'RBF Application';

        activate();

        ////////////////

        function activate() {
            createDataElementGroup();
        }

        function createDataElementGroup() {
            var apiURL = 'http://localhost:8080/dhis/';
            var RBF_DE_GROUP_SET = 'RBF_GROUPSET';
            var RBF_DE_GROUP = 'RBF_GROUP';
            window.console.log('happy');
            $http.get(apiURL + '/api/organisationUnitGroupSets/?filter=name:eq:' + RBF_DE_GROUP_SET)
                .then(function (orgUnitGroupSets) {
                    if (orgUnitGroupSets.data.organisationUnitGroupSets.length === 0) {
                        return $http.post(apiURL + '/api/organisationUnitGroupSets/',
                            {name: RBF_DE_GROUP_SET});
                    }
                }).then(function () {
                    $http.get(apiURL + '/api/organisationUnitGroups/?filter=name:eq:' + RBF_DE_GROUP)
                        .then(function (orgUnitGroups) {
                            if (orgUnitGroups.data.organisationUnitGroups.length === 0) {
                                return $http.post(apiURL + '/api/organisationUnitGroups/',
                                    {name: RBF_DE_GROUP});
                            }
                        });
                }
            );
        }
    }
})();
