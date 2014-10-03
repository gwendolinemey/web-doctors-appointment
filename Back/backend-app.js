
////////////////////// SET UP //////////////////////////////////////

var express = require('express');
// var Promise = require("bluebird");
// Promise.promisifyAll(require("pg"));

var app = express();

var middlewares = require("./middlewares");
app.use(middlewares.addHeaders);

require("./routes")(app)

app.listen(8080);
