
appControllers.controller('LandingController', ['$scope',
	function($scope) {
		//TODO : generate praticians in database		
	}
]);

appControllers.controller('ConfirmationRendezVous', ['$scope', 'AppointmentManager', 'PostService',
	function($scope, AppointmentManager, PostService) {
		$scope.doctor = AppointmentManager.getSelectedDoctor();
		$scope.appointment = AppointmentManager.getSelectedAppointment();
		$scope.day = AppointmentManager.getSelectedDay();
		$scope.office = AppointmentManager.getSelectedOffice();
		$scope.acte = AppointmentManager.getSelectedActe();


		console.log("reçu doc : "+ $scope.doctor.idPraticien);
		console.log("recu appointment: "+ $scope.appointment);
		console.log("recu day : "+ $scope.day);
		console.log("recu office : "+ $scope.office);
		console.log("recu acte : "+ $scope.acte);

		$scope.doBack = function() {
			window.history.back();
		};

		$scope.saveRV = function() {
			//nom, prenom, mail, tel, start, end, label, idDoc, idOff
            var appointment = createRVForServer($scope.lastname, $scope.firstname, $scope.email, $scope.phone, $scope.appointment.start, $scope.appointment.end, $scope.acte, $scope.doctor.idPraticien, $scope.office);
            console.log("saveRV appointment", appointment);
            sendAppointment(PostService, appointment);
            window.location.href = '#/';
        }
	}
	]);

appControllers.controller('Chiffres', 
	function($scope) {
		$scope.ps = 8;
		$scope.rv = 21;
	}
);

appControllers.controller('PresentationDocSeysses', ['$scope', 'GetService', 'AppointmentManager',
	function($scope, GetService, AppointmentManager){
		var idCabinet = 2; //cabinet de Seysses : id 2 //à modifier
		$scope.quantityWeek=7;
		$scope.quantityApp=5;

		GetService.getAppointementsByDoctorsInOffice(idCabinet).success(function(data) {
			$scope.doctors = data.output;

		}).error(function(data, status) {
			console.log('response getDoctorByOffice : ' + status);
			console.log('response getDoctorByOffice : ' + data);
		});	

		$scope.submitRV = function(doctor, day, id, acte){

			console.log("submitRV doc: ", doctor);
			console.log("submitRV day: ", day);
			console.log("submitRV app: ", id);
			console.log("submitRV acte: ", acte);
			console.log("submitRV idoff: ", idCabinet);

			AppointmentManager.setSelectedAppointment(id);
			AppointmentManager.setSelectedDay(day);
			AppointmentManager.setSelectedDoctor(doctor);
			AppointmentManager.setSelectedOffice(idCabinet);
			AppointmentManager.setSelectedActe(acte);

			window.location.href = '#/confirmation-rendezvous';
		}
	}	
]);

appControllers.controller('PresentationMelanieTachier', ['$scope', 'GetService', 'AppointmentManager',
	function($scope, GetService, AppointmentManager){
		var idCabinet = 4; //cabinet de mélanie : id 4 //à modifier
		$scope.quantityWeek=7;
		$scope.quantityApp=5;

		GetService.getAppointementsByDoctorsInOffice(idCabinet).success(function(data) {
			$scope.doctors = data.output;
			console.log($scope.doctors);

		}).error(function(data, status) {
			console.log('response getDoctorByOffice : ' + status);
			console.log('response getDoctorByOffice : ' + data);
		});	

		$scope.submitRV = function(doctor, day, id, acte){

			console.log("submitRV doc: ", doctor);
			console.log("submitRV day: ", day);
			console.log("submitRV app: ", id);
			console.log("submitRV acte: ", acte);
			console.log("submitRV idoff: ", idCabinet);

			AppointmentManager.setSelectedAppointment(id);
			AppointmentManager.setSelectedDay(day);
			AppointmentManager.setSelectedDoctor(doctor);
			AppointmentManager.setSelectedOffice(idCabinet);
			AppointmentManager.setSelectedActe(acte);

			window.location.href = '#/confirmation-rendezvous';
		}
	}	
]);

/*** functions ***/

function createRVForServer(nom, prenom, mail, tel, start, end, label, idDoc, idOff) {
    var appointmentToSave = new Object();
    var user = new Object();

    user["nom"] = nom;
    user["prenom"] = prenom;
    user["mail"] = mail;
    user["telephone"] = tel;

    appointmentToSave["user"] = user;
    appointmentToSave["start"] = start;
    appointmentToSave["end"] = end;
    appointmentToSave["actLabel"] = label;
    appointmentToSave["idDoctor"] = idDoc;
    appointmentToSave["idOffice"] = idOff;    

    return appointmentToSave;
}

function sendAppointment(PostService, appointment) {
    PostService.saveRV(appointment).success(function(data) {
        console.log(data);
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });
}
