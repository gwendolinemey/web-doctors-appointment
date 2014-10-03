
////////////////////// SET UP //////////////////////////////////////

var express = require('express');
// var Promise = require("bluebird");
// Promise.promisifyAll(require("pg"));

var app = express();

var middlewares = require("./local_modules/middlewares");
app.use(middlewares.addHeaders);

require("./local_modules/routes")(app)

app.listen(8080);
