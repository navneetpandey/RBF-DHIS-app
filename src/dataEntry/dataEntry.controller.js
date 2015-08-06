(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('dataEntryController', dataEntryController)
        .factory('orguf', orgUnitGroupServices);

    /* @ngInject */
    function dataEntryController(orguf, $http, $scope) {
        var vm = this;
        vm.title = 'dataEntryController';
        var orguS = orguf();
        vm.add = orguS.addOrgUnitGroup;
        $scope.setUGName = orguS.setorgUnitGroupName;
        $scope.setUGSName = orguS.setorgUnitGroupShortName;
        activate();
        var orgUnitGroupShortName = 'DEFS0';
        ////////////////

        function activate() {
            window.loadOrganisationUnitGroup();
            window.selectionTreeSelection.setMultipleSelectionAllowed(true);
            //jscs:disable
            window.selectedOrganisationUnitList__ = window.jQuery('#treeSelectedId');
            //jscs:enable

            //Clears old selection
            window.selectionTree.clearSelectedOrganisationUnits();

            window.selectionTree.buildSelectionTree();
        }
    }

    function orgUnitGroupServices($http) {
        return function () {
        var orgUnitGroupName = '';
        var orgUnitGroupShortName = '';
        //apiURL, orgUnitIDs, orgUnitName
        //TODO: Check for already exist
        // $http.post(apiURL + '/api/organisationUnitGroupSets/',  )
        var addOrgUnitGroup = function () {
            //$http.post('http://localhost:8080/dhis/api/organisationUnitGroupSets', OrgUnitGroup)
            var orgUnitIds = [];
            window.selectionTreeSelection.getSelected().forEach(function (idk) {
                orgUnitIds.push({ id: idk});
            });
            var OrgUnitGroup = {
                name: orgUnitGroupName,
                shortName: orgUnitGroupShortName,
                organisationUnits: orgUnitIds
            };
            $http.post('http://localhost:8080/dhis/api/organisationUnitGroups', OrgUnitGroup)
            //, OrgUnitGroup)
         .catch(function (response) {
                console.error('Some error', response.status, response.data);
            })
            .finally(function () {
                console.log('Some error2');
            });
        };

        var setorgUnitGroupName = function (name) {
            return arguments.length ? (orgUnitGroupName = name) : orgUnitGroupName;
        };

        var setorgUnitGroupShortName = function (name) {
            return arguments.length ? (orgUnitGroupShortName = name) : orgUnitGroupShortName;
        };

        return {

            addOrgUnitGroup: addOrgUnitGroup,
            setorgUnitGroupName: setorgUnitGroupName,
            setorgUnitGroupShortName: setorgUnitGroupShortName
        };
    };
    }

})();
