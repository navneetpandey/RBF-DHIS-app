(function () {
    'use strict';

    angular
        .module('RBF.app')
        .controller('qualityController', qualityController)
        .factory('serviceLists', serviceLists)
        .factory('serviceList', serviceList)
        .factory('categoryOptionService', categoryOptionService);

    /* @ngInject */
    function qualityController(serviceLists, ngToast) {
        var vm = this;
        vm.title = 'qualityController';
        vm.save = save;
        vm.add = add;
        vm.getServices = getServices;
        activate();
        var qualityServices = serviceLists('quality');

        function activate() {
        }

        function getServices() {
            return qualityServices.getServices();
        }
        function save() {
            qualityServices.save()
            // .success(function (data, status, headers, config) {
            //     ngToast.create(data.importCount.imported);
            // })
            // .error(function (data, status, headers, config) {
            //     });
            .then(function (response) {
                ngToast.create(response.data.importCount.imported);
            })
            .catch(function (response) {
                console.error('Gists error', response.status, response.data);
            })
            .finally(function () {
                console.log('finally finished gists');
            });

        }
        function add() {
            qualityServices.addService('');
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

    function serviceLists(serviceList) {
        var suffixesMap = {
            quality: ['_ATR', '_AVL'],
            quantity: ['_RES', '_DEC', '_VER', '_TRF']
        };
        var servicesLists = {
        };

        return function (listName) {
            if (!suffixesMap[listName]) {
                throw Error('No suffix found');
            }

            if (!servicesLists[listName]) {
                servicesLists[listName] = serviceList(suffixesMap[listName]);//create
            }
            return servicesLists[listName];
        };
    }

    function serviceList($http, apiURL, $q, categoryOptionService) {
        return function (suffixes) {
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
                    suffixes.forEach(function (suffix) {
                        servicesWithAllTypes.push(addSuffixToDE(dataElement, suffix));
                    });
                    // servicesWithAllTypes.push(addSuffixToDE(dataElement, '_ATR'));
                    // servicesWithAllTypes.push(addSuffixToDE(dataElement, '_AVL'));
                });
                return categoryOptionService.getDefault()
                    .then(function (defaultCategoryComboID) {
                        servicesWithAllTypes.forEach(function (dataElement) {
                             dataElement.categoryCombo = defaultCategoryComboID;
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
        };
    }

})();
