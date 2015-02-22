(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data').DSProvider;

    module.exports = function (app) {
        app.use('/praticien', router.get('/:reference', render));
    };

    function render(req, res) {

        var reference = req.params.reference;
        
        console.log(req.params.reference);

//        reference = 'gilles-arnauld-4020';
        
        DSProvider.find('praticiens', reference, {
            cacheResponse: false
        }).then(function (praticien) {

            // console.log(praticien);

            viewRenderer.render('praticien', {
                praticien: praticien
            }, res);
        });

    }

})();