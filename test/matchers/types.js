beforeEach(function () {
    jasmine.Expectation.addMatchers({
        toBeAnObject: function () {
            return {
                compare: function (actual) {
                    var result = jQuery.isObject(actual);

                    return {
                        pass: result,
                        message: 'Expected ' + actual + (result ? ' NOT' : '') + ' to be an object'
                    };
                }
            }
        },

        toBeAnArray: function () {
            return {
                compare: function (actual) {
                    var result = jQuery.isArray(actual);

                    return {
                        pass: result,
                        message: 'Expected ' + actual + (result ? ' NOT' : '') + ' to be an array'
                    };
                }
            };
        },

        toBeAFunction: function () {
            return {
                compare: function (actual) {
                    var result = jQuery.isFunction(actual);

                    return {
                        pass: result,
                        message: 'Expected ' + actual + (result ? ' NOT' : '') + ' to be an function'
                    };
                }
            }
        },

        toBeAPromiseLikeObject: function () {
            return {
                compare: function (actual) {
                    var result = jQuery.isFunction(actual.then) &&
                        jQuery.isFunction(actual.catch) &&
                        jQuery.isFunction(actual.finally);

                    return {
                        pass: result,
                        message: 'Expected ' + actual + (result ? ' NOT' : '') + ' to have the functions then, catch and finally'
                    };
                }
            }
        }
    });
});
