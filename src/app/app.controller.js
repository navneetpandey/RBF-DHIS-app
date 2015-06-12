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
        }
    }
})();
