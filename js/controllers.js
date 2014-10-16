
appControllers.controller('LandingController', ['$scope', 'GetService', 'SpecialityManager',
	function($scope, GetService, SpecialityManager) {

		$scope.specialities = [];

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
		}
	}
	]);

appControllers.controller('RecherchePS', ['$scope', 'GetService', 'SpecialityManager', 'AppointmentManager',
	function($scope, GetService, SpecialityManager, AppointmentManager) {

		$scope.doctors = [];

		speciality = SpecialityManager.getSelectedSpeciality();
		console.log('RecherchePS ' + JSON.stringify(speciality));

		GetService.getDoctorsBySpecialities(speciality).success(function(data) {
			// TODO remove this
			$scope.doctors = data.output;
			console.log(data.output);
			// For each doctors, retrieve its available appointments
			/*angular.forEach(data.output, function(doctor){
				GetService.get.success(function(data) {
					// TODO update doctor object (add list of available appointments)
					// and populate scope.doctors with it
				}).error(function(data, status) {
					console.log('response appointmentsByDoc : ' + status);
					console.log('response appointmentsByDoc : ' + data);
				});
			});*/

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
	]);

appControllers.controller('ConfirmationRendezVous', ['$scope', 'AppointmentManager',
	function($scope, AppointmentManager) {
		var doctor = AppointmentManager.getSelectedDoctor();
		var appointment = AppointmentManager.getSelectedAppointment();

		$scope.message = 'Voulez-vous confirmer votre rendez-vous avec le Docteur ' + doctor.nom + ' ?';

		$scope.doBack = function() {
			window.history.back();
		};
	}
	]);

appControllers.controller('AboutController', 
	function($scope) {
		$scope.message = 'Look! I am an about page.';
	}
	);

appControllers.controller('ContactController', 
	function($scope) {
		$scope.message = 'Contact us : hello@rapidocteur.fr';
	}
	);

appControllers.controller('Chiffres', 
	function($scope) {
		$scope.ps = 7;
		$scope.rv = 151;
	}
	);

appControllers.controller('PresentationDocSeysses', ['$scope', 'GetService',
	function($scope, GetService){
		var idCabinet = 2; //cabinet de Seysses : id 2 //à modifier

		GetService.getDoctorByOffice(idCabinet).success(function(data) {
			$scope.doctors = data.output;

			angular.forEach(data.output, function(doctor) {
				console.log('doctor : ' + JSON.stringify(doctor));
				
                GetService.getAppointementsByDoctors(doctor.idPraticien).success(function(data) {
                	console.log('idPraticien : ' + doctor.idPraticien + doctor.nom);
                	$scope.days = data.output;                	
                });
            });	

		}).error(function(data, status) {
			console.log('response getDoctorByOffice : ' + status);
			console.log('response getDoctorByOffice : ' + data);
		});	
	}
]);

