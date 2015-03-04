(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data.conf').DSProvider;

    module.exports = function (app) {
        app.use('/sitemap', router.get('/departement_:postCode.xml', render));
    };

    function render(req, res) {

        var postCode = req.params.postCode;

        console.log(postCode);

        DSProvider.findAll('cabinets', {
            code_postal: postCode
        }, {
            cacheResponse: false
        }).then(function (cabinets) {

            console.log(cabinets);

            viewRenderer.render('sitemap/sitemap-departement.xml', {
                cabinets: cabinets
            }, res);
        });

    }

})();