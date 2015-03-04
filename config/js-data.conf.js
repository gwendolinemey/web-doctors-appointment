(function () {
    "use strict";

    var JSData = require('js-data');
    var DSHttpAdapter = require('js-data-http');
    var DSProvider = new JSData.DS();

    module.exports = {
        init: function (config) {
            // global configuration
            DSProvider.registerAdapter('http', new DSHttpAdapter({
                // url: 'http://0.0.0.0:88',
                // log: console.log
            }), {
                default: true
            });
            console.log('Backend API: %s', config.api);

            DSProvider.defaults.basePath = config.api || 'http://0.0.0.0/api';
            DSProvider.defaults.idAttribute = '_id';

            // models configuration
            DSProvider.defineResource('praticiens', {
                idAttribute: 'reference'
            });

            DSProvider.defineResource('postal-codes', {
                idAttribute: 'code_postal'
            });

            DSProvider.defineResource('cabinets', {
                idAttribute: 'reference'
            });

            DSProvider.defineResource('specialites'), {
                idAttribute: 'idSpecialite'
            };
        },
        DSProvider: DSProvider
    };


})();