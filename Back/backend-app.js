
////////////////////// SET UP //////////////////////////////////////

var express = require('express');
var pg = require('pg');
var connectionString = "postgres://baptiste@localhost/rapidocteur";

var app = express();


////////////////////// MIDDLEWARES //////////////////////////////////////


// Add headers to avoid cross origin limitation with the front end (TODO remove on prod server)
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});


////////////////////// JS FUNCTIONS //////////////////////////////////////


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

            res.setHeader('Content-Type', 'application/json');

            res.send(sr);
            done();
        });
});
}

function processAppointmentsReqResSql(req, res, sql){
	pg.connect(connectionString, function(err, client, done) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query(sql, function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			var sr = new ServiceResult ('success');

			//add 'events' key
			var events = new Array();
			sr.output = new Array();
            for (i = 0; i < result.rows.length; i++) {
                events.push(formatAppointment(result.rows[i]));
            }
            sr.output = events;
            console.log(new Date() + '  ' + sql);

            res.setHeader('Content-Type', 'application/json');

            res.send(sr);
            done();
        });
});
}

function formatAppointment(appointmentFromDatabase){
	var formattedAppointment = new Object();
	formattedAppointment["id"] = appointmentFromDatabase.idRdv;
	formattedAppointment["title"] = appointmentFromDatabase.title;
	formattedAppointment["allDay"] = appointmentFromDatabase.allDay;
	formattedAppointment["start"] = appointmentFromDatabase.startevent;
	formattedAppointment["end"] = appointmentFromDatabase.endevent;

	return formattedAppointment;
}

function ServiceResult (status){
	this.ts = new Date();
	this.status = status;
	this.output = new Array();
}



////////////////////// ROUTES //////////////////////////////////////



app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Accueil');
});

app.get('/doctors', function(req, res) {
	var sql = 'select * '
	+ 'from \"Praticien\", \"Possede\", \"Specialite\" '
	+ 'where \"Praticien\".\"idPraticien\" = \"Possede\".\"idPraticien_Praticien\" '
	+ 'and \"Possede\".\"idSpecialite_Specialite\" = \"Specialite\".\"idSpecialite\"';
	processReqResSql(req, res, sql);
}
);

app.get('/doctors/specialities', function(req, res) {
	console.log('/doctors/specialities req.query : ' + JSON.stringify(req.query));
	var speciality = req.query;

	var sql = 'select * '
	+ 'from \"Praticien\", \"Possede\", \"Specialite\" '
	+ 'where \"Praticien\".\"idPraticien\" = \"Possede\".\"idPraticien_Praticien\" '
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

app.get('/appointments/booked', function(req, res) {
	var sql = 'select \"Rdv\".*, \"User\".nom, \"User\".prenom '
	+ 'from \"Rdv\", \"User\", \"Praticien\" '
	+ 'where \"Rdv\".\"idUser_User\" = \"User\".\"idUser\" '
	+ 'and \"Rdv\".\"idPraticien_Praticien\" = \"Praticien\".\"idPraticien\"';
	processAppointmentsReqResSql(req, res, sql);
}
);

app.listen(8080);
