(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data.conf').DSProvider;

    module.exports = function (app) {
        app.use('/praticien', router.get('/:reference', render));
    };

    function render(req, res) {

        var reference = req.params.reference;
        
        DSProvider.find('praticiens', reference, {
            cacheResponse: false
        }).then(function (praticien) {

            viewRenderer.render('praticien', {
                praticien: praticien
            }, res);
        });

    }

})();