(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data').DSProvider;

    module.exports = function (app) {
        app.use('/praticien', router.get('/', render));
    };

    function render(req, res) {

       /* DSProvider.registerAdapter('http', new DSHttpAdapter({
            // url: 'http://0.0.0.0:88',
            log: console.log
        }), {
            default: true
        });
        DSProvider.defaults.basePath = 'http://0.0.0.0:88/api';
        DSProvider.defaults.idAttribute = '_id';*/

        // simplest model definition
       //  var Praticien = DSProvider.defineResource('praticiens');

        DSProvider.findAll('praticiens').then(function (praticiens) {
            console.log(praticiens);
            viewRenderer.render('praticien', {
                praticiens: praticiens
            }, res);
        });

    }

})();