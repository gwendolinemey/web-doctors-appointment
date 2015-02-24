(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data.conf').DSProvider;

    module.exports = function (app) {
        app.use('/sitemap-index.xml', router.get('/', render));
    };

    function render(req, res) {

        var reference = req.params.reference;
        
        DSProvider.findAll('specialites', {
            cacheResponse: false
        }).then(function (specialites) {

            viewRenderer.render('sitemap/sitemap-index.xml', {
                specialites: specialites
            }, res);
        });

    }

})();