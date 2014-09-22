var express = require('express');
var pg = require('pg');
var conString = "postgres://baptiste@localhost/rapidocteur";

var app = express();

var client = new pg.Client(conString);

function processReqResSql(req, res, sql){
	client.connect(function(err) {
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
		            res.send(sr);
		    client.end();
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

app.get('/medecins', function(req, res) {
    var sql = 'select * '
+ 'from \"Praticien\", \"Possede\", \"Specialite\"'
+ 'where \"Praticien\".\"IdPraticien\" = \"Possede\".\"IdPraticien_Praticien\"'
+ 'and \"Possede\".\"idSpecialite_Specialite\" = \"Specialite\".\"idSpecialite\"';
    processReqResSql(req, res, sql);
  }
);

app.get('/specialites', function(req, res) {
    var sql = 'select * '
+ 'from \"Specialite\"';
    processReqResSql(req, res, sql);
  }
);

app.listen(8080);
