(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data.conf').DSProvider;

    module.exports = function (app) {
        app.use('/sitemap', router.get('/specialty_:id.xml', render));
    };

    function render(req, res) {

        var id = req.params.id;

        DSProvider.find('specialites', id, {
            cacheResponse: false
        }).then(function (specialite) {

            viewRenderer.render('sitemap/sitemap-specialty.xml', {
                praticiens: specialite.Praticiens
            }, res);
        });

    }

})();