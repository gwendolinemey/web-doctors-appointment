(function () {
    "use strict";

    var request = require('request');

    var express = require('express');
    var router = express.Router();

    var apiBaseContext = '/api'

    module.exports = function (app, config) {
        
        app.use(apiBaseContext, router.all('*', function (req, res) {

            var apiContext = req.originalUrl.substring(apiBaseContext.length);

            var newurl = config.proxyApi + apiContext;

            request(newurl).pipe(res);

        }));
    };

})();