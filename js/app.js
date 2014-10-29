
	var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'ui.bootstrap']);

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
				templateUrl : 'index.html',
				controller  : 'LandingController'
			})			

			.when('/page-guerri', {
				templateUrl : 'partials/fontenilles/dieteticien-guerri.html',
				controller  : 'CabinetCtrl'
			})

			.when('/confirmation-rendezvous', {
				templateUrl : 'views/confirmation-rendezvous.html',
				controller 	: 'ConfirmationRendezVous'
			})		

			.otherwise({
            	redirectTo: '/'
        	});
	}]);
	