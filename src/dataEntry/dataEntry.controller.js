(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('dataEntryController', dataEntryController);

    /* @ngInject */
    function dataEntryController() {
        var vm = this;
        vm.title = 'dataEntryController';

        activate();

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
})();
