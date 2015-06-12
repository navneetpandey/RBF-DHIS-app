(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('dashboardController', dashboardController);

    /* @ngInject */
    function dashboardController() {
        var vm = this;
        vm.title = 'dashboardController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
