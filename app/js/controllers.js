appControllers.controller('LandingController', 
	function($scope) {
		$scope.ps = 8;
		$scope.rv = 21;
	}
);

appControllers.controller('CabinetCtrl', ['$scope', '$location', 'GetService', 'AppointmentManager', 
	function($scope, $location, GetService, AppointmentManager){

		var idCabinet;
		switch ($location.path()) {
			case '/seysses/cabinet-medical-seysses' : idCabinet = 2; mixpanel.track("View Seysses");
			break;
			case '/fontenilles/dieteticien-tachier' : idCabinet = 4;
			break;
			case '/toulouse/osteopathe-bertucchi' : idCabinet = 5; mixpanel.track("View Bertucchi");
			break;
			default : window.location.href = '#/';
		}
		
		$scope.quantityWeek=7;
		$scope.quantityApp=5;

		console.log('Current route name: ' + $location.path());

		GetService.getDoctorsByOffice(idCabinet).success(function(data) {
			console.log('getDoctorsByOffice : ', data);
			$scope.doctors = data.output;

			// initialise select elements
			angular.forEach($scope.doctors, function(doctor){
				doctor.selectedAct = doctor.acts[0];
				doctor.currentWeek = 0;
				doctor.previousDisabled = true;
				doctor.nextDisabled = false;

				console.log("doctor", doctor.idPraticien);

				GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
					console.log('getAvailableAppointements : ', data);
					doctor.availabilities = data.output;
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
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
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
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
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
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
		};

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

			mixpanel.track("Selection RV");
			window.location.href = '#/confirmation-rendezvous';
		};
	}	
]);

appControllers.controller('ConfirmationRendezVous', ['$scope', '$modal', 'AppointmentManager', 'PostService',
	function($scope, $modal, AppointmentManager, PostService) {
	$scope.appointment = {
		doctor: AppointmentManager.getSelectedDoctor(),
		time: AppointmentManager.getSelectedAppointment(),
		dayDate: AppointmentManager.getSelectedDay(),
		office: AppointmentManager.getSelectedOffice(),
		acte: AppointmentManager.getSelectedActe()
	};

	$scope.user = {
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	};

	$scope.errorEmpty = false;
	$scope.errorEmail = false;
	$scope.errorPhone = false;

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

            PostService.saveAppointment(appointment).success(function(data) {
		        console.log(data);
		        if (data.status == "success") {
		        	mixpanel.track("Enregistre RV");
		        	$scope.open();
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

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) { 
	var re = /^\d{10,12}$/;
	return re.test(phoneNumber);
}
