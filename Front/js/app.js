

// create the module and name it scotchApp
	var app = angular.module('app', ['ngRoute', 'appServices', 'appControllers']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);

	var options = {};
	options.api = {};
	options.api.base_url = "http://localhost:8080";

	// configure our routes
	app.config(function($routeProvider) {
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

			.otherwise({
            	redirectTo: '/'
        	});
	});

	