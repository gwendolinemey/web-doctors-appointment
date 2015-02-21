(function () {
    "use strict";

    var viewRenderer = require('../../view-renderer');

    var express = require('express');
    var router = express.Router();

    module.exports = function (app) {
        app.use('/', router.get('/', render));
    };

    function render(req, res) {
        viewRenderer.render('home', {}, res);
    }

})();