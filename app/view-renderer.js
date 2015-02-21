(function () {
    "use strict";

    var express = require('express');
    var router = express.Router();
    var swig = require('swig');

    module.exports = {
        render: render
    };

    function render(name, parameters, res) {

        swig.renderFile(__dirname + '/modules/' + name + '/' + name + '.html', parameters, function (err, output) {
            if (err) {
                throw err;
            } else {
                res.write(output);
                res.end();
            }
        });
    }

})();