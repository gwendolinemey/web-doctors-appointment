// create the controller and inject Angular's $scope
	appControllers.controller('LandingCtrl', function($scope) {
	
		$scope.checkPS = function(){ $scope.rv +=1;	}
	});

	appControllers.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';

	});

	appControllers.controller('contactController', function($scope) {
		$scope.message = 'Contact us : hello@rapidocteur.fr';

	});

	appControllers.controller('rechercheps', function($scope) {
		//
	});

	appControllers.controller('chiffres', function($scope) {
		$scope.ps = 42;
		$scope.rv = 125;
	});

	appControllers.controller('confirmationRendezVous', function($scope) {
		$scope.message = 'Voulez-vous confirmer votre rendez-vous avec le Docteur DURANT ?';
	});