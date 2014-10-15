
	var app = angular.module('app', ['ngRoute',  'appControllers', 'appServices']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);

	var options = {};
	options.api = {};
	options.api.base_url = "http://localhost:8080";

	// configure our routes
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/index-mvp.html',
				controller  : 'LandingController'
			})

			.when('/cabinet-medical-seysses', {
				templateUrl : 'views/cabinet-medical-seysses.html',
				controller  : 'PresentationDocSeysses'
			})

			.when('/recherche-ps', {
				templateUrl : 'views/recherche-ps.html',
				controller 	: 'RecherchePS'
			})

			.when('/confirmation-rendezvous', {
				templateUrl : 'views/confirmation-rendezvous.html',
				controller 	: 'ConfirmationRendezVous'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'AboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'views/contact.html',
				controller  : 'ContactController'
			})

			.otherwise({
            	redirectTo: '/'
        	});
	}]);
	