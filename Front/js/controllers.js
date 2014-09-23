
	appControllers.controller('LandingController', ['$scope', 'GetService',
		function($scope, GetService) {
	
			$scope.specialities = [];

	        GetService.getAllSpecialities().success(function(data) {
	            $scope.specialities = data; 
	            $scope.selectedSpecialities = data.output[0];           
	            console.log(data);
	        }).error(function(data, status) {
	            console.log(status);
	        	console.log(data);
	        });

			$scope.checkPS = function(){ $scope.rv +=1;	}
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

	appControllers.controller('RecherchePS', 
		function($scope) {
			//
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