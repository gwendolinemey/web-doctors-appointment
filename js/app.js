
	var app = angular.module('app', ['ngRoute',  'appControllers', 'appServices', 'ui.bootstrap']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);

	var options = {};
	options.api = {};
	options.api.base_url = "http://localhost:8080";

	// configure our routes
	/*app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {*/
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/index-mvp.html',
				controller  : 'LandingController'
			})

			.when('/seysses/cabinet-medical-seysses', {
				templateUrl : 'views/seysses/medecin-generaliste.html',
				controller  : 'PresentationDocSeysses'
			})

			.when('/fontenilles/dieteticien-tachier', {
				templateUrl : 'views/fontenilles/dieteticien-tachier.html',
				controller  : 'PresentationMelanieTachier'
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
        	/*$locationProvider.html5Mode(true);*/
	}]);
	