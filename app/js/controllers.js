appControllers.controller('LandingController', 
	function($scope) {
		$scope.ps = 8;
		$scope.rv = 21;

		$scope.guerriSelected = function(){
			window.location.href = '#/fontenilles/dieteticien-guerri';
			console.log("guerriSelected");
		};
	}
);

appControllers.controller('CabinetCtrl', ['$scope', '$location', 'GetService', 'AppointmentManager', 
	function($scope, $location, GetService, AppointmentManager){
		var cabinet ={
			idCabinet:'',
			adresse:''
		};

		switch ($location.path()) {
			case '/seysses/medecins-generalistes' : cabinet.idCabinet = 3; 
				cabinet.adresse = '60 route ox - 31600 Seysses';
				mixpanel.track("View Seysses");
				break;
			case '/fontenilles/dieteticien-guerri' : cabinet.idCabinet = 1; 
				cabinet.adresse = '1 lot le village - 31470 Fontenilles';
				mixpanel.track("View Guerri");
				break;
			case '/saint-alban/osteopathe-fragnier' : cabinet.idCabinet = 5; 
				cabinet.adresse = '41 av, Leon Jouhaux';
				mixpanel.track("View Fragnier");
				break;
			case '/labege/dieteticienne-bec' : cabinet.idCabinet = 11; 
				cabinet.adresse = '6, rue de l\'Autan - 31670 Labège';
				mixpanel.track("View Bec");
				break;
			case '/toulouse/osteopathe-augusseau' : cabinet.idCabinet = 12; 
				cabinet.adresse = '3 rue Carlos Gardel - 31300 Toulouse';
				mixpanel.track("View Augusseau");
				break;				
			default : window.location.href = '#/';
		}
		
		$scope.quantityWeek=7;
		var showLimitAppointments = 5;

		console.log('Current route name: ' + $location.path());

		function getAvailabilities(cabinet, doctor) {
			GetService.getAvailableAppointements(cabinet.idCabinet, doctor.idPraticien, doctor.selectedAct, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output.availabilities;
				doctor.showLimit = showLimitAppointments;
				doctor.showMoreVisible = false;
				for (var i = 0; i < doctor.availabilities.length; i++) {
					if (doctor.availabilities[i].appointments.length > doctor.showLimit) {
						doctor.showMoreVisible = true;
					}
				};
				doctor.showLessVisible = false;
				doctor.absences = data.output.absences;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
		}

		GetService.getDoctorsByOffice(cabinet.idCabinet).success(function(data) {
			console.log('getDoctorsByOffice : ', data);
			$scope.doctors = data.output;

			// initialise select elements
			angular.forEach($scope.doctors, function(doctor){
				doctor.selectedAct = doctor.acts[0];
				doctor.currentWeek = 0;
				doctor.previousDisabled = true;
				doctor.nextDisabled = false;

				console.log("doctor", doctor.idPraticien);

				getAvailabilities(cabinet, doctor);
			});
		}).error(function(data, status) {

			console.log(status);
			console.log(data);
		});	

		$scope.updateAvailableAppointments = function(doctor){
			getAvailabilities(cabinet, doctor);
		};

		$scope.seeNext = function(doctor){
			console.log("NEXT", doctor.currentWeek);
			if (doctor.currentWeek === 0) {
				doctor.previousDisabled = false;
			}
			doctor.currentWeek++;
			if (doctor.currentWeek == (doctor.semaines_ouvertes - 1)) {
				doctor.nextDisabled = true;
			}
			getAvailabilities(cabinet, doctor);
		};

		$scope.seePrevious = function(doctor){
			console.log("PREVIOUS", doctor.currentWeek);
			doctor.currentWeek--;
			if (doctor.currentWeek === 0) {
				doctor.previousDisabled = true;
			} 
			if (doctor.nextDisabled) {
				doctor.nextDisabled = false;
			}
			getAvailabilities(cabinet, doctor);
		};

		$scope.showMore = function(doctor){
			doctor.showLimit = 200;
			doctor.showMoreVisible = false;
			doctor.showLessVisible = true;
		};

		$scope.showLess = function(doctor){
			doctor.showLimit = showLimitAppointments;
			doctor.showMoreVisible = true;
			doctor.showLessVisible = false;
		};

		$scope.submitRV = function(doctor, day, appointmentTime){

			var appointment = {
				doctor: doctor,
				time: appointmentTime,
				dayDate: day,
				office: cabinet,
				acte: doctor.selectedAct.labelActe
			};

			console.log("submitRV : ", appointment);

			GetService.getIsAppointmentAvailable(appointment).success(function(data) {
				console.log('getIsAppointmentAvailable : ', data);
				if (data.output.isAvailable) {
					mixpanel.track("Selection RV available");
					AppointmentManager.setAppointment(appointment);
					window.location.href = '#/confirmation-rendezvous';
				} 
				else {
					//TODO implement something more sexy (modal)
					mixpanel.track("Selection RV not available");
					alert("Le rendez-vous n'est plus disponible");
					mixpanel.track("Selection RV not available");
				}
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});

			mixpanel.track("Selection RV");
		};
	}	
]);

appControllers.controller('ConfirmationRendezVous', ['$scope', '$modal', 'AppointmentManager', 'PostService', 'GetService',
	function($scope, $modal, AppointmentManager, PostService, GetService) {
	$scope.appointment = AppointmentManager.getAppointment();

	$scope.user = {
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	};

	$scope.errorEmpty = false;
	$scope.errorEmail = false;
	$scope.errorPhone = false;

	$scope.practicianLabel = "le Docteur " + $scope.appointment.doctor.nom;
	if (isNotDoctor($scope.appointment.doctor.specialities)) {
		$scope.practicianLabel = $scope.appointment.doctor.prenom + " " + $scope.appointment.doctor.nom;
	}


	console.log("recu appointment: ", $scope.appointment);

	$scope.open = function (size) {
	    var modalInstance = $modal.open({
	      templateUrl: 'confirmationModal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      resolve: {
	        appointment: function () {
	          return $scope.appointment;
	        }
	      }
	    });

	    modalInstance.result.then(function () {
	    	//window.location.href = '#/seysses/medecins-generalistes';
	    	window.location.href = '#/';
	    });
	};

	$scope.doBack = function() {
		window.history.back();
	};

	$scope.hideErrors = function(index) {
		switch (index) {
			case 1 : $scope.errorEmpty = false;
			break;
			case 2 : $scope.errorEmail = false;
			break;
			case 3 : $scope.errorPhone = false;
			break;
		}
	};

	$scope.saveAppointment = function() {
		if ($scope.user.lastName && $scope.user.firstName && $scope.user.email && $scope.user.phone) {
			if ($scope.errorEmpty) {
				$scope.errorEmpty = false;
			}
		} else {
    		$scope.errorEmpty = true;
    	}

		if (!$scope.errorEmpty) {
			if (! validateEmail($scope.user.email)) {
				$scope.errorEmail = true;
			} else {
				if ($scope.errorEmail) {
					$scope.errorEmail = false;
				}
			}

			if (! validatePhoneNumber($scope.user.phone)) {
				$scope.errorPhone = true;
			} else {
				if ($scope.errorPhone) {
					$scope.errorPhone = false;
				}
			}
		}

		if ((!$scope.errorEmpty) && (!$scope.errorEmail) && (!$scope.errorPhone)) {
            console.log("saveRV appointment", $scope.appointment);

            var appointment = $scope.appointment;
            appointment.user = $scope.user;

            GetService.getIsAppointmentAvailable(appointment).success(function(data) {
				console.log('getIsAppointmentAvailable : ', data);
				if (data.output.isAvailable) {
					mixpanel.track("Confirm RV available");

					PostService.saveAppointment(appointment).success(function(data) {
				        console.log(data);
				        if (data.status == "success") {
				        	mixpanel.track("Enregistre RV");
				        	$scope.open();
				        } else {
				        	mixpanel.track("Erreur Enregistre RV");
				        }
				    }).error(function(data, status) {
				        console.log(status);
				        console.log(data);
				    });
				} 
				else {
					//TODO implement something more sexy (modal)
					mixpanel.track("Confirm RV not available");
					alert("Le rendez-vous n'est plus disponible");
				}
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
    	}
    };
}
]);

appControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, appointment) {
	console.log('appointment', appointment);
	$scope.appointment = appointment;

	$scope.practicianLabel = "le Docteur " + $scope.appointment.doctor.nom;
	if (isNotDoctor($scope.appointment.doctor.specialities)) {
		$scope.practicianLabel = $scope.appointment.doctor.prenom + " " + $scope.appointment.doctor.nom;
	}

	$scope.ok = function () {
		$modalInstance.close();
	};
});

function sendAppointment(PostService, appointment) {
    PostService.saveRV(appointment).success(function(data) {
        console.log(data);
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });
}

function isNotDoctor(specialities) {
    for (var i = 0; i < specialities.length; i++) {
        if (specialities[i].idSpecialite === 2 ||  specialities[i].idSpecialite === 7) {
            return true;
        }
    }
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) { 
	var re = /^\d{10,12}$/;
	return re.test(phoneNumber);
}
