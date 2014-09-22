

// create the module and name it scotchApp
	var rpdApp = angular.module('rpdApp', ['ngRoute']);

	// configure our routes
	rpdApp.config(function($routeProvider) {
		$routeProvider

			.when('/recherche-ps.html', {
				templateUrl : 'views/recherche-ps.html',
				controller 	: 'rechercheps'
			})

			.when('/confirmation-rendezvous.html', {
				templateUrl : 'views/confirmation-rendezvous.html',
				controller 	: 'confirmationRendezVous'
			})

			// route for the home page
			.when('/', {
				templateUrl : 'views/form-accueil.html',
				controller  : 'LandingCtrl'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'views/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	rpdApp.controller('LandingCtrl', function($scope) {
	
		$scope.checkPS = function(){ $scope.rv +=1;	}
	});

	rpdApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';

	});

	rpdApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us : hello@rapidocteur.fr';

	});

	rpdApp.controller('rechercheps', function($scope) {
		//
	});

	rpdApp.controller('chiffres', function($scope) {
		$scope.ps = 42;
		$scope.rv = 125;
	});

	rpdApp.controller('confirmationRendezVous', function($scope) {
		$scope.message = 'Voulez-vous confirmer votre rendez-vous avec le Docteur DURANT ?';
	});