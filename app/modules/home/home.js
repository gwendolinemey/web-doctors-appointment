(function () {
    "use strict";

    var express = require('express');
    var router = express.Router();
    var swig = require('swig');

    module.exports = function (app) {
        app.use('/', router);
    };

    router.get('/', function (req, res, next) {

        swig.renderFile('./app/modules/home/home.html', {}, function (err, output) {
            if (err) {
                throw err;
            } else {
                res.write(output);
                res.end();
            }
        });

    });

})();