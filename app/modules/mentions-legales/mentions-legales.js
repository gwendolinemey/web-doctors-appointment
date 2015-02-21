'use strict';

var swig = require('swig');
var express = require('express');
var router = express.Router();

function load(app) {
    app.use('/mentions-legales', router.get('/', renderTemplate));
};

function renderTemplate(req, res) {
    swig.renderFile('./app/modules/mentions-legales/mentions-legales.html', {}, function (err, output) {
        if (err) {
            throw err;
        } else {
            res.write(output);
            res.end();
        }
    });
}

module.exports = load;