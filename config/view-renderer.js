(function () {
    "use strict";

    var express = require('express');
    var router = express.Router();
    var swig = require('swig');

    module.exports = {
        render: render
    };

    function render(template, parameters, res) {

        swig.renderFile(__dirname + '/../app/modules/' + template, parameters, function (err, output) {
            if (err) {
                throw err;
            } else {
                res.write(output);
                res.end();
            }
        });
    }

})();