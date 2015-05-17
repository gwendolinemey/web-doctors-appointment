(function () {
    "use strict";

    var viewRenderer = require('../../../config/view-renderer');

    var express = require('express');
    var router = express.Router();

    module.exports = function (app, config) {
        app.use('/patients', router.get('/', render));
    };

    function render(req, res) {
        viewRenderer.render('patients/patients.html', {}, res);
    }

})();