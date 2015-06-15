(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('qualityController', qualityController)
        .factory('services', services)
        .factory('categoryOptionService', categoryOptionService);

    /* @ngInject */
    function qualityController(services, ngToast, defaultCategoryComboId) {
        var vm = this;
        vm.title = 'editController';
        vm.save = save;
        vm.add = add;
        vm.getServices = getServices;
        activate();

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

    function categoryOptionService($http) {
        return {
            getDefault: function () {
                return $http.get(apiURL + '/api/categoryCombos.json?filter=name:eq:default', {cache: true});
            }
        };
    }

    function services($http, apiURL, $q) {
        var servicesList = [{
            name: '', shortName: '', code: '',
            type: 'int', aggregationOperator: 'sum', domainType: 'AGGREGATE',
            formName: '', numberType: 'number'
        }];

        return {
            save: save,
            addService: addService,
            getServices: getServices
        };

        function addService() {
            servicesList.push({name: '', shortName: '', code: '',
            aggregationOperator: 'sum', type: 'int', domainType: 'AGGREGATE', formName: '',
            numberType: 'number', categoryCombo: {id:'rZxWEfqkIJr'}});
        }

        function getServices() {
            return servicesList;
        }

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

                servicesWithAllTypes.push(addSuffixToDE(dataElement, '_ATR'));
                servicesWithAllTypes.push(addSuffixToDE(dataElement, '_AVL')); 

            });

            
            return $http.post(apiURL+ '/api/metadata/',
                {dataElements: servicesWithAllTypes});
            })
            .catch(function (argument) {
                //handle error
            })

            

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
