var express = require('express');
var pg = require('pg');
var connectionString = "postgres://baptiste@localhost/rapidocteur";

var app = express();

function processReqResSql(req, res, sql){
	pg.connect(connectionString, function(err, client, done) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query(sql, function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			var sr = new ServiceResult ('success');
			sr.output = result.rows;
            //for (i = 0; i < result.rows.length; i++) {
            //    sr.output[i] = JSON.parse(result.rows[i].data);
            //}
            console.log(new Date() + '  ' + sql);

            // TODO encapsulate this as a middleware
            // http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', false);

            res.setHeader('Content-Type', 'application/json');

            res.send(sr);
            done();
        });
});
}

function ServiceResult (status){
	this.ts = new Date();
	this.status = status;
	this.output = new Array();
}

app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Accueil');
});

app.get('/doctors', function(req, res) {
	var sql = 'select * '
	+ 'from \"Praticien\", \"Possede\", \"Specialite\" '
	+ 'where \"Praticien\".\"IdPraticien\" = \"Possede\".\"IdPraticien_Praticien\" '
	+ 'and \"Possede\".\"idSpecialite_Specialite\" = \"Specialite\".\"idSpecialite\"';
	processReqResSql(req, res, sql);
}
);

app.get('/doctors/specialities', function(req, res) {
	console.log('/doctors/specialities req.query : ' + JSON.stringify(req.query));
	var speciality = req.query;

	var sql = 'select * '
	+ 'from \"Praticien\", \"Possede\", \"Specialite\" '
	+ 'where \"Praticien\".\"IdPraticien\" = \"Possede\".\"IdPraticien_Praticien\" '
	+ 'and \"Possede\".\"idSpecialite_Specialite\" = \"Specialite\".\"idSpecialite\" '
	+ 'and \"Specialite\".\"idSpecialite\" = ' + speciality.idSpecialite;

	processReqResSql(req, res, sql);
}
);

app.get('/specialities', function(req, res) {
	var sql = 'select * '
	+ 'from \"Specialite\"';
	processReqResSql(req, res, sql);
}
);

app.listen(8080);
