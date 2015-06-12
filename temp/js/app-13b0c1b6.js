(function () {
    'use strict';

    angular
        .module('RBF.app', [
            'ngRoute', 'ngToast', 'ui.bootstrap'
        ])
        .value('apiURL', 'http://109.74.202.200/dhis/')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/edit', {
                    templateUrl: 'edit/edit-e8e6fa61.html',
                    controller: 'editController',
                    controllerAs: 'editCtrl'
                })
                .otherwise({
                    templateUrl: 'dashboard/dashboard-6e364761.html',
                    controller: 'dashboardController',
                    controllerAs: 'dashboardCtrl'
                });
        });
})();

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

(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('editController', editController)
        .service('services', services);

    /* @ngInject */
    function editController(services, ngToast) {
        var vm = this;
        vm.title = 'editController';
        vm.save = save;
        vm.add = add;
        vm.getServices = getServices;
        activate();

        ////////////////

        function activate() {
        }

        function getServices() {
            return services.getServices();
        }
        function save() {
            services.save()
            .success(function (data, status, headers, config) {
                ngToast.create(data.importCount.imported);
            })
            .error(function (data, status, headers, config) {
                });

        }
        function add() {
            services.addService('');
        }

    }
    function services($http, apiURL, $q) {
        var servicesList = [{
            name: 'write service name here', shortName: 'WSNH', code: 'WSNH',
            type: 'int', aggregationOperator: 'sum', domainType: 'AGGREGATE',
            formName: ''
        }];
        this.save = save;

        this.addService = function () {
            servicesList.push({name: '', shortName: '', code: '',
                aggregationOperator: 'sum', type: 'int', domainType: 'AGGREGATE', formName: ''});
        };
        this.getServices = function () {
            return servicesList;
        };

        // function save() {
        //     servicesList.forEach(function (serviceObject) {
        //         $http.post(apiURL + '/api/dataElements/', serviceObject)
        //         .success(function (data, status, headers, config) {
        //         })
        //         .error(function (data, status, headers, config) {
        //         });
        //     });
        // }
        // function save() {
        //     var vm = this;
        //     vm.httpCall = httpCall;
        //     var servicesListToSave = servicesList.filter(function (dataElement) {
        //         if (dataElement.name.trim() === '' || dataElement.shortName.trim() === '' ||
        //             dataElement.code.trim() === '') {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     });
        //     httpCall(servicesListToSave, '_DEC');
        //     httpCall(servicesListToSave, '_VER');
        //     return httpCall(servicesListToSave, '_TRF');

        //     function httpCall(servicesListToSave, argument) {
        //         var servicesListDouble = [];
        //         angular.forEach(servicesListToSave, function (dataElement) {
        //         var dataElementCopy = angular.copy(dataElement);
        //         dataElementCopy.code = dataElement.code + argument;
        //         dataElementCopy.name = dataElement.name + argument;
        //         dataElementCopy.shortName = dataElement.shortName + argument;
        //         dataElementCopy.formName = dataElement.name;
        //         this.push(dataElementCopy);
        //     }, servicesListDouble);
        //         return $http.post(apiURL + '/api/metadata/',
        //         {dataElements: servicesListDouble});
        //     }
        // }
        // return $q.all([httpCall(servicesListToSave, '_DEC'), httpCall(servicesListToSave, '_VER'),
        //       httpCall(servicesListToSave, '_TRF')]);
        function save() {
            var servicesListToSave = servicesList.filter(function (dataElement) {
                if (dataElement.name.trim() === '' || dataElement.shortName.trim() === '' ||
                    dataElement.code.trim() === '') {
                    return false;
                } else {
                    return true;
                }
            });
            var servicesWithAllTypes = [];
            servicesListToSave.forEach(function (dataElement) {

                servicesWithAllTypes.push(addSuffixToDE(dataElement, '_DEC'));
                servicesWithAllTypes.push(addSuffixToDE(dataElement, '_VER'));
                servicesWithAllTypes.push(addSuffixToDE(dataElement, '_TRF'));
                servicesWithAllTypes.push(addSuffixToDE(dataElement, '_RES'));

            });

            return $http.post(apiURL + '/api/metadata/',
                {dataElements: servicesWithAllTypes});

            function addSuffixToDE(dataElement, argument) {
                var dataElementCopy = angular.copy(dataElement);
                dataElementCopy.code = dataElement.code + argument;
                dataElementCopy.name = dataElement.name + argument;
                dataElementCopy.shortName = dataElement.shortName + argument;
                dataElementCopy.formName = dataElement.name;
                return dataElementCopy;
            }
        }
    }

})();

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
