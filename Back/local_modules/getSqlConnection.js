var pg = require("pg");
// uncomment if necessary
// var Promise = require("bluebird");
// Promise.promisifyAll(pg);

function getSqlConnection(connectionString) {
    var close;
    return pg.connectAsync(connectionString).spread(function(client, done) {
        close = done;
        return client;
    }).disposer(function() {
        try {
            if (close) close();
        } catch(e) {};
    });
}

module.exports = getSqlConnection;