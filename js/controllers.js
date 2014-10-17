
appControllers.controller('LandingController', ['$scope', 'GetService', 'SpecialityManager',
	function($scope, GetService, SpecialityManager) {

		/*$scope.specialities = [];

		GetService.getAllSpecialities().success(function(data) {
			$scope.specialities = data; 
			$scope.selectedSpecialities = data.output[0];
			SpecialityManager.setSelectedSpeciality($scope.selectedSpecialities);           
			console.log(data);
			// console.log(SpecialityManager.getSelectedSpeciality()); 
		}).error(function(data, status) {
			console.log(status);
			console.log(data);
		});

		$scope.checkPS = function(){
			SpecialityManager.setSelectedSpeciality($scope.selectedSpecialities);
			// console.log(SpecialityManager.getSelectedSpeciality()); 
			window.location.href = '#/recherche-ps';
		}*/
	}
	]);

/*appControllers.controller('RecherchePS', ['$scope', 'GetService', 'SpecialityManager', 'AppointmentManager',
	function($scope, GetService, SpecialityManager, AppointmentManager) {

		$scope.doctors = [];

		speciality = SpecialityManager.getSelectedSpeciality();
		console.log('RecherchePS ' + JSON.stringify(speciality));

		GetService.getDoctorsBySpecialities(speciality).success(function(data) {
			// TODO remove this
			$scope.doctors = data.output;
			console.log(data.output);
			// For each doctors, retrieve its available appointments
			angular.forEach(data.output, function(doctor){
				GetService.get.success(function(data) {
					// TODO update doctor object (add list of available appointments)
					// and populate scope.doctors with it
				}).error(function(data, status) {
					console.log('response appointmentsByDoc : ' + status);
					console.log('response appointmentsByDoc : ' + data);
				});
			});

		}).error(function(data, status) {
			console.log('response docBySpe : ' + status);
			console.log('response docBySpe : ' + data);
		});

		$scope.quantity = 2;

		$scope.submitRDV = function(doctor){
			// console.log('submitRDV ' + JSON.stringify(doctor));
			// console.log('$scope.selectedAppointment ' + $scope.selectedAppointment);

			AppointmentManager.setSelectedAppointment($scope.selectedAppointment);
			AppointmentManager.setSelectedDoctor(doctor);

			window.location.href = '#/confirmation-rendezvous';
		}
	}
	]);*/

appControllers.controller('ConfirmationRendezVous', ['$scope', 'AppointmentManager',
	function($scope, AppointmentManager) {
		$scope.doctor = AppointmentManager.getSelectedDoctor();
		$scope.appointment = AppointmentManager.getSelectedAppointment();
		$scope.day = AppointmentManager.getSelectedDay();

		console.log($scope.day);

		$scope.doBack = function() {
			window.history.back();
		};
	}
	]);

appControllers.controller('Chiffres', 
	function($scope) {
		$scope.ps = 7;
		$scope.rv = 151;
	}
	);

appControllers.controller('PresentationDocSeysses', ['$scope', 'GetService', 'AppointmentManager',
	function($scope, GetService, AppointmentManager){
		var idCabinet = 2; //cabinet de Seysses : id 2 //à modifier
		//$scope.today = new Date();

		GetService.getAppointementsByDoctorsInOffice(idCabinet).success(function(data) {
			$scope.doctors = data.output;

		}).error(function(data, status) {
			console.log('response getDoctorByOffice : ' + status);
			console.log('response getDoctorByOffice : ' + data);
		});	

		$scope.submitRV = function(doctor, day, id){			

			AppointmentManager.setSelectedAppointment(id);
			AppointmentManager.setSelectedDay(day);
			AppointmentManager.setSelectedDoctor(doctor);			

			window.location.href = '#/confirmation-rendezvous';
		}
	}	
]);

appControllers.controller('PresentationMelanieTachier', ['$scope', 'GetService', 'AppointmentManager',
	function($scope, GetService, AppointmentManager){
		var idCabinet = 4; //cabinet de mélanie : id 4 //à modifier

		GetService.getAppointementsByDoctorsInOffice(idCabinet).success(function(data) {
			$scope.doctors = data.output;

		}).error(function(data, status) {
			console.log('response getDoctorByOffice : ' + status);
			console.log('response getDoctorByOffice : ' + data);
		});	

		$scope.submitRV = function(doctor, day, id){			

			AppointmentManager.setSelectedAppointment(id);
			AppointmentManager.setSelectedDay(day);
			AppointmentManager.setSelectedDoctor(doctor);			

			window.location.href = '#/confirmation-rendezvous';
		}
	}	
]);
