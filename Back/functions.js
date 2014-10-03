var pg = require('pg');
var connectionString = "postgres://baptiste@localhost/rapidocteur";

module.exports = {


processSelectQuery: function(req, res, sql){
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
},

processAppointmentsSelectQuery: function(req, res, sql){
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
},

processAvailabilitiesSelectQuery: function(req, res, sql){
	pg.connect(connectionString, function(err, client, done) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query(sql, function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			var sr = new ServiceResult ('success');

			var availabilities = new Array();
			sr.output = new Array();

			for (i = 0; i < result.rows.length; i++) {
				availabilities.push(formatAvailabilities(result.rows[i]));
			}
			sr.output = availabilities;
			console.log(new Date() + '  ' + sql);

			res.setHeader('Content-Type', 'application/json');

			res.send(sr);
			done();
		});
	});
},

processModificationQuery: function(sql){
	pg.connect(connectionString, function(err, client, done) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query(sql, function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			console.log(new Date() + '  ' + sql);

			done();
		});
	});
},

addAppointments: function(currentDay, availability, settings, mockedDoctorId) {
	console.log('DAY ' + currentDay.dayId);

	var appointmentBeginning = new Date();

	if(appointmentBeginning.getDay() != currentDay.dayId) {
		if(appointmentBeginning.getDay() < currentDay.dayId) {
			appointmentBeginning.setDate(appointmentBeginning.getDate() + (currentDay.dayId - appointmentBeginning.getDay()));
		} else {
			var gap = 7 - (appointmentBeginning.getDay() - currentDay.dayId);
			appointmentBeginning.setDate(appointmentBeginning.getDate() + gap);
		}
	}

	var openWeeks = parseInt(settings.openWeeks);
	console.log(openWeeks);
	for (var i = 0; i < openWeeks; i++) {
		appointmentBeginning.setHours(availability.startHours, -appointmentBeginning.getTimezoneOffset(), 0, 0);
		appointmentBeginning.setMinutes(availability.startMinutes);

		var appointmentEnding = new Date(appointmentBeginning.getTime());
		appointmentEnding.setMinutes(appointmentEnding.getMinutes() + settings.appointmentLength);

		var finalAppointment = new Date(appointmentBeginning.getTime());
		finalAppointment.setHours(availability.endHours, -finalAppointment.getTimezoneOffset(), 0, 0);
		finalAppointment.setMinutes(availability.endMinutes);

		var appointmentDuration = parseInt(settings.appointmentLength);
		while(appointmentEnding.getTime() <= finalAppointment.getTime()) {
			var insertAppointmentSql = 'insert into \"Rdv\" (\"title\", \"allDay\", \"startEvent\", '
				+ '\"endEvent\", \"editable\", \"idPraticien_Praticien\") '
				+ 'values(\'\',' + false + ' , \'' + appointmentBeginning.toISOString() + '\','
				+ ' \'' + appointmentEnding.toISOString() + '\',' + true + ',' + mockedDoctorId + ')';

			this.processModificationQuery(insertAppointmentSql);

			appointmentBeginning = new Date(appointmentEnding.getTime());
			appointmentEnding.setMinutes(appointmentEnding.getMinutes() + appointmentDuration);
		}

		appointmentBeginning.setDate(appointmentBeginning.getDate() + 7);
	}
}

}

function formatAppointment(appointmentFromDatabase){
	var formattedAppointment = new Object();
	formattedAppointment["id"] = appointmentFromDatabase.idRdv;
	formattedAppointment["title"] = appointmentFromDatabase.title;
	formattedAppointment["allDay"] = appointmentFromDatabase.allDay;
	formattedAppointment["start"] = appointmentFromDatabase.startEvent;
	formattedAppointment["end"] = appointmentFromDatabase.endEvent;

	return formattedAppointment;
}

function formatAvailabilities(availabilityFromDatabase){
	var jsonString = JSON.stringify(availabilityFromDatabase);
	jsonString = jsonString.replace("idJour_Jour", "idJour");
	jsonString = jsonString.replace("idPraticien_Praticien", "idPraticien");
	var jsonObject = JSON.parse(jsonString);
	// needed to adjust values between database (monday=1) and front-end (monday=0)
	jsonObject["idJour"] = jsonObject["idJour"] - 1;

	return jsonObject;
}


function ServiceResult(status){
	this.ts = new Date();
	this.status = status;
	this.output = new Array();
}