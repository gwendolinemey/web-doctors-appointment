	var app = angular.module('app', ['ngRoute',  'appControllers', 'appServices', 'appConfig', 'ui.bootstrap']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);
	var appConfig = angular.module('appConfig', []);

	// configure our routes
	/*app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {*/
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'app/views/index-mvp.html',
				controller  : 'LandingController'
			})

			.when('/seysses/cabinet-medical-seysses', {
				templateUrl : 'app/views/seysses/medecin-generaliste.html',
				controller  : 'CabinetCtrl'
			})

			.when('/fontenilles/dieteticien-tachier', {
				templateUrl : 'app/views/fontenilles/dieteticien-tachier.html',
				controller  : 'CabinetCtrl'
			})

			.when('/toulouse/osteopathe-bertucchi', {
				templateUrl : 'app/views/toulouse/osteopathe-bertucchi.html',
				controller  : 'CabinetCtrl'
			})			

			.when('/confirmation-rendezvous', {
				templateUrl : 'app/views/confirmation-rendezvous.html',
				controller 	: 'ConfirmationRendezVous'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'app/views/about.html',
				controller  : 'AboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'app/views/contact.html',
				controller  : 'ContactController'
			})

			.otherwise({
            	redirectTo: '/'
        	});
        	/*$locationProvider.html5Mode(true);*/
	}]);
	