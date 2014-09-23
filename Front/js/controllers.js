
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

appControllers.controller('RecherchePS', ['$scope', 'GetService', 'SpecialityManager',
	function($scope, GetService, SpecialityManager) {
		speciality = SpecialityManager.getSelectedSpeciality();
		console.log('RecherchePS ' + JSON.stringify(speciality));

		GetService.getDoctorsBySpecialities(speciality).success(function(data) {
			console.log('response docBySpe : ' + JSON.stringify(data));
		}).error(function(data, status) {
			console.log('response docBySpe : ' + status);
			console.log('response docBySpe : ' + data);
		});
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
		$scope.ps = 42;
		$scope.rv = 125;
	}
	);

appControllers.controller('ConfirmationRendezVous', 
	function($scope) {
		$scope.message = 'Voulez-vous confirmer votre rendez-vous avec le Docteur DURANT ?';
	}
	);

