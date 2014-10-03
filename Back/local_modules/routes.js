var functions = require("./functions");

module.exports = function(app){

app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Accueil');
});

app.get('/doctors', function(req, res) {
	var sql = 'select * '
	+ 'from \"Praticien\", \"Possede\", \"Specialite\" '
	+ 'where \"Praticien\".\"idPraticien\" = \"Possede\".\"idPraticien_Praticien\" '
	+ 'and \"Possede\".\"idSpecialite_Specialite\" = \"Specialite\".\"idSpecialite\"';
	functions.processSelectQuery(req, res, sql);
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

	functions.processSelectQuery(req, res, sql);
}
);

app.get('/specialities', function(req, res) {
	var sql = 'select * '
	+ 'from \"Specialite\"';
	functions.processSelectQuery(req, res, sql);
}
);

app.get('/appointments/all', function(req, res) {
	var mockedDoctorId = 1;

	// get all the booked appointments with info about the user who booked (name, surname)
	// var sql = 'select \"Rdv\".*, \"User\".nom, \"User\".prenom '
	// + 'from \"Rdv\", \"User\", \"Praticien\" '
	// + 'where \"Rdv\".\"idUser_User\" = \"User\".\"idUser\" '
	// + 'and \"Rdv\".\"idPraticien_Praticien\" = \"Praticien\".\"idPraticien\"';

	var sql = 'select * from \"Rdv\" where \"idPraticien_Praticien\" = ' + mockedDoctorId + ' order by "startEvent"';

	functions.processAppointmentsSelectQuery(req, res, sql);
}
);

app.get('/appointments/available', function(req, res) {
	console.log('/doctors/specialities req.query : ' + JSON.stringify(req.query));
	var idDoctor = req.query;

	var sql = 'select * from \"Rdv\" where \"idPraticien_Praticien\" = ' + idDoctor + ' and "idUser_User" is null order by "startEvent"';

	functions.processAppointmentsSelectQuery(req, res, sql);
}
);

app.post('/settings/save', function(req, res) {
	console.log('/settings/save req.query.settings : '); 
	console.log(req.query.settings);

	var settings = JSON.parse(req.query.settings);

	if (settings) {
		res.status(201).end();
	} else {
		res.status(500).end();
	}

	var mockedDoctorId = 1;

	// TODO change method processModificationQuery to execute a batch of query and not one by one
	var deleteAvailabilitiesRowsSql = 'delete from \"Creneau\" where \"idPraticien_Praticien\" = ' + mockedDoctorId;
	functions.processModificationQuery(deleteAvailabilitiesRowsSql);

	var deleteAppointmentsRowsSql = 'delete from \"Rdv\" where \"idPraticien_Praticien\" = ' + mockedDoctorId;
	functions.processModificationQuery(deleteAppointmentsRowsSql);

	var saveSettingsSql = 'update "Praticien" '
	+ 'set "dureeRdvMinutes" = ' + settings.appointmentLength + ', "semainesProposees" = ' + settings.openWeeks + ' '
	+ 'where "idPraticien" = ' + mockedDoctorId;
	functions.processModificationQuery(saveSettingsSql);

	for (var i = 0; i < settings.days.length; i++) {
		var currentDay = settings.days[i];
		for (var j = 0; j < currentDay.availabilities.length; j++) {
			var availability = currentDay.availabilities[j];
			
			var insertAvailabilitySql = 'insert into \"Creneau\" '
			+ '(\"moment\", \"show\", \"debutHeures\", \"debutMinutes\", \"finHeures\", \"finMinutes\", \"idJour_Jour\", \"idPraticien_Praticien\") '
			+ 'values (\'' + availability.moment + '\', ' 
				+ availability.show + ', ' 
				+ availability.startHours + ', ' 
				+ availability.startMinutes + ', ' 
				+ availability.endHours + ', ' 
				+ availability.endMinutes + ', ' 
				+ currentDay.dayId + ', ' 
				+ mockedDoctorId + ')';

			functions.processModificationQuery(insertAvailabilitySql);

			if(availability.show) {
				functions.addAppointments(currentDay, availability, settings, mockedDoctorId);
			}
		}
	}
}
);

app.get('/settings', function(req, res) {
	console.log('/settings req.query : ' + JSON.stringify(req.query));
	var doctorId = req.query.idDoctor;

	var doctorSettingsSql = 'select \"dureeRdvMinutes\", \"semainesProposees\" '
	+ 'from \"Praticien\" where \"idPraticien\" = ' + doctorId;

	console.log(doctorSettingsSql);
	functions.processSelectQuery(req, res, doctorSettingsSql);
}
);

app.get('/settings/availabilities', function(req, res) {
	console.log('/settings req.query : ' + JSON.stringify(req.query));
	var doctorId = req.query.idDoctor;

	var doctorSettingsCreneauSql = 'select * from \"Creneau\" where \"idPraticien_Praticien\" = ' + doctorId;

	functions.processAvailabilitiesSelectQuery(req, res, doctorSettingsCreneauSql);
}
);

}