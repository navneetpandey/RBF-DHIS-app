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
        }
    }
})();
