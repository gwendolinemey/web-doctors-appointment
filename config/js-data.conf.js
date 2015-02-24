(function () {
    "use strict";

    var JSData = require('js-data');
    var DSHttpAdapter = require('js-data-http');
    var DSProvider = new JSData.DS();

    // global configuration

    DSProvider.registerAdapter('http', new DSHttpAdapter({
        // url: 'http://0.0.0.0:88',
        log: console.log
    }), {
        default: true
    });
    DSProvider.defaults.basePath = 'http://0.0.0.0:88/api';
    DSProvider.defaults.idAttribute = '_id';

    // models configuration
    DSProvider.defineResource('praticiens', {
        idAttribute: 'reference'
    });

    module.exports = {
        DSProvider: DSProvider
    };


})();