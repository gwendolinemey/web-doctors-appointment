(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    var DSProvider = require('../../../config/js-data.conf').DSProvider;

    module.exports = function (app) {
        app.use('/cabinet', router.get('/:reference', render));
    };

    function render(req, res) {

        var reference = req.params.reference;
        
        console.log('Load cabinet "%s".', reference);
        
        DSProvider.find('cabinets', reference, {
            cacheResponse: false
        }).then(function (cabinet) {

            viewRenderer.render('cabinet/cabinet.html', {
                cabinet: cabinet
            }, res);
        });

    }

})();