
appControllers.controller('LandingController', ['$scope', 'idOfficeManager',
	function($scope, idOfficeManager) {
		$scope.officeSelected = function(idOffice) {
			console.log("idOffice", idOffice);
			idOfficeManager.setIdOffice(idOffice);
			switch (idOffice) {
				case 2 : window.location.href = '#/seysses/cabinet-medical-seysses';
				break;
				case 4 : window.location.href = '#/fontenilles/dieteticien-tachier';
				break;
				case 5 : window.location.href = '#/toulouse/osteopathe-bertucchi';
				break;
				default: window.location.href = '#/';
			}
		};
	}
]);

appControllers.controller('ConfirmationRendezVous', ['$scope', 'AppointmentManager', 'PostService',
	function($scope, AppointmentManager, PostService) {
		$scope.doctor = AppointmentManager.getSelectedDoctor();
		$scope.appointment = AppointmentManager.getSelectedAppointment();
		$scope.dayDate = AppointmentManager.getSelectedDay();
		$scope.office = AppointmentManager.getSelectedOffice();
		$scope.acte = AppointmentManager.getSelectedActe();

		$scope.errorEmpty = false;
		$scope.errorEmail = false;
		$scope.errorPhone = false;

		console.log("reçu doc : "+ $scope.doctor.idPraticien);
		console.log("recu appointment: "+ $scope.appointment);
		console.log("recu day : "+ $scope.dayDate);
		console.log("recu office : "+ $scope.office);
		console.log("recu acte : "+ $scope.acte);

		$scope.doBack = function() {
			window.history.back();
		};

		$scope.saveRV = function() {
			if ($scope.lastname && $scope.firstname && $scope.email && $scope.phone) {
				console.log("validateEmail", validateEmail($scope.email));
				console.log("validatePhoneNumber", validatePhoneNumber($scope.phone));
				if ($scope.errorEmpty) {
					$scope.errorEmpty = false;
				}
			} else {
        		console.log("EMPTY");
        		$scope.errorEmpty = true;
        	}

			
			if (! validateEmail($scope.email)) {
				$scope.errorEmail = true;
			} else {
				if ($scope.errorEmail) {
					$scope.errorEmail = false;
				}
			}

			if (! validatePhoneNumber($scope.phone)) {
				$scope.errorPhone = true;
			} else {
				if ($scope.errorPhone) {
					$scope.errorPhone = false;
				}
			}
			
			if ((!$scope.errorPhone) && (!$scope.errorPhone) && (!$scope.errorPhone)) {
				//nom, prenom, mail, tel, start, end, label, idDoc, idOff
	            var appointment = createRVForServer($scope.lastname, $scope.firstname, $scope.email, $scope.phone, $scope.appointment.start, $scope.appointment.end, $scope.acte, $scope.doctor.idPraticien, $scope.office);
	            console.log("saveRV appointment", appointment);
	            sendAppointment(PostService, appointment);
	            window.location.href = '#/';
        	}
        	
        }
	}
	]);

appControllers.controller('Chiffres', 
	function($scope) {
		$scope.ps = 8;
		$scope.rv = 21;
	}
);

appControllers.controller('CabinetCtrl', ['$scope', 'GetService', 'AppointmentManager', 'idOfficeManager',
	function($scope, GetService, AppointmentManager, idOfficeManager){
		var idCabinet = idOfficeManager.getIdOffice();
		$scope.quantityWeek=7;
		$scope.quantityApp=5;

		GetService.getDoctorsByOffice(idCabinet).success(function(data) {
			console.log('getDoctorsByOffice : ', data);
			$scope.doctors = data.output;

			// initialise select elements
			angular.forEach($scope.doctors, function(doctor){
				doctor["selectedAct"] = doctor.acts[0];

				console.log("doctor", doctor.idPraticien);

				GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree).success(function(data) {
					console.log('getAvailableAppointements : ', data);
					doctor["availabilities"] = data.output;
				}).error(function(data, status) {
					console.log(status);
					console.log(data);
				});

			});
		}).error(function(data, status) {

			console.log(status);
			console.log(data);
		});	

		$scope.updateAvailableAppointments = function(doctor){
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor["availabilities"] = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
		}

		$scope.submitRV = function(doctor, day, id){

			var labelActe = doctor.acts[0].labelActe;
			console.log("submitRV doc: ", doctor);
			console.log("submitRV day: ", day);
			console.log("submitRV app: ", id);
			console.log("submitRV acte: ", labelActe);
			console.log("submitRV idoff: ", idCabinet);

			AppointmentManager.setSelectedAppointment(id);
			AppointmentManager.setSelectedDay(day);
			AppointmentManager.setSelectedDoctor(doctor);
			AppointmentManager.setSelectedOffice(idCabinet);
			AppointmentManager.setSelectedActe(labelActe);

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

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) { 
	var re = /^\d{10,12}$/;
	return re.test(phoneNumber);
}
