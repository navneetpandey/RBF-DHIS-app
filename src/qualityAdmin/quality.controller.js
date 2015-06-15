(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('qualityController', qualityController)
        .factory('services1', services1)
        .factory('categoryOptionService', categoryOptionService);

    /* @ngInject */
    function qualityController(services1, ngToast) {
        var vm = this;
        vm.title = 'qualityController';
        vm.save = save;
        vm.add = add;
        vm.getServices = getServices;
        activate();

        function activate() {
        }

        function getServices() {
            return services1.getServices();
        }
        function save() {
            services1.save()
            .success(function (data, status, headers, config) {
                ngToast.create(data.importCount.imported);
            })
            .error(function (data, status, headers, config) {
                });

        }
        function add() {
            services1.addService('');
        }

    }

    function categoryOptionService($http, apiURL) {
        return {
            getDefault: function () {
                return $http.get(apiURL + '/api/categoryCombos.json?filter=name:eq:default', {cache: true})
                    .then(function (response) {
                                    return response.data.categoryCombos[0];
                                })
                                .catch(function (error) {
                                    console.error(error);
                                });
            }
        };
    }

    function services1($http, apiURL, $q, categoryOptionService) {
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
            numberType: 'number'});
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
            return categoryOptionService.getDefault()
                .then(function (defaultCategoryComboId) {
                    servicesWithAllTypes.forEach(function (dataElement) {
                         dataElement.categoryCombo = defaultCategoryComboId;
                     });
                    return $http.post(apiURL + '/api/metadata/', {dataElements: servicesWithAllTypes});
                })
                .catch(function (argument) {
                    //handle error
                });

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
