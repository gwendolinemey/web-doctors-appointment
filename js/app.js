
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
				controller  : 'CabinetCtrl'
			})

			.when('/fontenilles/dieteticien-guerri', {
				templateUrl : 'views/fontenilles/dieteticien-guerri.html',
				controller  : 'CabinetCtrl'
			})

			.when('/toulouse/osteopathe-bertucchi', {
				templateUrl : 'views/toulouse/osteopathe-bertucchi.html',
				controller  : 'CabinetCtrl'
			})

			.when('/galaxie/galilee', {
				templateUrl : 'views/dev/galilee.html',
				controller  : 'CabinetCtrl'
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
	