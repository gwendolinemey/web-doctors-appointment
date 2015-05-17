(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    module.exports = function (app, config) {
        app.use('/partenaires', router.get('/', render));
    };

    function render(req, res) {
        viewRenderer.render('partenaires/partenaires.html', {}, res);
    }

})();